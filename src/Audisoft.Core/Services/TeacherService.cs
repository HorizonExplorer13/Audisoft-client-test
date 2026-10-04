using Audisoft.Core.DTOs;
using Audisoft.Core.Entities;
using Audisoft.Core.Interfaces;
using Audisoft.Core.Common;

namespace Audisoft.Core.Services;

public class TeacherService : ITeacherService
{
    private readonly IUnitOfWork _unitOfWork;

    public TeacherService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<TeacherResponseDto?> GetByIdAsync(int id)
    {
        var entity = await _unitOfWork.Teachers.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<TeacherResponseDto>> GetAllAsync()
    {
        var entities = await _unitOfWork.Teachers.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<TeacherResponseDto> CreateAsync(CreateTeacherDto dto)
    {
        var entity = new Teacher { Name = dto.Name };
        var created = await _unitOfWork.Teachers.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return MapToResponse(created);
    }

    public async Task<TeacherResponseDto> UpdateAsync(UpdateTeacherDto dto)
    {
        var entity = await _unitOfWork.Teachers.GetByIdAsync(dto.Id);
        if (entity == null)
            throw new KeyNotFoundException($"Teacher with id {dto.Id} not found");

        entity.Name = dto.Name;
        await _unitOfWork.Teachers.UpdateAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return MapToResponse(entity);
    }

    public async Task<Result> DeleteAsync(int id)
    {
        var entity = await _unitOfWork.Teachers.GetByIdAsync(id);
        if (entity == null)
            throw new KeyNotFoundException($"Teacher with id {id} not found");

        var hasGrades = await _unitOfWork.Grades.ExistsForTeacherAsync(id);
        if (hasGrades)
            return Result.Failure($"No se puede eliminar el profesor con id {id} porque tiene calificaciones asociadas");

        await _unitOfWork.Teachers.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
        return Result.Success();
    }

    private static TeacherResponseDto MapToResponse(Teacher entity) => new()
    {
        Id = entity.Id,
        Name = entity.Name
    };
}