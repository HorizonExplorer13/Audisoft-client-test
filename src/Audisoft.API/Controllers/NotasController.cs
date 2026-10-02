using Audisoft.API.Common;
using Audisoft.Core.DTOs;
using Audisoft.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace Audisoft.API.Controllers;

[ApiController]
[Route("api/notas")]
public class NotasController : ControllerBase
{
    private readonly INotaService _service;

    public NotasController(INotaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<NotaResponseDto>>>> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(ApiResponse.Ok(result));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApiResponse<NotaResponseDto>>> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);
        if (result == null)
            return NotFound(ApiResponse.Fail($"Nota with id {id} not found"));
        return Ok(ApiResponse.Ok(result));
    }

    [HttpPost]
    public async Task<ActionResult<ApiResponse<NotaResponseDto>>> Create([FromBody] CreateNotaDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, ApiResponse.Created(result));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ApiResponse<NotaResponseDto>>> Update(int id, [FromBody] UpdateNotaDto dto)
    {
        if (id != dto.Id)
            return BadRequest(ApiResponse.Fail("ID mismatch"));
        var result = await _service.UpdateAsync(dto);
        return Ok(ApiResponse.Ok(result));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<ApiResponse>> Delete(int id)
    {
        await _service.DeleteAsync(id);
        return Ok(ApiResponse.Ok("Nota deleted successfully"));
    }
}