using CASH.Infs.Voucher;
using CASH.Infs.Voucher.Dto;
using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CASH.Shared;

namespace CASH.Impls.Voucher
{
    public class CashVoucherService : ICashVoucherService
    {
        #region Phiếu thu
        public async Task<List<C11_M_ENTITY>> C11_M_Search(C11_M_ENTITY input)
        {


            var result = await ManagementController.GetDataFromStoredProcedure2<C11_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C11_M_Search, input);
            return result;
        }
        public async Task<List<C11_D_ENTITY>> C11_D_Search(C11_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<C11_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C11_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C11_M_Insert(C11_M_ENTITY input)
        {

            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C11_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C11_M_Update(C11_M_ENTITY input)
        {

            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C11_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C11_M_Delete(C11_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C11_M_Delete, input);
            return result;
        }

        #endregion
        #region Phiếu chi
        public async Task<List<C12_M_ENTITY>> C12_M_Search(C12_M_ENTITY input)
        {


            var result = await ManagementController.GetDataFromStoredProcedure2<C12_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C12_M_Search, input);
            return result;
        }
        public async Task<List<C12_D_ENTITY>> C12_D_Search(C12_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<C12_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C12_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C12_M_Insert(C12_M_ENTITY input)
        {

            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C12_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C12_M_Update(C12_M_ENTITY input)
        {

            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C12_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C12_M_Delete(C12_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C12_M_Delete, input);
            return result;
        }

        #endregion
        #region Phiếu báo có
        public async Task<List<C15_M_ENTITY>> C15_M_Search(C15_M_ENTITY input)
        {


            var result = await ManagementController.GetDataFromStoredProcedure2<C15_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C15_M_Search, input);
            return result;
        }
        public async Task<List<C15_D_ENTITY>> C15_D_Search(C15_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<C15_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C15_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C15_M_Insert(C15_M_ENTITY input)
        {

            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C15_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C15_M_Update(C15_M_ENTITY input)
        {

            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C15_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C15_M_Delete(C15_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C15_M_Delete, input);
            return result;
        }

        #endregion
        #region Phiếu báo nợ
        public async Task<List<C16_M_ENTITY>> C16_M_Search(C16_M_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<C16_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C16_M_Search, input);
            return result;
        }
        public async Task<List<C16_D_ENTITY>> C16_D_Search(C16_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<C16_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C16_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C16_M_Insert(C16_M_ENTITY input)
        {

            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C16_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C16_M_Update(C16_M_ENTITY input)
        {

            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C16_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> C16_M_Delete(C16_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.C16_M_Delete, input);
            return result;
        }

        #endregion
    }
}
