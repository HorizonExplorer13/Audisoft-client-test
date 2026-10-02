using Audisoft.Core.Entities;
using Audisoft.Core.Interfaces;
using Audisoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Audisoft.Infrastructure.Repositories;

public class EstudianteRepository : IEstudianteRepository
{
    private readonly AppDbContext _context;

    public EstudianteRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Estudiante?> GetByIdAsync(int id)
        => await _context.Estudiantes.FindAsync(id);

    public async Task<IEnumerable<Estudiante>> GetAllAsync()
        => await _context.Estudiantes.AsNoTracking().ToListAsync();

    public async Task<Estudiante> AddAsync(Estudiante entity)
    {
        _context.Estudiantes.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Estudiante entity)
    {
        _context.Estudiantes.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Estudiantes.FindAsync(id);
        if (entity != null)
        {
            _context.Estudiantes.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id)
        => await _context.Estudiantes.AnyAsync(e => e.Id == id);
}