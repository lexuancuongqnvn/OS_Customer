using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WMS.Intfs.Voucher;
using WMS.Intfs.Voucher.Dto;
using WMS.Shared;

namespace WMS.Impls.Voucher
{
    public class WMSVouchercService: IWMSVouchercService
    {

        #region I41 phiếu nhập thành phẩm từ sản xuất
        public async Task<List<I41_M_ENTITY>> I41_M_Search(I41_M_ENTITY input)
        {
            
            var result = await ManagementController.GetDataFromStoredProcedure2<I41_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I41_M_Search, input);
            return result;
        }
        public async Task<List<I41_D_ENTITY>> I41_D_Search(I41_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<I41_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I41_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I41_M_Insert(I41_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I41_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I41_M_Update(I41_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I41_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I41_M_Delete(I41_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I41_M_Delete, input);
            return result;
        }
        #endregion
        #region I42
        public async Task<List<I42_M_ENTITY>> I42_M_Search(I42_M_ENTITY input)
        {
            
            var result = await ManagementController.GetDataFromStoredProcedure2<I42_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I42_M_Search, input);
            return result;
        }
        public async Task<List<I42_D_ENTITY>> I42_D_Search(I42_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<I42_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I42_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I42_M_Insert(I42_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I42_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I42_M_Update(I42_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I42_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I42_M_Delete(I42_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I42_M_Delete, input);
            return result;
        }
        #endregion
        #region I43
        public async Task<List<I43_M_ENTITY>> I43_M_Search(I43_M_ENTITY input)
        {
            
            var result = await ManagementController.GetDataFromStoredProcedure2<I43_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I43_M_Search, input);
            return result;
        }
        public async Task<List<I43_D_ENTITY>> I43_D_Search(I43_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<I43_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I43_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I43_M_Insert(I43_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I43_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I43_M_Update(I43_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I43_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I43_M_Delete(I43_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I43_M_Delete, input);
            return result;
        }
        #endregion
        #region I44
        public async Task<List<I44_M_ENTITY>> I44_M_Search(I44_M_ENTITY input)
        {
            
            var result = await ManagementController.GetDataFromStoredProcedure2<I44_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I44_M_Search, input);
            return result;
        }
        public async Task<List<I44_D_ENTITY>> I44_D_Search(I44_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<I44_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I44_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I44_M_Insert(I44_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I44_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I44_M_Update(I44_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I44_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I44_M_Delete(I44_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I44_M_Delete, input);
            return result;
        }
        #endregion
        #region I45 phiếu xuất công cụ lao động
        public async Task<List<I45_M_ENTITY>> I45_M_Search(I45_M_ENTITY input)
        {
            
            var result = await ManagementController.GetDataFromStoredProcedure2<I45_M_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I45_M_Search, input);
            return result;
        }
        public async Task<List<I45_D_ENTITY>> I45_D_Search(I45_D_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<I45_D_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I45_D_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I45_M_Insert(I45_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I45_M_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I45_M_Update(I45_M_ENTITY input)
        {
            
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I45_M_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I45_M_Delete(I45_M_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I45_M_Delete, input);
            return result;
        }
        #endregion
        #region Báo hỏng công cụ, dụng cụ
        public async Task<List<I45_Damaged_Tools_Equipment_ENTITY>> I45_Damaged_Tools_Equipment_Search(I45_Damaged_Tools_Equipment_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<I45_Damaged_Tools_Equipment_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I45_Damaged_Tools_Equipment_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I45_Damaged_Tools_Equipment_Update(I45_Damaged_Tools_Equipment_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I45_Damaged_Tools_Equipment_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> I45_Damaged_Tools_Equipment_Insert(I45_Damaged_Tools_Equipment_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I45_Damaged_Tools_Equipment_Insert, input);
            return result;
        }   
        public async Task<IDictionary<string, object>> I45_Damaged_Tools_Equipment_Delete(I45_Damaged_Tools_Equipment_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.I45_Damaged_Tools_Equipment_Delete, input);
            return result;
        }

        #endregion
    }
}
