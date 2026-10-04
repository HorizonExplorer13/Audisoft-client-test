using Audisoft.Core.Entities;
using Audisoft.Core.Interfaces;
using Audisoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Audisoft.Infrastructure.Repositories;

public class GradeRepository : IGradeRepository
{
    private readonly AppDbContext _context;

    public GradeRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Grade?> GetByIdAsync(int id)
        => await _context.Grades
            .Include(g => g.Teacher)
            .Include(g => g.Student)
            .FirstOrDefaultAsync(g => g.Id == id);

    public async Task<IEnumerable<Grade>> GetAllAsync()
        => await _context.Grades
            .Include(g => g.Teacher)
            .Include(g => g.Student)
            .AsNoTracking()
            .ToListAsync();

    public async Task<Grade> AddAsync(Grade entity)
    {
        _context.Grades.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Grade entity)
    {
        _context.Grades.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await _context.Grades.FindAsync(id);
        if (entity != null)
        {
            _context.Grades.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(int id)
        => await _context.Grades.AnyAsync(e => e.Id == id);

    public async Task<bool> ExistsForStudentAsync(int studentId)
        => await _context.Grades.AsNoTracking().AnyAsync(g => g.StudentId == studentId);

    public async Task<bool> ExistsForTeacherAsync(int teacherId)
        => await _context.Grades.AsNoTracking().AnyAsync(g => g.TeacherId == teacherId);
}