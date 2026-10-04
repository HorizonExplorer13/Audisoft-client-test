using Audisoft.Core.DTOs;
using Audisoft.Core.Entities;
using Audisoft.Core.Interfaces;
using Audisoft.Core.Common;

namespace Audisoft.Core.Services;

public class StudentService : IStudentService
{
    private readonly IUnitOfWork _unitOfWork;

    public StudentService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<StudentResponseDto?> GetByIdAsync(int id)
    {
        var entity = await _unitOfWork.Students.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<StudentResponseDto>> GetAllAsync()
    {
        var entities = await _unitOfWork.Students.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<StudentResponseDto> CreateAsync(CreateStudentDto dto)
    {
        var entity = new Student { Name = dto.Name };
        var created = await _unitOfWork.Students.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return MapToResponse(created);
    }

    public async Task<StudentResponseDto> UpdateAsync(UpdateStudentDto dto)
    {
        var entity = await _unitOfWork.Students.GetByIdAsync(dto.Id);
        if (entity == null)
            throw new KeyNotFoundException($"Student with id {dto.Id} not found");

        entity.Name = dto.Name;
        await _unitOfWork.Students.UpdateAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return MapToResponse(entity);
    }

    public async Task<Result> DeleteAsync(int id)
    {
        var entity = await _unitOfWork.Students.GetByIdAsync(id);
        if (entity == null)
            throw new KeyNotFoundException($"Student with id {id} not found");

        var hasGrades = await _unitOfWork.Grades.ExistsForStudentAsync(id);
        if (hasGrades)
            return Result.Failure($"No se puede eliminar el estudiante con id {id} porque tiene calificaciones asociadas");

        await _unitOfWork.Students.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
        return Result.Success();
    }

    private static StudentResponseDto MapToResponse(Student entity) => new()
    {
        Id = entity.Id,
        Name = entity.Name
    };
}