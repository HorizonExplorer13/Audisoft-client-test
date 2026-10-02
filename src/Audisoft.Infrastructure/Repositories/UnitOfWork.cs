using Audisoft.Core.Interfaces;
using Audisoft.Infrastructure.Data;
using Audisoft.Infrastructure.Repositories;

namespace Audisoft.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;
    private IEstudianteRepository? _estudiantes;
    private IProfesorRepository? _profesores;
    private INotaRepository? _notas;

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
    }

    public IEstudianteRepository Estudiantes => _estudiantes ??= new EstudianteRepository(_context);
    public IProfesorRepository Profesores => _profesores ??= new ProfesorRepository(_context);
    public INotaRepository Notas => _notas ??= new NotaRepository(_context);

    public async Task<int> SaveChangesAsync()
        => await _context.SaveChangesAsync();

    public void Dispose()
    {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}