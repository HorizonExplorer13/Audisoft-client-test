using Audisoft.Core.Entities;
using Audisoft.Core.Interfaces;
using Audisoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Audisoft.Infrastructure.Repositories;

public class NotaRepository : INotaRepository
{
    private readonly AppDbContext _context;

    public NotaRepository(AppDbContext context)
    {
        _context = context;
    }


    public async Task<bool> ExistsForEstudianteAsync(int estudianteId)
    {
        return await _context.Notas
            .AsNoTracking()
            .AnyAsync(
                n => n.IdEstudiante == estudianteId);
    }


    public async Task<bool> ExistsForProfesorAsync(int profesorId)
    {
        return await _context.Notas
            .AsNoTracking()
            .AnyAsync(
                n => n.IdProfesor == profesorId);
    }



    public async Task<Nota?> GetByIdAsync(int id)
        => await _context.Notas
            .Include(n => n.Profesor)
            .Include(n => n.Estudiante)
            .FirstOrDefaultAsync(n => n.Id == id);

    public async Task<IEnumerable<Nota>> GetAllAsync()
        => await _context.Notas
            .Include(n => n.Profesor)
            .Include(n => n.Estudiante)
            .AsNoTracking()
            .ToListAsync();

    public async Task<Nota> AddAsync(Nota entity)
    {
        _context.Notas.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Nota entity)
    {
        _context.Notas.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Notas.FindAsync(id);
        if (entity != null)
        {
            _context.Notas.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id)
        => await _context.Notas.AnyAsync(e => e.Id == id);
}