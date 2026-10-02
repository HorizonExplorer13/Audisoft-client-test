using Audisoft.Core.DTOs;
using Audisoft.Core.Entities;
using Audisoft.Core.Interfaces;
using Audisoft.Core.Common;

namespace Audisoft.Core.Services;

public class ProfesorService : IProfesorService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProfesorService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<ProfesorResponseDto?> GetByIdAsync(int id)
    {
        var entity = await _unitOfWork.Profesores.GetByIdAsync(id);
        return entity == null ? null : MapToResponse(entity);
    }

    public async Task<IEnumerable<ProfesorResponseDto>> GetAllAsync()
    {
        var entities = await _unitOfWork.Profesores.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<ProfesorResponseDto> CreateAsync(CreateProfesorDto dto)
    {
        var entity = new Profesor { Nombre = dto.Nombre };
        var created = await _unitOfWork.Profesores.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return MapToResponse(created);
    }

    public async Task<ProfesorResponseDto> UpdateAsync(UpdateProfesorDto dto)
    {
        var entity = await _unitOfWork.Profesores.GetByIdAsync(dto.Id);
        if (entity == null)
            throw new KeyNotFoundException($"Profesor with id {dto.Id} not found");

        entity.Nombre = dto.Nombre;
        await _unitOfWork.Profesores.UpdateAsync(entity);
        await _unitOfWork.SaveChangesAsync();
        return MapToResponse(entity);
    }

    public async Task<Result> DeleteAsync(int id)
    {
        var entity = await _unitOfWork.Profesores.GetByIdAsync(id);
        if (entity == null)
            throw new KeyNotFoundException($"Profesor with id {id} not found");

        var hasNotas = await _unitOfWork.Notas.ExistsForProfesorAsync(id);
        if (hasNotas)
            return Result.Failure($"Cannot delete Profesor with id {id} because it has associated Notas");

        await _unitOfWork.Profesores.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
        return Result.Success();
    }

    private static ProfesorResponseDto MapToResponse(Profesor entity) => new()
    {
        Id = entity.Id,
        Nombre = entity.Nombre
    };
}