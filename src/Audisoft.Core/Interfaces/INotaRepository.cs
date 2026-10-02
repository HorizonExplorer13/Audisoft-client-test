using Audisoft.Core.Entities;

namespace Audisoft.Core.Interfaces;

public interface INotaRepository
{
    Task<Nota?> GetByIdAsync(int id);
    Task<IEnumerable<Nota>> GetAllAsync();
    Task<Nota> AddAsync(Nota entity);
    Task UpdateAsync(Nota entity);
    Task DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<bool> ExistsForProfesorAsync(int profesorId);
    Task<bool> ExistsForEstudianteAsync(int estudianteId);
}