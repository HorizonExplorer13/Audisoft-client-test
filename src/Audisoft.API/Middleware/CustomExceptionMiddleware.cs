using Audisoft.API.Common;
using System.Text.Json;

namespace Audisoft.API.Middleware;

public class CustomExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<CustomExceptionMiddleware> _logger;

    public CustomExceptionMiddleware(RequestDelegate next, ILogger<CustomExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception occurred");
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        var response = exception switch
        {
            KeyNotFoundException => ApiResponse.Fail("Resource not found", new List<string> { exception.Message }),
            ArgumentException => ApiResponse.Fail("Invalid request", new List<string> { exception.Message }),
            _ => ApiResponse.Fail("An internal server error occurred")
        };

        context.Response.StatusCode = exception switch
        {
            KeyNotFoundException => StatusCodes.Status404NotFound,
            ArgumentException => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError
        };

        var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
        await context.Response.WriteAsync(json);
    }
}