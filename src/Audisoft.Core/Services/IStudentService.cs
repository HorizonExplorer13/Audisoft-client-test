using Audisoft.Core.DTOs;
using Audisoft.Core.Common;

namespace Audisoft.Core.Services;

public interface IStudentService
{
    Task<StudentResponseDto?> GetByIdAsync(int id);
    Task<IEnumerable<StudentResponseDto>> GetAllAsync();
    Task<StudentResponseDto> CreateAsync(CreateStudentDto dto);
    Task<StudentResponseDto> UpdateAsync(UpdateStudentDto dto);
    Task<Result> DeleteAsync(int id);
}