using Audisoft.Core.DTOs;
using Audisoft.Core.Entities;
using Audisoft.Core.Interfaces;
using Audisoft.Core.Common;

namespace Audisoft.Core.Services;

public class GradeService : IGradeService
{
    private readonly IUnitOfWork _unitOfWork;

    public GradeService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<GradeResponseDto?> GetByIdAsync(int id)
    {
        var entity = await _unitOfWork.Grades.GetByIdAsync(id);
        if (entity == null) return null;
        return MapToResponse(entity);
    }

    public async Task<IEnumerable<GradeResponseDto>> GetAllAsync()
    {
        var entities = await _unitOfWork.Grades.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<GradeResponseDto> CreateAsync(CreateGradeDto dto)
    {
        if (!await _unitOfWork.Teachers.ExistsAsync(dto.TeacherId))
            throw new KeyNotFoundException($"Teacher with id {dto.TeacherId} not found");
        if (!await _unitOfWork.Students.ExistsAsync(dto.StudentId))
            throw new KeyNotFoundException($"Student with id {dto.StudentId} not found");

        var entity = new Grade
        {
            Name = dto.Name,
            Value = dto.Value,
            TeacherId = dto.TeacherId,
            StudentId = dto.StudentId
        };

        var created = await _unitOfWork.Grades.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();

        var teacher = await _unitOfWork.Teachers.GetByIdAsync(created.TeacherId);
        var student = await _unitOfWork.Students.GetByIdAsync(created.StudentId);

        return new GradeResponseDto
        {
            Id = created.Id,
            Name = created.Name,
            Value = created.Value,
            TeacherId = created.TeacherId,
            TeacherName = teacher?.Name ?? string.Empty,
            StudentId = created.StudentId,
            StudentName = student?.Name ?? string.Empty
        };
    }

    public async Task<GradeResponseDto> UpdateAsync(UpdateGradeDto dto)
    {
        var entity = await _unitOfWork.Grades.GetByIdAsync(dto.Id);
        if (entity == null)
            throw new KeyNotFoundException($"Grade with id {dto.Id} not found");

        if (!await _unitOfWork.Teachers.ExistsAsync(dto.TeacherId))
            throw new KeyNotFoundException($"Teacher with id {dto.TeacherId} not found");
        if (!await _unitOfWork.Students.ExistsAsync(dto.StudentId))
            throw new KeyNotFoundException($"Student with id {dto.StudentId} not found");

        entity.Name = dto.Name;
        entity.Value = dto.Value;
        entity.TeacherId = dto.TeacherId;
        entity.StudentId = dto.StudentId;

        await _unitOfWork.Grades.UpdateAsync(entity);
        await _unitOfWork.SaveChangesAsync();

        var teacher = await _unitOfWork.Teachers.GetByIdAsync(entity.TeacherId);
        var student = await _unitOfWork.Students.GetByIdAsync(entity.StudentId);

        return new GradeResponseDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Value = entity.Value,
            TeacherId = entity.TeacherId,
            TeacherName = teacher?.Name ?? string.Empty,
            StudentId = entity.StudentId,
            StudentName = student?.Name ?? string.Empty
        };
    }

    public async Task<Result> DeleteAsync(int id)
    {
        var entity = await _unitOfWork.Grades.GetByIdAsync(id);
        if (entity == null)
            throw new KeyNotFoundException($"Grade with id {id} not found");

        await _unitOfWork.Grades.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
        return Result.Success();
    }

    private static GradeResponseDto MapToResponse(Grade entity) => new()
    {
        Id = entity.Id,
        Name = entity.Name,
        Value = entity.Value,
        TeacherId = entity.TeacherId,
        TeacherName = entity.Teacher?.Name ?? string.Empty,
        StudentId = entity.StudentId,
        StudentName = entity.Student?.Name ?? string.Empty
    };
}