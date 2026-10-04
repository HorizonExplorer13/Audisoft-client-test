using Microsoft.Extensions.DependencyInjection;
using Audisoft.Core.Services;
using Audisoft.Core.Interfaces;

namespace Audisoft.Core.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddCore(this IServiceCollection services)
    {
        services.AddScoped<IStudentService, StudentService>();
        services.AddScoped<ITeacherService, TeacherService>();
        services.AddScoped<IGradeService, GradeService>();

        return services;
    }
}