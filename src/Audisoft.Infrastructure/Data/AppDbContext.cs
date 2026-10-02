using Audisoft.Core.Entities;
using Audisoft.Infrastructure.Data.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Audisoft.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {
        
    }

    public DbSet<Estudiante> Estudiantes => Set<Estudiante>();
    public DbSet<Profesor> Profesores => Set<Profesor>();
    public DbSet<Nota> Notas => Set<Nota>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new EstudianteConfiguration());
        modelBuilder.ApplyConfiguration(new ProfesorConfiguration());
        modelBuilder.ApplyConfiguration(new NotaConfiguration());
    }
}