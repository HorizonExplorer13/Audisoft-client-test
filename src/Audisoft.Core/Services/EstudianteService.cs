using Audisoft.Core.DTOs;
using Audisoft.Core.Entities;
using Audisoft.Core.Interfaces;
using Audisoft.Core.Common;

namespace Audisoft.Core.Services;

public class EstudianteService : IEstudianteService
{
    private readonly IUnitOfWork _unitOfWork;

    public EstudianteService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<EstudianteResponseDto?> GetByIdAsync(int id)
    {
        var entity = await _unitOfWork.Estudiantes.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<EstudianteResponseDto>> GetAllAsync()
    {
        var entities = await _unitOfWork.Estudiantes.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<EstudianteResponseDto> CreateAsync(CreateEstudianteDto dto)
    {
        var entity = new Estudiante { Nombre = dto.Nombre };
        var created = await _unitOfWork.Estudiantes.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return MapToResponse(created);
    }

    public async Task<EstudianteResponseDto> UpdateAsync(UpdateEstudianteDto dto)
    {
        var entity = await _unitOfWork.Estudiantes.GetByIdAsync(dto.Id);
        if (entity == null)
            throw new KeyNotFoundException($"Estudiante with id {dto.Id} not found");

        entity.Nombre = dto.Nombre;
        await _unitOfWork.Estudiantes.UpdateAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return MapToResponse(entity);
    }

    public async Task<Result> DeleteAsync(int id)
    {
        var entity = await _unitOfWork.Estudiantes.GetByIdAsync(id);
        if (entity == null)
            throw new KeyNotFoundException($"Estudiante with id {id} not found");

        var hasNotas = await _unitOfWork.Notas.ExistsForEstudianteAsync(id);
        if (hasNotas)
            return Result.Failure($"Cannot delete Estudiante with id {id} because it has associated Notas");

        await _unitOfWork.Estudiantes.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
        return Result.Success();
    }

    private static EstudianteResponseDto MapToResponse(Estudiante entity) => new()
    {
        Id = entity.Id,
        Nombre = entity.Nombre
    };
}