using ApplicationCore.Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().Property(t => t.Id)
                .IsRequired();

            modelBuilder.Entity<User>().Property(t => t.FirstName)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<User>().Property(t => t.LastName)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<User>().Property(t => t.BirthDate)
                .IsRequired();

            modelBuilder.Entity<User>().Property(t => t.Avatar)
                .HasMaxLength(100);

            modelBuilder.Entity<User>().Property(t => t.UserName)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<User>().Property(t => t.Password)
                .IsRequired()
                .HasMaxLength(30);

            modelBuilder.Entity<User>().Property(t => t.CreatedAt)
                .IsRequired();
        }
    }
}
