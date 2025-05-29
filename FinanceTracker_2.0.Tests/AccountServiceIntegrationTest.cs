using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceTracker_2._0.Data;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Models.DTOs.AccountDTOs;
using FinanceTracker_2._0.Repositories;
using FinanceTracker_2._0.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace FinanceTracker_2._0.Tests
{
    public class AccountServiceIntegrationTest
    {
        private readonly IMapper _mapper;
        private readonly DbContextOptions<ApplicationDbContext> _dbOptions;

        public AccountServiceIntegrationTest()
        {
            var cfg = new MapperConfiguration(c =>
            {
                c.CreateMap<Account, AccountDTO>();
                c.CreateMap<CreateAccountDTO, Account>();
                c.CreateMap<UpdateAccountDTO, Account>();
            });
            _mapper = cfg.CreateMapper();

            _dbOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: $"TestDb_{Guid.NewGuid()}")
                .Options;
        }

        [Fact]
        public async Task GetAllAccountsAsync_ReturnsSeededAccounts()
        {
            using (var context = new ApplicationDbContext(_dbOptions))
            {
                context.Accounts.AddRange(new[]
                {
                    new Account { Id = Guid.NewGuid(), name = "A1", balance = 100, currency = "USD", UserId = Guid.NewGuid() },
                    new Account { Id = Guid.NewGuid(), name = "A2", balance = 200, currency = "EUR", UserId = Guid.NewGuid() }
                });
                await context.SaveChangesAsync();
            }

            // Creează repository și service pe baza contextului in-memory
            using (var context = new ApplicationDbContext(_dbOptions))
            {
                var repo = new AccountRepository(context);
                var service = new AccountService(repo, _mapper);

                var result = await service.GetAllAccountsAsync();

   
                Assert.NotNull(result);
                var list = result.ToList();
                Assert.Equal(2, list.Count);
                Assert.Contains(list, dto => dto.Name == "A1" && dto.Balance == 100);
                Assert.Contains(list, dto => dto.Name == "A2" && dto.Balance == 200);
            }
        }
    }
}
