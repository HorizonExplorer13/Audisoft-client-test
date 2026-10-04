namespace Audisoft.Core.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IStudentRepository Students { get; }
    ITeacherRepository Teachers { get; }
    IGradeRepository Grades { get; }
    Task<int> SaveChangesAsync();
}