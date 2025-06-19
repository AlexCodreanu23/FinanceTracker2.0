using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Models.DTOs.AccountDTOs;
using FinanceTracker_2._0.Models.DTOs.BudgetDTOs;
using FinanceTracker_2._0.Models.DTOs.UserDTOs;
using FinanceTracker_2._0.Models.DTOs.CategoryDTOs;
using FinanceTracker_2._0.Repositories;
using FinanceTracker_2._0.Services;
using Moq;
using Xunit;
using FinanceTracker_2._0.Controllers;
using FinanceTracker_2._0.Models.DTOs.TransactionDTOs;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker_2._0.Tests
{
    public class UnitTest2
    {
        public class UserServiceTests
        {
            private readonly Mock<IUserRepository> _userRepoMock = new();
            private readonly IMapper _mapper;
            private readonly UserService _userService;

            public UserServiceTests()
            {
                var cfg = new MapperConfiguration(cfg => cfg.CreateMap<User, UserDTO>());
                _mapper = cfg.CreateMapper();
                _userService = new UserService(_userRepoMock.Object, _mapper);
            }

            [Fact]
            public async Task GetAllUsersAsync_ReturnsMappedUsers()
            {
                var users = new List<User>
                {
                    new() { Id = Guid.NewGuid(), firstName = "Ana", lastName = "Pop", createdAt = DateTime.UtcNow },
                    new() { Id = Guid.NewGuid(), firstName = "Ion", lastName = "Ionescu", createdAt = DateTime.UtcNow }
                };
                _userRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(users);

                var result = await _userService.GetAllUsersAsync();

                Assert.Equal(2, result.Count());
                Assert.All(result, u =>
                {
                    Assert.False(string.IsNullOrWhiteSpace(u.FirstName));
                    Assert.False(string.IsNullOrWhiteSpace(u.LastName));
                });
            }
        }

        public class BudgetServiceTests
        {
            private readonly Mock<IBudgetRepository> _budgetRepoMock = new();
            private readonly IMapper _mapper;
            private readonly BudgetService _budgetService;

            public BudgetServiceTests()
            {
                var cfg = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<Budget, BudgetDTO>();
                    cfg.CreateMap<CreateBudgetDTO, Budget>();
                    cfg.CreateMap<UpdateBudgetDTO, Budget>();
                });
                _mapper = cfg.CreateMapper();
                _budgetService = new BudgetService(_budgetRepoMock.Object, _mapper);
            }

            [Fact]
            public async Task GetBudgetsForUserAsync_FiltersByUserId()
            {
                var userId = Guid.NewGuid();
                var budgets = new List<Budget>
                {
                    new() { Id = Guid.NewGuid(), budgetName = "Food", amount = 300m, UserId = userId, start_date = DateTime.UtcNow.AddDays(-5), end_date = DateTime.UtcNow.AddMonths(1) },
                    new() { Id = Guid.NewGuid(), budgetName = "Travel", amount = 1000m, UserId = Guid.NewGuid(), start_date = DateTime.UtcNow, end_date = DateTime.UtcNow.AddMonths(2) }
                };
                _budgetRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(budgets);

                var result = await _budgetService.GetBudgetsForUserAsync(userId);

                Assert.Single(result);
                Assert.Equal("Food", result.First().BudgetName);
            }
        }

        public class CategoryServiceTests
        {
            private readonly Mock<ICategoryRepository> _catRepoMock = new();
            private readonly IMapper _mapper;
            private readonly CategoryService _catService;

            public CategoryServiceTests()
            {
                var cfg = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<Category, CategoryDTO>();
                    cfg.CreateMap<CreateCategoryDTO, Category>();
                    cfg.CreateMap<UpdateCategoryDTO, Category>();
                });
                _mapper = cfg.CreateMapper();
                _catService = new CategoryService(_catRepoMock.Object, _mapper);
            }

            [Fact]
            public async Task GetAllCategoriesAsync_ReturnsMappedCategories()
            {
                var cats = new List<Category>
                {
                    new() { Id = Guid.NewGuid(), name = "Food" },
                    new() { Id = Guid.NewGuid(), name = "Salary" }
                };
                _catRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(cats);

                var result = await _catService.GetAllCategoriesAsync();

                Assert.Equal(2, result.Count());
                Assert.All(result, c => Assert.False(string.IsNullOrWhiteSpace(c.Name)));
            }
        }

        public class UserControllerTests
        {
            private readonly Mock<IUserService> _userServiceMock = new();
            private readonly Mock<ITransactionService> _txServiceMock = new();
            private readonly Mock<IAccountService> _acctServiceMock = new();
            private readonly Mock<IReportService> _reportServiceMock = new();
            private readonly Mock<IBudgetService> _budgetServiceMock = new();
            private readonly UserController _controller;

            public UserControllerTests()
            {
                _controller = new UserController(
                    _userServiceMock.Object,
                    _txServiceMock.Object,
                    _acctServiceMock.Object,
                    _reportServiceMock.Object,
                    _budgetServiceMock.Object);
            }

            [Fact]
            public async Task GetAllUsers_ReturnsOkWithUsers()
            {
                var list = new List<UserDTO> { new() { Id = Guid.NewGuid(), FirstName = "A", LastName = "B" } };
                _userServiceMock.Setup(s => s.GetAllUsersAsync()).ReturnsAsync(list);

                var result = await _controller.GetAllUsers();
                var ok = Assert.IsType<OkObjectResult>(result.Result);
                Assert.Equal(list, ok.Value);
            }

            [Fact]
            public async Task GetUser_ReturnsOkWithUser()
            {
                var id = Guid.NewGuid();
                var dto = new UserDTO { Id = id, FirstName = "X", LastName = "Y" };
                _userServiceMock.Setup(s => s.GetUserByIdAsync(id)).ReturnsAsync(dto);

                var result = await _controller.GetUser(id);
                var ok = Assert.IsType<OkObjectResult>(result.Result);
                Assert.Equal(dto, ok.Value);
            }

            [Fact]
            public async Task GetUserTransactions_NoTransactions_ReturnsNotFound()
            {
                var id = Guid.NewGuid();
                _txServiceMock.Setup(s => s.GetTransactionsForUserAsync(id)).ReturnsAsync(new List<TransactionDTO>());

                var result = await _controller.GetUserTransactions(id);
                var notFound = Assert.IsType<NotFoundObjectResult>(result.Result);
                Assert.Equal("No transactions found for this user.", notFound.Value);
            }

            [Fact]
            public async Task GetUserAccounts_HasAccounts_ReturnsOk()
            {
                var id = Guid.NewGuid();
                var list = new List<AccountDTO> { new() { Id = Guid.NewGuid(), Name = "A", Balance = 0, Currency = "USD" } };
                _acctServiceMock.Setup(s => s.GetAccountsForUserAsync(id)).ReturnsAsync(list);

                var result = await _controller.GetUserAccounts(id);
                var ok = Assert.IsType<OkObjectResult>(result.Result);
                Assert.Equal(list, ok.Value);
            }
        }
    }
}
