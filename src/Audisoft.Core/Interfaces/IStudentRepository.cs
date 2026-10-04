using Audisoft.Core.Entities;

namespace Audisoft.Core.Interfaces;

public interface IStudentRepository
{
    Task<Student?> GetByIdAsync(int id);
    Task<IEnumerable<Student>> GetAllAsync();
    Task<Student> AddAsync(Student entity);
    Task UpdateAsync(Student entity);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}