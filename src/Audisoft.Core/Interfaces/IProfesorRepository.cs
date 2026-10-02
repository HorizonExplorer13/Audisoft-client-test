using Audisoft.Core.Entities;

namespace Audisoft.Core.Interfaces;

public interface IProfesorRepository
{
    Task<Profesor?> GetByIdAsync(int id);
    Task<IEnumerable<Profesor>> GetAllAsync();
    Task<Profesor> AddAsync(Profesor entity);
    Task UpdateAsync(Profesor entity);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}