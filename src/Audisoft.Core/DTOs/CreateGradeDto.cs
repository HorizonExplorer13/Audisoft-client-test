namespace Audisoft.Core.DTOs;

public class CreateGradeDto
{
    public string Name { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public int TeacherId { get; set; }
    public int StudentId { get; set; }
}