using Abp.Application.Services.Dto;
using ERP.Common.Controllers;
using ERP.System.Impls.Account.Dto;
using ERP.System.Intfs.Account.Dto;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.System.Impls.Account
{
    public class AccountService : IAccountService
    {
        public async Task<IDictionary<string, object>> SYS_Account_Infomation_CheckLogin(string USER_NAME, string PASSWORD)
        {
            string deCodePassword = ManagementController.DecryptString(PASSWORD);
            var result = (await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Infomation_CheckLogin, new
            {
                USER_NAME = USER_NAME,
                PASSWORD = deCodePassword
            }));
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Account_Search(SYS_Account_Group input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Search, input);
            return result;
        }
        public async Task<List<SYS_Account_Infomation>> SYS_Account_Info_Search_byUser(string USER_NAME)
        {
            var result = await ManagementController.GetDataFromStoredProcedure <SYS_Account_Infomation>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Info_Search_byUser
                , new {
                    USER_NAME = USER_NAME
                });
            return result;
        }
        public async Task<IDictionary<string, object>> SYS_Account_Infomation_ForgotPassword_Inserst(string email,int code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Infomation_ForgotPassword_Inserst, new
            {
                EMAIL = email,
                CODE = code
            });
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Account_Infomation_UpdatePassword(string email, int code, string password, string passwordNew, string passwordNew_Confirm)
        {
            string deCodePasswordNew = ManagementController.EncryptString(passwordNew);
            string deCodePasswordNew_Confirm = ManagementController.EncryptString(passwordNew_Confirm);
            password = ManagementController.EncryptString(password);
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Infomation_UpdatePassword, new
            {
                EMAIL =email,
                CODE = code,
                PASSWORD = password,
                PASSWORDNEW = deCodePasswordNew,
                PASSWORDNEW_CONFIRM = deCodePasswordNew_Confirm
            });
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Account_Infomation_Update(SYS_Account_Infomation input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Infomation_Update, input);
            return result;
        }

        public async Task<List<RequestManagement_ENTITY>> RequestManagement_Search(string username)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<RequestManagement_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.RequestManagement_Search, new{ Username = username });
            return result;
        }

        public async Task<List<RequestManagement_ENTITY>> RequestManagement_History(string username)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<RequestManagement_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.RequestManagement_History, new { Username = username });
            return result;
        }

        public async Task<List<SYS_Account_Group>> SYS_Account_Group_Search(SYS_Account_Group input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_Account_Group>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Group_Search, input);
            return result;
        } 
        public async Task<List<SYS_Account_Group_Permission>> SYS_Account_Info_Permission_Search()
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_Account_Group_Permission>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Info_Permission_Search, new SYS_Account_Group_Permission());
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Account_Register(SYS_Account_Infomation input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Register, input);
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Account_Infomation_Register(string email, int code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Infomation_Register, new
            {
                EMAIL = email,
                CODE = code
            });
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Account_Infomation_Register_Confirm(SYS_Account_Infomation input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Infomation_Register_Confirm, input);
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Account_Group_Actions(SYS_Account_Group input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Group_Actions, input);
            return result;
        }
        public async Task<IDictionary<string, object>> SYS_Account_Infomation_Insert(SYS_Account_Infomation input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Infomation_Insert, input);
            return result;
        }

        public async Task<List<SYS_Account_Infomation>> SYS_Account_Info_Search(SYS_Account_Infomation input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_Account_Infomation>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Info_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Account_Infomation_Delete(string USER_NAME, int ACCOUNT_ID)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Infomation_Delete, new { USER_NAME = USER_NAME , ACCOUNT_ID = ACCOUNT_ID });
            return result;
        }
    }
}
