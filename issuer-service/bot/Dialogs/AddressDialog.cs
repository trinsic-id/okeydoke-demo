using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Dialogs;

namespace OkeyDokey.LicenseIssuerBot.Dialogs;

public class AddressDialog : WaterfallDialog
{
    private readonly IStatePropertyAccessor<FoodSalvagerLicense> _foodLicenseAccessor;

    public AddressDialog(UserState userState) : base(nameof(AddressDialog))
    {
        AddStep(StreetStepAsync);
        AddStep(CityStepAsync);
        AddStep(StateStepAsync);
        AddStep(EndStepAsync);

        _foodLicenseAccessor = userState.CreateProperty<FoodSalvagerLicense>("FoodSalvagerLicense");
    }

    private Task<DialogTurnResult> StreetStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        return stepContext.PromptAsync(nameof(TextPrompt), new PromptOptions { Prompt = MessageFactory.Text("Please enter your street name and number") }, cancellationToken);
    }

    private Task<DialogTurnResult> CityStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        stepContext.Values["address"] = (string)stepContext.Result;

        return stepContext.PromptAsync(nameof(TextPrompt), new PromptOptions { Prompt = MessageFactory.Text("Enter the city name") }, cancellationToken);
    }

    private Task<DialogTurnResult> StateStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        stepContext.Values["city"] = (string)stepContext.Result;

        return stepContext.PromptAsync(nameof(TextPrompt), new PromptOptions { Prompt = MessageFactory.Text("Enter the state name or short code") }, cancellationToken);
    }

    private async Task<DialogTurnResult> EndStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        stepContext.Values["state"] = (string)stepContext.Result;

        var foodLicense = await _foodLicenseAccessor.GetAsync(stepContext.Context, () => new FoodSalvagerLicense(), cancellationToken);
        foodLicense.Address = (string)stepContext.Values["address"];
        foodLicense.City = (string)stepContext.Values["city"];
        foodLicense.State = (string)stepContext.Values["state"];

        return await stepContext.EndDialogAsync(cancellationToken: cancellationToken);
    }
}
