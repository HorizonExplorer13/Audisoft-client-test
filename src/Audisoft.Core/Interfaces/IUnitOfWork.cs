namespace Audisoft.Core.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IEstudianteRepository Estudiantes { get; }
    IProfesorRepository Profesores { get; }
    INotaRepository Notas { get; }
    Task<int> SaveChangesAsync();
}