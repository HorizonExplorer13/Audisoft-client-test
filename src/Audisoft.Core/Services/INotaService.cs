using Audisoft.Core.DTOs;

namespace Audisoft.Core.Services;

public interface INotaService
{
    Task<NotaResponseDto?> GetByIdAsync(int id);
    Task<IEnumerable<NotaResponseDto>> GetAllAsync();
    Task<NotaResponseDto> CreateAsync(CreateNotaDto dto);
    Task<NotaResponseDto> UpdateAsync(UpdateNotaDto dto);
    Task DeleteAsync(int id);
}