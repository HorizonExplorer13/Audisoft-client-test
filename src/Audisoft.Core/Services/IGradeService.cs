using Audisoft.Core.DTOs;
using Audisoft.Core.Common;

namespace Audisoft.Core.Services;

public interface IGradeService
{
    Task<GradeResponseDto?> GetByIdAsync(int id);
    Task<IEnumerable<GradeResponseDto>> GetAllAsync();
    Task<GradeResponseDto> CreateAsync(CreateGradeDto dto);
    Task<GradeResponseDto> UpdateAsync(UpdateGradeDto dto);
    Task<Result> DeleteAsync(int id);
}