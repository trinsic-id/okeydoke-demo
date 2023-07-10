using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using Trinsic;
using Trinsic.Services.VerifiableCredentials.V1;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpContextAccessor();
builder.Services.AddCors();

var app = builder.Build();
app.UseCors((corsBuilder) =>
{
    corsBuilder.AllowAnyHeader();
    corsBuilder.AllowAnyMethod();
    corsBuilder.AllowAnyOrigin();
    corsBuilder.Build();
});

app.MapGet("/", () => "👋 Hi!");
app.MapPost("/api/issue", async (string email, string name, FoodClass foodType, FoodGrade grade) =>
{
    try
    {
        var authToken = Environment.GetEnvironmentVariable("TRINSIC_AUTHTOKEN");
        if (authToken is null)
        {
            throw new Exception("Web app configuration error");
        }

        if (string.IsNullOrWhiteSpace(email) || !(new EmailAddressAttribute().IsValid(email)))
        {
            throw new ArgumentException("Invalid email");
        }

        if (string.IsNullOrWhiteSpace(name) || name.Length > 100)
        {
            throw new ArgumentException("Invalid name");
        }


        try
        {
            var trinsic = new TrinsicService().SetAuthToken(authToken);

            var issueResponse = await trinsic.Credential.IssueFromTemplateAsync(new()
            {
                TemplateId = "https://schema.trinsic.cloud/okeydoke/foodsalvagerlicense",
                ValuesJson = JsonSerializer.Serialize(new
                {
                    name = name,
                    certificationGrade = grade.ToString(),
                    produceType = foodType.ToString(),
                })
            });

            var sendResponse = await trinsic.Credential.SendAsync(new()
            {
                Email = email,
                DocumentJson = issueResponse.DocumentJson,
                SendNotification = true
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
            throw new Exception("Error issuing credential: " + ex.Message);
        }

        return new IssueResponse()
        {
            Success = true
        };
    }
    catch (Exception e)
    {
        return new IssueResponse()
        {
            Success = false,
            Error = e.Message
        };
    }
});

app.MapPost("/api/issue-any", async (string email, string authToken, string schemaUri, string jsonValues) =>
{
    try
    {
        if (string.IsNullOrWhiteSpace(authToken))
        {
            throw new ArgumentException("Auth token not provided");
        }


        if (string.IsNullOrWhiteSpace(schemaUri))
        {
            throw new ArgumentException("schemaUri not provided");
        }

        var blob = Convert.FromBase64String(jsonValues);
        var json = Encoding.UTF8.GetString(blob);


        if (string.IsNullOrWhiteSpace(json))
        {
            throw new ArgumentException("jsonValues not provided");
        }

        if (string.IsNullOrWhiteSpace(email) || !(new EmailAddressAttribute().IsValid(email)))
        {
            throw new ArgumentException("Invalid email");
        }



        try
        {
            var trinsic = new TrinsicService().SetAuthToken(authToken);

            var issueResponse = await trinsic.Credential.IssueFromTemplateAsync(new()
            {
                TemplateId = schemaUri,
                ValuesJson = json
            });

            var sendResponse = await trinsic.Credential.SendAsync(new()
            {
                Email = email,
                DocumentJson = issueResponse.DocumentJson,
                SendNotification = true
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error: " + ex.Message);
            throw new Exception("Error issuing credential: " + ex.Message);
        }

        return new IssueResponse()
        {
            Success = true
        };
    }
    catch (Exception e)
    {
        return new IssueResponse()
        {
            Success = false,
            Error = e.Message
        };
    }
});



app.Run();

public enum FoodClass
{
    Artichoke = 1,
    Corn = 2
}

public enum FoodGrade
{
    A = 1,
    B = 2,
    C = 3
}

public class IssueResponse
{
    [JsonPropertyName("success")] public bool Success { get; set; }

    [JsonPropertyName("error")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Error { get; set; }
}
