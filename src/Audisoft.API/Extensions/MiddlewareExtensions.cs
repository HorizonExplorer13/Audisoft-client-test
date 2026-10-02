using Audisoft.API.Middleware;

namespace Audisoft.API.Extensions;

public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseCustomExceptionHandling(this IApplicationBuilder app)
    {
        return app.UseMiddleware<CustomExceptionMiddleware>();
    }
}