using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Google.Protobuf;
using Grpc.Core;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Schema;
using Trinsic;
using Trinsic.Services.FileManagement.V1;

namespace OkeyDokey.LicenseIssuerBot.Dialogs;

public class ImageDialog : WaterfallDialog
{
    private readonly TrinsicService _trinsic;

    public ImageDialog(TrinsicService trinsic) : base(nameof(ImageDialog))
    {
        AddStep(FileStepAsync);
        AddStep(EndStepAsync);

        _trinsic = trinsic;
    }

    private Task<DialogTurnResult> FileStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
    {
        return stepContext.PromptAsync(nameof(AttachmentPrompt),
            new PromptOptions { Prompt = MessageFactory.Text("Please upload your business logo (4MB max)"), },
            cancellationToken);
    }

    private async Task<DialogTurnResult> EndStepAsync(WaterfallStepContext stepContext,
        CancellationToken cancellationToken)
    {
        var attachments = (IList<Attachment>)stepContext.Result;

        if (attachments.Count != 1)
        {
            return await stepContext.EndDialogAsync(new Exception("You cannot send more than one attachment"));
        }

        var attachment = attachments[0];
        if (!attachment.ContentType.StartsWith("image/"))
            return await stepContext.EndDialogAsync(new Exception("You must upload an image"));

        if (string.IsNullOrEmpty(attachment.ContentUrl))
            return await stepContext.EndDialogAsync(new Exception("Error processing uploaded image"),
                cancellationToken);
        
        
        using WebClient c = new WebClient();
        var bytes = await c.DownloadDataTaskAsync(attachment.ContentUrl);

        if (bytes.Length > (1024 * 1024 * 4))
            return await stepContext.EndDialogAsync(new Exception("Image must be 4MB or smaller"));

        try
        {
            var fileUploadResult = await _trinsic.FileManagement.UploadFileAsync(new UploadFileRequest()
            {
                Contents = ByteString.CopyFrom(bytes),
                MimeType = attachment.ContentType
            });
            
            return await stepContext.EndDialogAsync(fileUploadResult.UploadedFile.Url, cancellationToken: cancellationToken);
        }
        catch (RpcException e)
        {
            return await stepContext.EndDialogAsync(new Exception("Failed to upload image to Trinsic's CDN"), cancellationToken);
        }
    }
}