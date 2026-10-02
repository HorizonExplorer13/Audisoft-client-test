using Microsoft.Extensions.DependencyInjection;
using Audisoft.Core.Services;
using Audisoft.Core.Interfaces;

namespace Audisoft.Core.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCore(this IServiceCollection services)
    {
        services.AddScoped<IEstudianteService, EstudianteService>();
        services.AddScoped<IProfesorService, ProfesorService>();
        services.AddScoped<INotaService, NotaService>();

        return services;
    }
}