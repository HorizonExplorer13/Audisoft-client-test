using Audisoft.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Audisoft.Infrastructure.Data.Configurations;

public class EstudianteConfiguration : IEntityTypeConfiguration<Estudiante>
{
    public void Configure(EntityTypeBuilder<Estudiante> builder)
    {
        builder.ToTable("Estudiantes");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Property(e => e.Nombre).IsRequired().HasMaxLength(200);
    }
}