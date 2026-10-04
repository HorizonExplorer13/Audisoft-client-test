namespace Audisoft.Core.DTOs;

public class UpdateGradeDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public int TeacherId { get; set; }
    public int StudentId { get; set; }
}