using Audisoft.Core.DTOs;
using Audisoft.Core.Common;

namespace Audisoft.Core.Services;

public interface IEstudianteService
{
    Task<EstudianteResponseDto?> GetByIdAsync(int id);
    Task<IEnumerable<EstudianteResponseDto>> GetAllAsync();
    Task<EstudianteResponseDto> CreateAsync(CreateEstudianteDto dto);
    Task<EstudianteResponseDto> UpdateAsync(UpdateEstudianteDto dto);
    Task<Result> DeleteAsync(int id);
}