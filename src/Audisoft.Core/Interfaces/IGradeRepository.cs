using Audisoft.Core.Entities;

namespace Audisoft.Core.Interfaces;

public interface IGradeRepository
{
    Task<Grade?> GetByIdAsync(int id);
    Task<IEnumerable<Grade>> GetAllAsync();
    Task<Grade> AddAsync(Grade entity);
    Task UpdateAsync(Grade entity);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<bool> ExistsForStudentAsync(int studentId);
    Task<bool> ExistsForTeacherAsync(int teacherId);
}