using Audisoft.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Audisoft.Infrastructure.Data.Configurations;

public class NotaConfiguration : IEntityTypeConfiguration<Nota>
{
    public void Configure(EntityTypeBuilder<Nota> builder)
    {
        builder.ToTable("Notas");
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id).ValueGeneratedOnAdd();
        builder.Property(e => e.Nombre).IsRequired().HasMaxLength(200);
        builder.Property(e => e.Valor).HasColumnType("decimal(5,2)");

        builder.HasOne(e => e.Profesor)
            .WithMany()
            .HasForeignKey(e => e.IdProfesor)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_Notas_Profesores");

        builder.HasOne(e => e.Estudiante)
            .WithMany()
            .HasForeignKey(e => e.IdEstudiante)
            .OnDelete(DeleteBehavior.Restrict)
            .HasConstraintName("FK_Notas_Estudiantes");
    }
}