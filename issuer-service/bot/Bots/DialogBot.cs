// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Schema;
using Microsoft.Extensions.Logging;
using OkeyDokey.LicenseIssuerBot.Models;

namespace OkeyDokey.LicenseIssuerBot.Bots;

// This IBot implementation can run any type of Dialog. The use of type parameterization is to allows multiple different bots
// to be run at different endpoints within the same project. This can be achieved by defining distinct Controller types
// each with dependency on distinct IBot types, this way ASP Dependency Injection can glue everything together without ambiguity.
// The ConversationState is used by the Dialog system. The UserState isn't, however, it might have been used in a Dialog implementation,
// and the requirement is that all BotState objects are saved at the end of a turn.
public class DialogBot<T> : ActivityHandler where T : Dialog
{
    protected readonly Dialog Dialog;
    protected readonly BotState ConversationState;
    protected readonly BotState UserState;
    protected readonly ILogger Logger;

    public DialogBot(ConversationState conversationState, UserState userState, T dialog, ILogger<DialogBot<T>> logger)
    {
        ConversationState = conversationState;
        UserState = userState;
        Dialog = dialog;
        Logger = logger;
    }

    protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
    {
        foreach (ChannelAccount member in membersAdded)
        {
            if (member.Id != turnContext.Activity.Recipient.Id)
            {
                await turnContext.SendActivityAsync($"Hi there!", cancellationToken: cancellationToken);
                await turnContext.SendActivityAsync("I'm the Auditor Bot. I can help you get the right farm verification", cancellationToken: cancellationToken);

                await Dialog.RunAsync(turnContext, ConversationState.CreateProperty<DialogState>(nameof(DialogState)), cancellationToken);
            }
        }
    }

    public override async Task OnTurnAsync(ITurnContext turnContext, CancellationToken cancellationToken = default)
    {
        await base.OnTurnAsync(turnContext, cancellationToken);

        // Save any state changes that might have occurred during the turn.
        await ConversationState.SaveChangesAsync(turnContext, false, cancellationToken);
        await UserState.SaveChangesAsync(turnContext, false, cancellationToken);
    }

    protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
    {
        var welcomeUserStateAccessor = UserState.CreateProperty<WelcomeUserState>(nameof(WelcomeUserState));
        WelcomeUserState didBotWelcomeUser = await welcomeUserStateAccessor.GetAsync(turnContext, () => new WelcomeUserState(), cancellationToken);

        if (didBotWelcomeUser.DidBotWelcomeUser == false)
        {
            didBotWelcomeUser.DidBotWelcomeUser = true;
        }

        Logger.LogInformation("Running dialog with Message Activity.");

        await UserState.SaveChangesAsync(turnContext, cancellationToken: cancellationToken);
        await Dialog.RunAsync(turnContext, ConversationState.CreateProperty<DialogState>(nameof(DialogState)), cancellationToken);
    }
}