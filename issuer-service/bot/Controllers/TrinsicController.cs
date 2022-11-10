using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Trinsic;
using Trinsic.Services.VerifiableCredentials.V1;

namespace MultiTurnPromptBot.Controllers;

[ApiController]
public class TrinsicController : ControllerBase
{
    private readonly TrinsicService _trinsicService;

    public TrinsicController(TrinsicService trinsicService)
    {
        _trinsicService = trinsicService;
    }

    [HttpPost]
    [Route("/api/trinsic/verify")]
    public async Task<IActionResult> VerifyCredential()
    {
        Request.Body.Position = 0;
        using StreamReader reader = new(Request.Body);
        VerifyProofResponse response = await _trinsicService.Credential.VerifyProofAsync(new VerifyProofRequest
        {
            ProofDocumentJson = await reader.ReadToEndAsync().ConfigureAwait(false)
        });

        return Ok(response);
    }
}
