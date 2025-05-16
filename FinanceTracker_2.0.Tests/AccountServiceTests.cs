using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Moq;
using Xunit;
using FinanceTracker_2._0.Services;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Models.DTOs;
using FinanceTracker_2._0.Repositories;
using FinanceTracker_2._0.Models.DTOs.AccountDTOs;

namespace FinanceTracker_2._0.Tests
{
    public class AccountServiceTests
    {
        private readonly IMapper _mapper;
        private readonly Mock<IAccountRepository> _repoMock;
        private readonly AccountService _service;

        public AccountServiceTests()
        {
            var cfg = new MapperConfiguration(c =>
            {
                c.CreateMap<Account, AccountDTO>();
                c.CreateMap<CreateAccountDTO, Account>();
                c.CreateMap<UpdateAccountDTO, Account>();
            });
            _mapper = cfg.CreateMapper();

            _repoMock = new Mock<IAccountRepository>();
            _service = new AccountService(_repoMock.Object, _mapper);
        }

        [Fact]
        public async Task GetAllAccountsAsync_ReturnsEmptyCollection_WhenNoAccounts()
        {
            _repoMock.Setup(r => r.GetAllAsync())
                     .ReturnsAsync(new List<Account>());
            var result = await _service.GetAllAccountsAsync();
            
            Assert.NotNull(result);
            Assert.Empty(result);
        }

        [Fact]
        public async Task GetAccountByIdAsync_ReturnsCorrectMappedDto()
        {
            var id = Guid.NewGuid();
            var acc = new Account { Id = id, name = "A1", balance = 123, currency = "USD", UserId = Guid.NewGuid() };
            _repoMock.Setup(r => r.GetByIdAsync(id))
                     .ReturnsAsync(acc);
            var dto = await _service.GetAccountByIdAsync(id);
            Assert.NotNull(dto);
            Assert.Equal(acc.Id, dto.Id);
            Assert.Equal(acc.name, dto.Name);
            Assert.Equal(acc.balance, dto.Balance);
            Assert.Equal(acc.currency, dto.Currency);
        }

        [Fact]
        public async Task CreateAccountAsync_CreatesEntityWithCorrectValues()
        {
            var newDto = new CreateAccountDTO
            {
                Name = "New",
                Balance = 500,
                Currency = "EUR",
                UserId = Guid.NewGuid()
            };
            Account saved = null;
            _repoMock
              .Setup(r => r.AddAsync(It.IsAny<Account>()))
              .Callback<Account>(a => saved = a)
              .Returns(Task.CompletedTask);

            await _service.CreateAccountAsync(newDto);

            _repoMock.Verify(r => r.AddAsync(It.Is<Account>(a =>
                a.name == newDto.Name &&
                a.balance == newDto.Balance &&
                a.currency == newDto.Currency &&
                a.UserId == newDto.UserId
            )), Times.Once);

            Assert.NotNull(saved);
            Assert.Equal(newDto.Name, saved.name);
            Assert.Equal(newDto.Balance, saved.balance);
            Assert.Equal(newDto.Currency, saved.currency);
            Assert.Equal(newDto.UserId, saved.UserId);
        }



        [Fact]
        public async Task UpdateAccountAsync_MapsAndCallsRepository()
        {
            var existing = new Account
            {
                Id = Guid.NewGuid(),
                name = "Old",
                balance = 100,
                currency = "USD",
                UserId = Guid.NewGuid()
            };
            var updDto = new UpdateAccountDTO
            {
                Name = "Updated",
                Balance = 250,
                Currency = "GBP"
            };

            _repoMock
              .Setup(r => r.GetByIdAsync(existing.Id))
              .ReturnsAsync(existing);

            Account passedToRepo = null;
            _repoMock
              .Setup(r => r.UpdateAsync(It.IsAny<Account>()))
              .Callback<Account>(a => passedToRepo = a)
              .Returns(Task.CompletedTask);

            await _service.UpdateAccountAsync(existing.Id, updDto);

            _repoMock.Verify(r => r.UpdateAsync(It.IsAny<Account>()), Times.Once);
            Assert.Equal(existing.Id, passedToRepo.Id);
            Assert.Equal(updDto.Name, passedToRepo.name);
            Assert.Equal(updDto.Balance, passedToRepo.balance);
            Assert.Equal(updDto.Currency, passedToRepo.currency);
        }


        [Fact]
        public async Task DeleteAccountAsync_CallsRepoDelete()
        {
            var id = Guid.NewGuid();
            _repoMock.Setup(r => r.DeleteAsync(id))
                     .Returns(Task.CompletedTask)
                     .Verifiable();

            await _service.DeleteAccountAsync(id);

            _repoMock.Verify();
        }
    }
}
