using Consolidation.Infs.Category.Dto;
using Consolidation.Infs.Voucher;
using Consolidation.Infs.Voucher.Dto;
using Consolidation.Shared;
using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Consolidation.Impls.Voucher
{
    public class ConsolidationVoucherService : IConsolidationVoucherService
    {
        #region Phiếu kế toán
        public async Task<List<C51_M_ENTITY>> C51_M_Search(C51_M_ENTITY input)
        {
            

            var result = await ManagementController.GetDataFromStoredProcedure2<C51_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C51_M_Search, input);
            return result;
        }
        public async Task<List<C51_D_ENTITY>> C51_D_Search(C51_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<C51_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C51_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C51_M_Insert(C51_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C51_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C51_M_Update(C51_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C51_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C51_M_Delete(C51_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C51_M_Delete, input);
            return result;
        }


        #endregion
        //Kết chuyển cuối kỳ
        public async Task<List<Carry_Forward_Execute_ENTITY>> Carry_Forward_Execute(Carry_Forward_Execute_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<Carry_Forward_Execute_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Carry_Forward_Execute, input);
            return result;
        } 
        //xóa Kết chuyển cuối kỳ
        public async Task<IDictionary<string, object>> Carry_Forward_Delete_Executed(Carry_Forward_Execute_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.Carry_Forward_Delete_Executed, input);
            return result;
        }
    }
}
