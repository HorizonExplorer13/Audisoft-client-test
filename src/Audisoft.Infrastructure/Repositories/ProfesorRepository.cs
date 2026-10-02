using Audisoft.Core.Entities;
using Audisoft.Core.Interfaces;
using Audisoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Audisoft.Infrastructure.Repositories;

public class ProfesorRepository : IProfesorRepository
{
    private readonly AppDbContext _context;

    public ProfesorRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Profesor?> GetByIdAsync(int id)
        => await _context.Profesores.FindAsync(id);

    public async Task<IEnumerable<Profesor>> GetAllAsync()
        => await _context.Profesores.AsNoTracking().ToListAsync();

    public async Task<Profesor> AddAsync(Profesor entity)
    {
        _context.Profesores.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Profesor entity)
    {
        _context.Profesores.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Profesores.FindAsync(id);
        if (entity != null)
        {
            _context.Profesores.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id)
        => await _context.Profesores.AnyAsync(e => e.Id == id);
}