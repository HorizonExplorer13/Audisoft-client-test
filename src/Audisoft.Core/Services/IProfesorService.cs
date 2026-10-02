using Audisoft.Core.DTOs;
using Audisoft.Core.Common;

namespace Audisoft.Core.Services;

public interface IProfesorService
{
    Task<ProfesorResponseDto?> GetByIdAsync(int id);
    Task<IEnumerable<ProfesorResponseDto>> GetAllAsync();
    Task<ProfesorResponseDto> CreateAsync(CreateProfesorDto dto);
    Task<ProfesorResponseDto> UpdateAsync(UpdateProfesorDto dto);
    Task<Result> DeleteAsync(int id);
}