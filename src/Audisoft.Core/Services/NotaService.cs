using Audisoft.Core.DTOs;
using Audisoft.Core.Entities;
using Audisoft.Core.Interfaces;

namespace Audisoft.Core.Services;

public class NotaService : INotaService
{
    private readonly IUnitOfWork _unitOfWork;

    public NotaService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<NotaResponseDto?> GetByIdAsync(int id)
    {
        var entity = await _unitOfWork.Notas.GetByIdAsync(id);
        if (entity == null) return null;
        return MapToResponse(entity);
    }

    public async Task<IEnumerable<NotaResponseDto>> GetAllAsync()
    {
        var entities = await _unitOfWork.Notas.GetAllAsync();
        return entities.Select(MapToResponse);
    }

    public async Task<NotaResponseDto> CreateAsync(CreateNotaDto dto)
    {
        if (!await _unitOfWork.Profesores.ExistsAsync(dto.IdProfesor))
            throw new KeyNotFoundException($"Profesor with id {dto.IdProfesor} not found");
        if (!await _unitOfWork.Estudiantes.ExistsAsync(dto.IdEstudiante))
            throw new KeyNotFoundException($"Estudiante with id {dto.IdEstudiante} not found");

        var entity = new Nota
        {
            Nombre = dto.Nombre,
            Valor = dto.Valor,
            IdProfesor = dto.IdProfesor,
            IdEstudiante = dto.IdEstudiante
        };

        var created = await _unitOfWork.Notas.AddAsync(entity);
        await _unitOfWork.SaveChangesAsync();

        var profesor = await _unitOfWork.Profesores.GetByIdAsync(created.IdProfesor);
        var estudiante = await _unitOfWork.Estudiantes.GetByIdAsync(created.IdEstudiante);

        return new NotaResponseDto
        {
            Id = created.Id,
            Nombre = created.Nombre,
            Valor = created.Valor,
            IdProfesor = created.IdProfesor,
            NombreProfesor = profesor?.Nombre ?? string.Empty,
            IdEstudiante = created.IdEstudiante,
            NombreEstudiante = estudiante?.Nombre ?? string.Empty
        };
    }

    public async Task<NotaResponseDto> UpdateAsync(UpdateNotaDto dto)
    {
        var entity = await _unitOfWork.Notas.GetByIdAsync(dto.Id);
        if (entity == null)
            throw new KeyNotFoundException($"Nota with id {dto.Id} not found");

        if (!await _unitOfWork.Profesores.ExistsAsync(dto.IdProfesor))
            throw new KeyNotFoundException($"Profesor with id {dto.IdProfesor} not found");
        if (!await _unitOfWork.Estudiantes.ExistsAsync(dto.IdEstudiante))
            throw new KeyNotFoundException($"Estudiante with id {dto.IdEstudiante} not found");

        entity.Nombre = dto.Nombre;
        entity.Valor = dto.Valor;
        entity.IdProfesor = dto.IdProfesor;
        entity.IdEstudiante = dto.IdEstudiante;

        await _unitOfWork.Notas.UpdateAsync(entity);
        await _unitOfWork.SaveChangesAsync();

        var profesor = await _unitOfWork.Profesores.GetByIdAsync(entity.IdProfesor);
        var estudiante = await _unitOfWork.Estudiantes.GetByIdAsync(entity.IdEstudiante);

        return new NotaResponseDto
        {
            Id = entity.Id,
            Nombre = entity.Nombre,
            Valor = entity.Valor,
            IdProfesor = entity.IdProfesor,
            NombreProfesor = profesor?.Nombre ?? string.Empty,
            IdEstudiante = entity.IdEstudiante,
            NombreEstudiante = estudiante?.Nombre ?? string.Empty
        };
    }

    public async Task DeleteAsync(int id)
    {
        await _unitOfWork.Notas.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
    }

    private static NotaResponseDto MapToResponse(Nota entity) => new()
    {
        Id = entity.Id,
        Nombre = entity.Nombre,
        Valor = entity.Valor,
        IdProfesor = entity.IdProfesor,
        NombreProfesor = entity.Profesor?.Nombre ?? string.Empty,
        IdEstudiante = entity.IdEstudiante,
        NombreEstudiante = entity.Estudiante?.Nombre ?? string.Empty
    };
}