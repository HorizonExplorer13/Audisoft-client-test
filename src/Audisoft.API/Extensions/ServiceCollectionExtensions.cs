using Microsoft.Extensions.DependencyInjection;
using Audisoft.Core.Extensions;
using Audisoft.Infrastructure.Extensions;

namespace Audisoft.API.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddCore();
        services.AddInfrastructure(configuration);

        return services;
    }
}