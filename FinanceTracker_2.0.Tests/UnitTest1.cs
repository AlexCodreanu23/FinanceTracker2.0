using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Models.DTOs.AccountDTOs;
using FinanceTracker_2._0.Repositories;
using FinanceTracker_2._0.Services;
using Moq;
using Xunit;

namespace FinanceTracker_2._0.Tests
{
    public class UnitTest1
    {
        private readonly Mock<IAccountRepository> _accountRepositoryMock;
        private readonly IMapper _mapper;
        private readonly AccountService _accountService;

        public UnitTest1()
        {
            _accountRepositoryMock = new Mock<IAccountRepository>();

            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Account, AccountDTO>();
                cfg.CreateMap<CreateAccountDTO, Account>();
                cfg.CreateMap<UpdateAccountDTO, Account>();
            });
            _mapper = config.CreateMapper();

            _accountService = new AccountService(_accountRepositoryMock.Object, _mapper);
        }

        [Fact]
        public async Task GetAllAccountsAsync_ReturnsMappedAccounts()
        {
            var accounts = new List<Account>
            {
                new Account { Id = Guid.NewGuid(), name = "Account1", balance = 500, currency = "USD", UserId = Guid.NewGuid() },
                new Account { Id = Guid.NewGuid(), name = "Account2", balance = 1000, currency = "EUR", UserId = Guid.NewGuid() }
            };

            _accountRepositoryMock.Setup(repo => repo.GetAllAsync())
                                  .ReturnsAsync(accounts);

            var result = await _accountService.GetAllAccountsAsync();

            Assert.NotNull(result);
            Assert.Equal(accounts.Count, result.Count());
            foreach (var accountDto in result)
            {
                Assert.False(string.IsNullOrEmpty(accountDto.Name));
                Assert.True(accountDto.Balance >= 0);
                Assert.False(string.IsNullOrEmpty(accountDto.Currency));
            }
        }
    }
}
