using ERP.Common.Controllers;
using ERP.Common.Models;
using ERP.System.Intfs.Common;
using ERP.System.Intfs.Common.Dto;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Impls.Common
{
    public class SYSCommonService : ISYSCommonService
    {
        public async Task<IDictionary<string, object>> SYS_Alter_Table_Voucher(SYS_Alter_Table_Voucher_ENTITY input)
        {
            var result = (await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Alter_Table_Voucher, input));
            return result;
        }

        public async Task<List<Colors>> SYS_Color_Acctions(Colors input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<Colors>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Color_Acctions, input);
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_List_App_Actions(SYS_List_App_ENTITY input)
        {
            var result = (await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_List_App_Actions, input));
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_List_App_Group_Actions(SYS_List_App_Group_ENTITY input)
        {
            var result = (await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_List_App_Group_Actions, input));
            return result;
        }

        public async Task<List<SYS_List_App_Group_ENTITY>> SYS_List_App_Group_Search(SYS_List_App_Group_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_List_App_Group_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_List_App_Group_Search, input);
            return result;
        }

        public async Task<List<SYS_List_App_ENTITY>> SYS_List_App_Search(SYS_List_App_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_List_App_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_List_App_Search, input);
            return result;
        }

        public async Task<List<SYS_List_Company_ENTITY>> SYS_List_Company_Search(SYS_List_Company_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_List_Company_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_List_Company_Search, input);
            return result;
        }


        public async Task<IDictionary<string, object>> SYS_Version_UI_Search()
        {
            throw new NotImplementedException();
        }
    }
}
