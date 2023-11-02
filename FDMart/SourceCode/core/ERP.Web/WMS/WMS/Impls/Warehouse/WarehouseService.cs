using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WMS.Intfs.Voucher.Dto;
using WMS.Intfs.Warehouse;
using WMS.Intfs.Warehouse.Dto;
using WMS.Shared;

namespace WMS.Impls.Warehouse
{
    public class WarehouseService : IWarehouseService
    {
        public async Task<List<WMS_Warehouse_Goods_Issue_ENTITY>> WMS_Warehouse_Goods_Issue_Bycode(string code)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<WMS_Warehouse_Goods_Issue_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Issue_Bycode, new { code = code });
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Issue_Delete(string code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Issue_Delete, new { code= code });
            return result;
        }

        public async Task<List<WMS_Warehouse_Goods_Issue_ENTITY>> WMS_Warehouse_Goods_Issue_Search(WMS_Warehouse_Goods_Issue_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<WMS_Warehouse_Goods_Issue_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Issue_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Issue_Update(WMS_Warehouse_Goods_Issue_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Issue_Update, input);
            return result;
        }

        public async Task<List<WMS_Warehouse_Goods_Receipt_ENTITY>> WMS_Warehouse_Goods_Receipt_Bycode(string code, string type)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<WMS_Warehouse_Goods_Receipt_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Bycode, new { code = code, type= type });
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delete(string code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Delete, new { code = code });
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Insert(WMS_Warehouse_Goods_Receipt_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Insert, input);
            return result;
        }

        public async Task<List<WMS_Warehouse_Goods_Receipt_ENTITY>> WMS_Warehouse_Goods_Receipt_Search(WMS_Warehouse_Goods_Receipt_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<WMS_Warehouse_Goods_Receipt_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Update(WMS_Warehouse_Goods_Receipt_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Issue_Insert(WMS_Warehouse_Goods_Issue_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Issue_Insert, input);
            return result;
        }

        public async Task<List<WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Search(WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Insert(WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Update(WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Delete(string code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Delete, new { code = code });
            return result;
        }

        public async Task<List<WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Bycode(string code)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<WMS_Warehouse_Goods_Receipt_Delivery_Partner_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Bycode, new { code = code });
            return result;
        }

        public async Task<List<WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_ENTITY>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Search(WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Insert(WMS_Warehouse_Goods_Issue_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Delivery_Partner_Type_Insert, input);
            return result;
        }

        public async Task<List<WMS_Warehouse_ENTITY>> WMS_Warehouse_Search(WMS_Warehouse_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<WMS_Warehouse_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Insert(WMS_Warehouse_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Update(WMS_Warehouse_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_Delete(string code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Delete, new{ code= code });
            return result;
        }

        public async Task<List<WMS_Warehouse_ENTITY>> WMS_Warehouse_Bycode(string code)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<WMS_Warehouse_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Bycode, new { code = code });
            return result;
        }

        public async Task<List<WMS_Warehouse_Goods_Receipt_Detail_ENTITY>> WMS_Warehouse_Goods_Receipt_Detail_Bycode(string code, string type)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<WMS_Warehouse_Goods_Receipt_Detail_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_Goods_Receipt_Bycode, new { code = code, type= type });
            return result;
        }

        public async Task<List<WMS_Warehouse_SKU_ENTITY>> WMS_Warehouse_SKU_Search(WMS_Warehouse_SKU_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<WMS_Warehouse_SKU_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_SKU_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> WMS_Warehouse_SKU_Actions(WMS_Warehouse_SKU_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.WMS_Warehouse_SKU_Actions, input);
            return result;
        }
    }
}
