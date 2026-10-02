using Audisoft.Core.Entities;

namespace Audisoft.Core.Interfaces;

public interface IEstudianteRepository
{
    Task<Estudiante?> GetByIdAsync(int id);
    Task<IEnumerable<Estudiante>> GetAllAsync();
    Task<Estudiante> AddAsync(Estudiante entity);
    Task UpdateAsync(Estudiante entity);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
}