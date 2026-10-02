using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Audisoft.Core.Interfaces;
using Audisoft.Infrastructure.Data;
using Audisoft.Infrastructure.Repositories;

namespace Audisoft.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services, 
        IConfiguration configuration)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                sqlOptions => sqlOptions.MigrationsAssembly(typeof(AppDbContext).Assembly.GetName().Name)
            ));

        services.AddScoped<IEstudianteRepository, EstudianteRepository>();
        services.AddScoped<IProfesorRepository, ProfesorRepository>();
        services.AddScoped<INotaRepository, NotaRepository>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}