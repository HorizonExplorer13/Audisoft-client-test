namespace Audisoft.Core.DTOs;

public class NotaResponseDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public int IdProfesor { get; set; }
    public string NombreProfesor { get; set; } = string.Empty;
    public int IdEstudiante { get; set; }
    public string NombreEstudiante { get; set; } = string.Empty;
}