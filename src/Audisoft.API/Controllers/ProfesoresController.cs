using Audisoft.API.Common;
using Audisoft.Core.DTOs;
using Audisoft.Core.Services;
using Audisoft.Core.Common;
using Microsoft.AspNetCore.Mvc;

namespace Audisoft.API.Controllers;

[ApiController]
[Route("api/profesores")]
public class ProfesoresController : ControllerBase
{
    private readonly IProfesorService _service;

    public ProfesoresController(IProfesorService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<ProfesorResponseDto>>>> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(ApiResponse.Ok(result));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApiResponse<ProfesorResponseDto>>> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result == null)
            return NotFound(ApiResponse.Fail($"Profesor with id {id} not found"));
        return Ok(ApiResponse.Ok(result));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<ProfesorResponseDto>>> Create([FromBody] CreateProfesorDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, ApiResponse.Created(result));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ApiResponse<ProfesorResponseDto>>> Update(int id, [FromBody] UpdateProfesorDto dto)
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
        return Ok(ApiResponse.Ok("Profesor deleted successfully"));
    }
}