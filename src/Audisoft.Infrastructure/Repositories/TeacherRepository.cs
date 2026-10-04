using Audisoft.Core.Entities;
using Audisoft.Core.Interfaces;
using Audisoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Audisoft.Infrastructure.Repositories;

public class TeacherRepository : ITeacherRepository
{
    private readonly AppDbContext _context;

    public TeacherRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Teacher?> GetByIdAsync(int id)
        => await _context.Teachers.FindAsync(id);

    public async Task<IEnumerable<Teacher>> GetAllAsync()
        => await _context.Teachers.AsNoTracking().ToListAsync();

    public async Task<Teacher> AddAsync(Teacher entity)
    {
        _context.Teachers.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Teacher entity)
    {
        _context.Teachers.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Teachers.FindAsync(id);
        if (entity != null)
        {
            _context.Teachers.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id)
        => await _context.Teachers.AnyAsync(e => e.Id == id);
}