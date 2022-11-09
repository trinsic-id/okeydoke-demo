// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Builder.Dialogs.Choices;
using Microsoft.Bot.Schema;
using Trinsic;
using Trinsic.Services.VerifiableCredentials.V1;

namespace OkeyDokey.LicenseIssuerBot.Dialogs;

public class LicenseDialog : ComponentDialog
{
    private readonly TrinsicService _trinsicService;
    private readonly IStatePropertyAccessor<FoodSalvagerLicense> _foodLicenseAccessor;

    public LicenseDialog(TrinsicService trinsicService, UserState userState, AddressDialog addressDialog)
        : base(nameof(LicenseDialog))
    {
        _trinsicService = trinsicService;
        _foodLicenseAccessor = userState.CreateProperty<FoodSalvagerLicense>("FoodSalvagerLicense");

        // This array defines how the Waterfall will execute.
        var waterfallSteps = new WaterfallStep[]
        {
            GradeStepAsync,
            NameStepAsync,
            IdNumberStepAsync,
            PromptAddressStepAsync,
            AddressStepAsync,
            ProduceTypeAsync,
            SummaryStepAsync,
            ConfirmStepAsync,
            EmailStepAsync,
            IssueAsync
        };

        // Add named dialogs to the DialogSet. These names are saved in the dialog state.
        AddDialog(new WaterfallDialog(nameof(WaterfallDialog), waterfallSteps));
        AddDialog(new TextPrompt(nameof(TextPrompt)));
        AddDialog(new ChoicePrompt(nameof(ChoicePrompt)));
        AddDialog(new ConfirmPrompt(nameof(ConfirmPrompt)));
        AddDialog(addressDialog);

        // The initial child Dialog to run.
        InitialDialogId = nameof(WaterfallDialog);
    }

    private static async Task<DialogTurnResult> GradeStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        return await stepContext.PromptAsync(nameof(ChoicePrompt),
            new PromptOptions
            {
                Prompt = MessageFactory.Text("Please select the certification grade you're applying for."),
                Choices = new List<Choice>
                {
                    new Choice{Value = "A", Action = new CardAction(ActionTypes.ImBack, "Grade A", value: "A")},
                    new Choice{Value = "B", Action = new CardAction(ActionTypes.ImBack, "Grade B", value: "B")},
                    new Choice{Value = "C", Action = new CardAction(ActionTypes.ImBack, "Grade C", value: "C")},
                }
            }, cancellationToken);
    }

    private static async Task<DialogTurnResult> NameStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        stepContext.Values["certificationGrade"] = ((FoundChoice)stepContext.Result).Value;

        return await stepContext.PromptAsync(nameof(TextPrompt), new PromptOptions { Prompt = MessageFactory.Text("Enter the individual owner name, partnership or full name of the corporation") }, cancellationToken);
    }

    private static async Task<DialogTurnResult> IdNumberStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        stepContext.Values["name"] = (string)stepContext.Result;

        return await stepContext.PromptAsync(nameof(TextPrompt), new PromptOptions { Prompt = MessageFactory.Text("What is your Federal ID Number?") }, cancellationToken);
    }

    private static async Task<DialogTurnResult> PromptAddressStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        stepContext.Values["idNumber"] = (string)stepContext.Result;

        return await stepContext.PromptAsync(nameof(ConfirmPrompt), new PromptOptions { Prompt = MessageFactory.Text("Would you like to provide an address?") }, cancellationToken);
    }

    private static async Task<DialogTurnResult> AddressStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        if ((bool)stepContext.Result)
        {
            return await stepContext.BeginDialogAsync(nameof(AddressDialog), new PromptOptions { Prompt = MessageFactory.Text("Please enter your street address.") }, cancellationToken);
        }
        else
        {
            return await stepContext.NextAsync(null, cancellationToken);
        }
    }

    private static Task<DialogTurnResult> ProduceTypeAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        return stepContext.PromptAsync(nameof(ChoicePrompt),
            new PromptOptions
            {
                Prompt = MessageFactory.Text("Please select the type of produce."),
                Choices = ChoiceFactory.ToChoices(new List<string> { "Artichoke", "Corn" }),
            }, cancellationToken);
    }

    private async Task<DialogTurnResult> SummaryStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        stepContext.Values["produceType"] = ((FoundChoice)stepContext.Result).Value;

        FoodSalvagerLicense foodLicense = await _foodLicenseAccessor.GetAsync(stepContext.Context, () => new FoodSalvagerLicense(), cancellationToken);

        // issue credential
        foodLicense.Name = (string)stepContext.Values["name"];
        foodLicense.CertificationGrade = (string)stepContext.Values["certificationGrade"];
        foodLicense.IdNumber = (string)stepContext.Values["idNumber"];
        foodLicense.ProduceType = (string)stepContext.Values["produceType"];

        await stepContext.Context.SendActivityAsync("Here are the details of your application. Please review if the information is correct", cancellationToken: cancellationToken);

        var attachments = new List<Attachment>();
        IMessageActivity reply = MessageFactory.Attachment(attachments);
        reply.Attachments.Add(CardUtils.GetLicenseCard(foodLicense).ToAttachment());
        await stepContext.Context.SendActivityAsync(reply, cancellationToken);

        return await stepContext.NextAsync(cancellationToken: cancellationToken);
    }

    private static async Task<DialogTurnResult> ConfirmStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        return await stepContext.PromptAsync(nameof(ConfirmPrompt), new PromptOptions { Prompt = MessageFactory.Text("Does this information look correct?") }, cancellationToken);
    }

    private static async Task<DialogTurnResult> EmailStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        var confirm = (bool)stepContext.Result;

        if (confirm)
        {
            await stepContext.Context.SendActivityAsync("Great! We will send you information on how to use your verified license at your email.", cancellationToken: cancellationToken);
            return await stepContext.PromptAsync(nameof(TextPrompt), new PromptOptions { Prompt = MessageFactory.Text("What is your preferred email address?") }, cancellationToken);
        }
        else
        {
            await stepContext.Context.SendActivityAsync("No problem. Let's start over.", cancellationToken: cancellationToken);
            await stepContext.CancelAllDialogsAsync(cancellationToken: cancellationToken);

            return await stepContext.Parent.ReplaceDialogAsync(nameof(LicenseDialog), cancellationToken: cancellationToken);
        }
    }

    private async Task<DialogTurnResult> IssueAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        var email = (string)stepContext.Result;

        FoodSalvagerLicense foodLicense = await _foodLicenseAccessor.GetAsync(stepContext.Context, () => new FoodSalvagerLicense(), cancellationToken);

        try
        {
            var values = JsonSerializer.Serialize(foodLicense, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
            });
            var response = await _trinsicService.Credential.IssueFromTemplateAsync(new IssueFromTemplateRequest()
            {
                TemplateId = "urn:template:okiedoke:food-salvager-license",
                ValuesJson = values
            });

            await _trinsicService.Credential.SendAsync(new SendRequest
            {
                Email = email,
                DocumentJson = response.DocumentJson
            });

            await stepContext.Context.SendActivityAsync("Congratulations! I've sent you a verification credential to your email!",
                cancellationToken: cancellationToken);
            await stepContext.Context.SendActivityAsync("Read more on how you can use the license at https://example.com!",
                cancellationToken: cancellationToken);
        }
        catch (Exception e)
        {
            await stepContext.Context.SendActivityAsync("Sorry, I'm having trouble issuing your license. Please try again later.", cancellationToken: cancellationToken);
            await stepContext.Context.SendActivityAsync($"Error: {e.Message}", cancellationToken: cancellationToken);
        }

        return await stepContext.EndDialogAsync(cancellationToken: cancellationToken);
    }
}
