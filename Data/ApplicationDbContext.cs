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

            modelBuilder.Entity<Account>().HasData(
               new Account
               {
                   Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                   name = "Cont Principal",
                   balance = 1000,
                   currency = "RON",
                   UserId = Guid.Parse("22222222-2222-2222-2222-222222222222")
               }
           );

            // Poți adăuga seed data și pentru celelalte entități, de exemplu:
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

            // Account ↔ User (One-to-Many)
            modelBuilder.Entity<Account>()
                .HasOne(a => a.User)
                .WithMany(u => u.Accounts)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.NoAction);


            // Transaction ↔ Account (One-to-Many)
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Account)
                .WithMany(a => a.Transactions)
                .HasForeignKey(t => t.AccountId)
                .OnDelete(DeleteBehavior.NoAction);
            // Change to NoAction to avoid cascading delete conflict

            // Transaction ↔ Category (One-to-Many)
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Category)
                .WithMany(c => c.Transactions)
                .HasForeignKey(t => t.CategoryId)
                .OnDelete(DeleteBehavior.NoAction);
            // Change to NoAction to avoid cascading delete conflict

            // Transaction ↔ User (One-to-Many)
            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.User)
                .WithMany(u => u.Transactions)
                .HasForeignKey(t => t.UserId)
                .OnDelete(DeleteBehavior.NoAction);


            // Budget ↔ Category (One-to-Many
            modelBuilder.Entity<Budget>()
                .HasOne(b => b.Category)
                .WithMany(c => c.Budgets)
                .HasForeignKey(b => b.CategoryId)
                .OnDelete(DeleteBehavior.NoAction);


            // Budget ↔ User (One-to-Many)
            modelBuilder.Entity<Budget>()
                .HasOne(b => b.User)
                .WithMany(u => u.Budgets)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.NoAction);


            // Report ↔ User (One-to-Many)
            modelBuilder.Entity<Report>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reports)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.NoAction);

        }

    }
}
