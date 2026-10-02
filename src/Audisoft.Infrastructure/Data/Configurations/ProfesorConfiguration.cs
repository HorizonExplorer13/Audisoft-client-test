using Audisoft.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Audisoft.Infrastructure.Data.Configurations;

public class ProfesorConfiguration : IEntityTypeConfiguration<Profesor>
{
    public void Configure(EntityTypeBuilder<Profesor> builder)
    {
        builder.ToTable("Profesores");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Property(e => e.Nombre).IsRequired().HasMaxLength(200);
    }
}