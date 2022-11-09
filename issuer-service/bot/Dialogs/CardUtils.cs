using System.Collections.Generic;
using Microsoft.Bot.Schema;

namespace OkeyDokey.LicenseIssuerBot.Dialogs;

public class CardUtils
{
    public static ReceiptCard GetLicenseCard(FoodSalvagerLicense license)
    {
        ReceiptCard receiptCard = new ReceiptCard
        {
            Title = "Food Salvager License",
            Facts = new List<Fact>
            {
                new Fact("Name", license.Name),
                new Fact("Federal ID Number", license.IdNumber),
                new Fact("Certification Grade", license.CertificationGrade)
            },
            Buttons = new List<CardAction>
            {
                new CardAction(
                    ActionTypes.OpenUrl,
                    "More information",
                    value: "https://trinsic.id/"),
            }
        };

        if (!string.IsNullOrWhiteSpace(license.Address))
        {
            receiptCard.Facts.Add(new Fact("Street Address", license.Address));
            receiptCard.Facts.Add(new Fact("City", license.City));
            receiptCard.Facts.Add(new Fact("State", license.State));
        }

        return receiptCard;
    }
}
