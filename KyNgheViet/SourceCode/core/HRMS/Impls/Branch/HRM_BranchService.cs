using ERP.Common.Controllers;
using HRMS.Intfs.Branch;
using HRMS.Intfs.Branch.Dto;
using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Impls.Branch
{
    public class HRM_BranchService : IHRM_BranchService
    {
        public async Task<IDictionary<string, object>> HRM_Branch_Actions(HRM_Branch_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Branch_Actions, input);
            return result;
        }

        public async Task<List<HRM_Branch_ENTITY>> HRM_Branch_Search(HRM_Branch_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Branch_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Branch_Search, input);
            return result;
        }
        public async Task<List<HRM_Branch_Detail_ENTITY>> HRM_Branch_Detail_Search(HRM_Branch_Detail_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Branch_Detail_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Branch_Detail_Search, input);
            return result;
        }
    }
}
