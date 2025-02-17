using FinanceTracker_2._0.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker_2._0.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Budget> Budgets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .Property(u => u.createdAt)
                .HasDefaultValueSql("GETUTCDATE()");

            modelBuilder.Entity<Report>()
                .Property(r => r.createdAt)
                .HasDefaultValueSql("GETUTCDATE()");

            modelBuilder.Entity<Budget>()
                .Property(b => b.createdAt)
                .HasDefaultValueSql("GETUTCDATE()");

            modelBuilder.Entity<Transaction>()
                .Property(t => t.date)
                .HasDefaultValueSql("GETUTCDATE()");

            var seedUserId = Guid.Parse("22222222-2222-2222-2222-222222222222");
            const string staticSecurityStamp = "C1A3E9E3-1234-5678-90AB-CDEF12345678";
            const string staticConcurrencyStamp = "STATIC_CONCURRENCY_STAMP_VALUE";
            const string staticPasswordHash1 = "AQAAAAIAAYagAAAAEPQomS+W3MP6Yse2HOKVnquyj3bDx9T7IItwFny/Je4mgNtxLp+esioG6IoBDa304g==";

            var secondUserId = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
            const string staticSecurityStamp2 = "B1B2B3B4-B5B6-B7B8-B9B0-CCCCCCCCCCCC";
            const string staticConcurrencyStamp2 = "CONCURRENCY-SECONDUSER-STATIC";
            const string staticPasswordHash2 = "AQAAAAIAAYagAAAAEFG9EGclYxL6nymYOIfwioOhO4NUf8mO3Vt0u6/533pjK4TaGi3d4BhY6CLK/kKjwQ==";

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = seedUserId,
                    UserName = "testuser",
                    firstName = "John",
                    lastName = "Boss",
                    NormalizedUserName = "TESTUSER",
                    Email = "testuser@example.com",
                    NormalizedEmail = "TESTUSER@EXAMPLE.COM",
                    EmailConfirmed = true,
                    PasswordHash = staticPasswordHash1, 
                    SecurityStamp = staticSecurityStamp,
                    ConcurrencyStamp = staticConcurrencyStamp
                },
                new User
                {
                    Id = secondUserId,
                    UserName = "seconduser",
                    firstName = "Jane",
                    lastName = "Doe",
                    NormalizedUserName = "SECONDUSER",
                    Email = "seconduser@example.com",
                    NormalizedEmail = "SECONDUSER@EXAMPLE.COM",
                    EmailConfirmed = true,
                    PasswordHash = staticPasswordHash2, 
                    SecurityStamp = staticSecurityStamp2,
                    ConcurrencyStamp = staticConcurrencyStamp2
                }
            );

            modelBuilder.Entity<Account>().HasData(
                new Account
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    name = "Cont Principal",
                    balance = 1000,
                    currency = "RON",
                    UserId = seedUserId
                }
            );

            modelBuilder.Entity<Category>().HasData(
                new Category
                {
                    Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                    name = "Categorie Exemplu"
                }
            );

            modelBuilder.Entity<Account>()
                .Property(a => a.balance)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Budget>()
                .Property(b => b.amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Report>()
                .Property(r => r.amountSpent)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Transaction>()
                .Property(t => t.amount)
                .HasColumnType("decimal(18,2)");

            modelBuilder.Entity<Account>()
                .HasOne(a => a.User)
                .WithMany(u => u.Accounts)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Account)
                .WithMany(a => a.Transactions)
                .HasForeignKey(t => t.AccountId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Category)
                .WithMany(c => c.Transactions)
                .HasForeignKey(t => t.CategoryId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Budget>()
                .HasOne(b => b.Category)
                .WithMany(c => c.Budgets)
                .HasForeignKey(b => b.CategoryId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Budget>()
                .HasOne(b => b.User)
                .WithMany(u => u.Budgets)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Report>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reports)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
