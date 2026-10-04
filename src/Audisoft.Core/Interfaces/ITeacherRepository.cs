using Audisoft.Core.Entities;

namespace Audisoft.Core.Interfaces;

public interface ITeacherRepository
{
    Task<Teacher?> GetByIdAsync(int id);
    Task<IEnumerable<Teacher>> GetAllAsync();
    Task<Teacher> AddAsync(Teacher entity);
    Task UpdateAsync(Teacher entity);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}