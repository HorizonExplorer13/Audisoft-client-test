using Audisoft.API.Common;
using Audisoft.Core.DTOs;
using Audisoft.Core.Services;
using Audisoft.Core.Common;
using Microsoft.AspNetCore.Mvc;

namespace Audisoft.API.Controllers;

[ApiController]
[Route("api/estudiantes")]
public class EstudiantesController : ControllerBase
{
    private readonly IEstudianteService _service;

    public EstudiantesController(IEstudianteService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<EstudianteResponseDto>>>> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(ApiResponse.Ok(result));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApiResponse<EstudianteResponseDto>>> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result == null)
            return NotFound(ApiResponse.Fail($"Estudiante with id {id} not found"));
        return Ok(ApiResponse.Ok(result));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<EstudianteResponseDto>>> Create([FromBody] CreateEstudianteDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, ApiResponse.Created(result));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ApiResponse<EstudianteResponseDto>>> Update(int id, [FromBody] UpdateEstudianteDto dto)
    {
        if (id != dto.Id)
            return BadRequest(ApiResponse.Fail("ID mismatch"));
        var result = await _service.UpdateAsync(dto);
        return Ok(ApiResponse.Ok(result));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<ApiResponse>> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        if (result.IsFailure)
            return BadRequest(ApiResponse.Fail(result.Error));
        return Ok(ApiResponse.Ok("Estudiante deleted successfully"));
    }
}