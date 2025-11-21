using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Contact> Contactos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Mapear a la tabla 'contactos'
            modelBuilder.Entity<Contact>(entity =>
            {
                entity.ToTable("contactos");
                entity.HasKey(c => c.Id);

                entity.Property(c => c.Nombre)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(c => c.Telefono)
                      .IsRequired()
                      .HasMaxLength(20);
            });
        }
    }
}
