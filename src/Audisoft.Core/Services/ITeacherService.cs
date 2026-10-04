using Audisoft.Core.DTOs;
using Audisoft.Core.Common;

namespace Audisoft.Core.Services;

public interface ITeacherService
{
    Task<TeacherResponseDto?> GetByIdAsync(int id);
    Task<IEnumerable<TeacherResponseDto>> GetAllAsync();
    Task<TeacherResponseDto> CreateAsync(CreateTeacherDto dto);
    Task<TeacherResponseDto> UpdateAsync(UpdateTeacherDto dto);
    Task<Result> DeleteAsync(int id);
}