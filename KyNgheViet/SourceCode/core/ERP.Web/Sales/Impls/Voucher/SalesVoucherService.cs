using ERP.Common.Controllers;
using Sales.Infs.Voucher;
using Sales.Infs.Voucher.Dto;
using Sales.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Impls.Voucher
{
    public class SalesVoucherService : ISalesVoucherService
    {
        #region S31 Hóa đơn dịch vụ
        public async Task<List<S31_M_ENTITY>> S31_M_Search(S31_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<S31_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S31_M_Search, input);
            return result;
        }
        public async Task<List<S31_D_ENTITY>> S31_D_Search(S31_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<S31_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S31_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S31_M_Insert(S31_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S31_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S31_M_Update(S31_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S31_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S31_M_Delete(S31_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S31_M_Delete, input);
            return result;
        }


        #endregion

        #region S32 Hóa đơn bán hàng
        public async Task<List<S32_M_ENTITY>> S32_M_Search(S32_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<S32_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S32_M_Search, input);
            return result;
        }
        public async Task<List<S32_D_ENTITY>> S32_D_Search(S32_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<S32_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S32_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S32_M_Insert(S32_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S32_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S32_M_Update(S32_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S32_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S32_M_Delete(S32_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S32_M_Delete, input);
            return result;
        }

        public async Task<List<S32_KIT_ENTITY>> S32_KIT_Search(S32_KIT_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<S32_KIT_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S32_KIT_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S32_KIT_Insert(S32_KIT_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S32_KIT_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S32_KIT_Update(S32_KIT_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S32_KIT_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S32_KIT_Delete(S32_KIT_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S32_KIT_Delete, input);
            return result;
        }
        #endregion
        
        #region S33 Hóa đơn giảm giá, hàng bán trả lại
        public async Task<List<S33_M_ENTITY>> S33_M_Search(S33_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<S33_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S33_M_Search, input);
            return result;
        }
        public async Task<List<S33_D_ENTITY>> S33_D_Search(S33_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<S33_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S33_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S33_M_Insert(S33_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S33_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S33_M_Update(S33_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S33_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S33_M_Delete(S33_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S33_M_Delete, input);
            return result;
        }

        #endregion
        #region S34 phiếu thu công nợ theo hóa đơn
        public async Task<List<S34_M_ENTITY>> S34_M_Search(S34_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<S34_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S34_M_Search, input);
            return result;
        }
        public async Task<List<S34_D_ENTITY>> S34_D_Search(S34_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<S34_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S34_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S34_M_Insert(S34_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S34_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S34_M_Update(S34_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S34_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> S34_M_Delete(S34_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.S34_M_Delete, input);
            return result;
        }

        #endregion
    }
}
