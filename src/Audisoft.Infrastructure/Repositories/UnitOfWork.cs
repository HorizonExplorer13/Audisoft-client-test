using Audisoft.Core.Interfaces;
using Audisoft.Infrastructure.Data;
using Audisoft.Infrastructure.Repositories;

namespace Audisoft.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;
    private IStudentRepository? _students;
    private ITeacherRepository? _teachers;
    private IGradeRepository? _grades;

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
    }

    public IStudentRepository Students => _students ??= new StudentRepository(_context);
    public ITeacherRepository Teachers => _teachers ??= new TeacherRepository(_context);
    public IGradeRepository Grades => _grades ??= new GradeRepository(_context);

    public async Task<int> SaveChangesAsync()
        => await _context.SaveChangesAsync();

    public void Dispose()
    {
        _context.Dispose();
        GC.SuppressFinalize(this);
    }
}