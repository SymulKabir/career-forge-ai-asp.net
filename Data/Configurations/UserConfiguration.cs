using CareerForgeAI;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerForgeAI.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> entity)
    {
        entity.HasKey(u => u.Id);

        entity.HasIndex(u => u.Email)
            .IsUnique();

        entity.Property(u => u.Name)
            .HasMaxLength(100)
            .IsRequired();

        entity.Property(u => u.Email)
            .HasMaxLength(255)
            .IsRequired();

        entity.Property(u => u.PasswordHash)
            .IsRequired();

        entity.Property(u => u.CreatedAt)
            .IsRequired();

        entity.Property(u => u.UpdatedAt)
            .IsRequired(false);
    }
}