namespace Audisoft.Core.Entities;

public class Grade
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public int TeacherId { get; set; }
    public int StudentId { get; set; }
    public Teacher Teacher { get; set; } = null!;
    public Student Student { get; set; } = null!;
}