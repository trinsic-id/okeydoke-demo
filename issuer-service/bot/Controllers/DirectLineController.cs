using System;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using OkeyDokey.LicenseIssuerBot.Models;

namespace OkeyDokey.LicenseIssuerBot;

[ApiController]
public class DirectLineController : ControllerBase
{
    private readonly DirectLineService _directLineService;

    private readonly string _directLineSecret;

    public DirectLineController(DirectLineService directLineService, IConfiguration configuration) {
        _directLineService = directLineService;
        _directLineSecret = configuration["DirectLineSecret"];
    }

    [HttpGet("/")]
    public IActionResult Index() {
        return Redirect("/index.html");
    }

    // Endpoint for generating a Direct Line token bound to a random user ID
    [HttpGet, HttpPost]
    [Route("/api/directline/token")]
    public async Task<IActionResult> Get() {
        if (!Request.Cookies.TryGetValue("userId", out var randomUserId)) {
            // Generate a random user ID to use for DirectLine token
            randomUserId = GenerateRandomUserId();

            // Set a cookie, so we can recognize returning user
            Response.Cookies.Append("userId", randomUserId);
        }

        DirectLineTokenDetails directLineTokenDetails;
        try {
            directLineTokenDetails = await _directLineService.GetTokenAsync(_directLineSecret, randomUserId);
        }
        catch (InvalidOperationException invalidOpException) {
            return BadRequest(new { message = invalidOpException.Message });
        }

        return Ok(new { token = directLineTokenDetails.Token });
    }

    // Generates a random user ID
    // Prefixed with "dl_", as required by the Direct Line API
    private static string GenerateRandomUserId() {
        var tokenData = RandomNumberGenerator.GetBytes(16);

        return $"dl_{BitConverter.ToString(tokenData).Replace("-", "").ToLower()}";
    }
}