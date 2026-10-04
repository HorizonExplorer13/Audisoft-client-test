using Audisoft.API.Common;
using Audisoft.Core.DTOs;
using Audisoft.Core.Services;
using Audisoft.Core.Common;
using Microsoft.AspNetCore.Mvc;

namespace Audisoft.API.Controllers;

[ApiController]
[Route("api/teachers")]
public class TeachersController : ControllerBase
{
    private readonly ITeacherService _service;

    public TeachersController(ITeacherService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<TeacherResponseDto>>>> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(ApiResponse.Ok(result));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApiResponse<TeacherResponseDto>>> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result == null)
            return NotFound(ApiResponse.Fail($"Profesor con id {id} no encontrado"));
        return Ok(ApiResponse.Ok(result));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<TeacherResponseDto>>> Create([FromBody] CreateTeacherDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, ApiResponse.Created(result));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ApiResponse<TeacherResponseDto>>> Update(int id, [FromBody] UpdateTeacherDto dto)
    {
        if (id != dto.Id)
            return BadRequest(ApiResponse.Fail("ID no coincide"));
        var result = await _service.UpdateAsync(dto);
        return Ok(ApiResponse.Ok(result));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<ApiResponse>> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        if (result.IsFailure)
            return BadRequest(ApiResponse.Fail(result.Error));
        return Ok(ApiResponse.Ok("Profesor eliminado exitosamente"));
    }
}