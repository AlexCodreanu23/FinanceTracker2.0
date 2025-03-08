using AutoMapper;
using FinanceTracker_2._0.Models;
using FinanceTracker_2._0.Models.DTOs.AccountDTOs;
using FinanceTracker_2._0.Models.DTOs.BudgetDTOs;
using FinanceTracker_2._0.Models.DTOs.CategoryDTOs;
using FinanceTracker_2._0.Models.DTOs.ReportDTOs;
using FinanceTracker_2._0.Models.DTOs.TransactionDTOs;
using FinanceTracker_2._0.Models.DTOs.UserDTOs;

namespace FinanceTracker_2._0.MappingProfiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Account, AccountDTO>();
            CreateMap<CreateAccountDTO, Account>();
            CreateMap<UpdateAccountDTO, Account>();

            CreateMap<Budget, BudgetDTO>()
                .ForMember(dest => dest.BudgetName, opt => opt.MapFrom(src => src.budgetName));
            CreateMap<CreateBudgetDTO, Budget>();
            CreateMap<UpdateBudgetDTO, Budget>();

            CreateMap<Category, CategoryDTO>();
            CreateMap<CreateCategoryDTO, Category>();
            CreateMap<UpdateCategoryDTO, Category>();

            CreateMap<Report, ReportDTO>();
            CreateMap<CreateReportDTO, Report>();
            CreateMap<UpdateReportDTO, Report>();

            CreateMap<Transaction, TransactionDTO>();
            CreateMap<CreateTransactionDTO, Transaction>();
            CreateMap<UpdateTransactionDTO, Transaction>();

            CreateMap<User, UserDTO>();
            CreateMap<CreateUserDTO, User>();
            CreateMap<UpdateUserDTO, User>();

        }
    }
}
