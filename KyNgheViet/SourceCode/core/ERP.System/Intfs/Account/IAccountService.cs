using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ERP.System.Impls.Account.Dto;
using ERP.System.Intfs.Account.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.System.Impls.Account
{
    public interface IAccountService : IApplicationService
    {
        Task<IDictionary<string, object>> SYS_Account_Infomation_CheckLogin(string USER_NAME, string PASSWORD);
        Task<IDictionary<string, object>> SYS_Account_Infomation_Delete(string USER_NAME, int ACCOUNT_ID);
        Task<List<SYS_Account_Infomation>> SYS_Account_Info_Search_byUser(string USER_NAME);
        Task<List<SYS_Account_Group_Permission>> SYS_Account_Info_Permission_Search();
        Task<IDictionary<string, object>> SYS_Account_Search(SYS_Account_Group input);
        Task<IDictionary<string, object>> SYS_Account_Register(SYS_Account_Infomation input);
        Task<List<SYS_Account_Infomation>> SYS_Account_Info_Search(SYS_Account_Infomation input);
        Task<IDictionary<string, object>> SYS_Account_Infomation_Insert(SYS_Account_Infomation input);
        Task<IDictionary<string, object>> SYS_Account_Infomation_Register_Confirm(SYS_Account_Infomation input);
        Task<List<SYS_Account_Group>> SYS_Account_Group_Search(SYS_Account_Group input);
        Task<IDictionary<string, object>> SYS_Account_Group_Actions(SYS_Account_Group input);
        Task<IDictionary<string, object>> SYS_Account_Infomation_ForgotPassword_Inserst(string email, int code);
        Task<IDictionary<string, object>> SYS_Account_Infomation_Register(string email, int code);
        Task<IDictionary<string, object>> SYS_Account_Infomation_UpdatePassword(string email, int code, string password, string passwordNew,string passwordNew_Confirm);
        Task<IDictionary<string, object>> SYS_Account_Infomation_Update(SYS_Account_Infomation input);
        Task<List<RequestManagement_ENTITY>> RequestManagement_Search(string username);
        Task<List<RequestManagement_ENTITY>> RequestManagement_History(string username);
    }
}
