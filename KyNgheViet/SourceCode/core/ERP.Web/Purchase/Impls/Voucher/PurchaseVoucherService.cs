using ERP.Common.Controllers;
using Purchase.Infs.Voucher;
using Purchase.Infs.Voucher.Dto;
using Purchase.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Purchase.Impls.Voucher
{
    public class PurchaseVoucherService : IPurchaseVoucherService
    {
        #region Hóa đơn mua dịch vụ
        public async Task<List<P21_M_ENTITY>> P21_M_Search(P21_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<P21_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P21_M_Search, input);
            return result;
        }
        public async Task<List<P21_D_ENTITY>> P21_D_Search(P21_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<P21_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P21_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P21_M_Insert(P21_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P21_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P21_M_Update(P21_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P21_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P21_M_Delete(P21_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P21_M_Delete, input);
            return result;
        }

        #endregion
        #region Hóa đơn mua hàng kiêm phiếu nhập kho
        public async Task<List<P22_D_ENTITY>> P22_D_Search(P22_D_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<P22_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P22_D_Search, input);
            return result;
        }
        public async Task<List<P22_M_ENTITY>> P22_M_Search(P22_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<P22_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P22_M_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P22_M_Delete(P22_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P22_M_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P22_M_Insert(P22_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P22_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P22_M_Update(P22_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P22_M_Update, input);
            return result;
        }
        #endregion
        #region nhập khẩu kiêm phiếu nhập kho
        public async Task<List<P23_D_ENTITY>> P23_D_Search(P23_D_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<P23_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P23_D_Search, input);
            return result;
        }
        public async Task<List<P23_M_ENTITY>> P23_M_Search(P23_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<P23_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P23_M_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P23_M_Delete(P23_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P23_M_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P23_M_Insert(P23_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P23_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P23_M_Update(P23_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P23_M_Update, input);
            return result;
        }
        #endregion
        #region chứng từ trả hàng kiêm phiếu xuất
        public async Task<List<P24_M_ENTITY>> P24_M_Search(P24_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<P24_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P24_M_Search, input);
            return result;
        }
        public async Task<List<P24_D_ENTITY>> P24_D_Search(P24_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<P24_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P24_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P24_M_Insert(P24_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P24_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P24_M_Update(P24_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P24_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P24_M_Delete(P24_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P24_M_Delete, input);
            return result;
        }

        #endregion
        #region Chứng từ chi phí mua hàng
        public async Task<List<P25_M_ENTITY>> P25_M_Search(P25_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<P25_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P25_M_Search, input);
            return result;
        }
        public async Task<List<P25_D_ENTITY>> P25_D_Search(P25_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<P25_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P25_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P25_M_Insert(P25_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P25_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P25_M_Update(P25_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P25_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P25_M_Delete(P25_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P25_M_Delete, input);
            return result;
        }

        #endregion
        #region Chứng từ thanh toán theo hóa đơn
        public async Task<List<P26_M_ENTITY>> P26_M_Search(P26_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);

            var result = await ManagementController.GetDataFromStoredProcedure2<P26_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P26_M_Search, input);
            return result;
        }
        public async Task<List<P26_D_ENTITY>> P26_D_Search(P26_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<P26_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P26_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P26_M_Insert(P26_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P26_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P26_M_Update(P26_M_ENTITY input)
        {
            _ = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), "SYS_Generate_Table_Voucher", input);
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P26_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> P26_M_Delete(P26_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.P26_M_Delete, input);
            return result;
        }

        #endregion
    }
}
