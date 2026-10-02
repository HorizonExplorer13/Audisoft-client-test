namespace Audisoft.Core.DTOs;

public class CreateNotaDto
{
    public string Nombre { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public int IdProfesor { get; set; }
    public int IdEstudiante { get; set; }
}