using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WMS.Intfs.OB;
using WMS.Intfs.OB.Dto;
using WMS.Shared;

namespace WMS.Impls.OB
{
    public class OBWMSService : IOBWMSService
    {
        public async Task<IDictionary<string, object>> OB_Goods_Delete(OB_Goods_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Goods_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> OB_Goods_Insert(OB_Goods_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Goods_Insert, input);
            return result;
        }

        public async Task<List<OB_Goods_ENTITY>> OB_Goods_Search(OB_Goods_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<OB_Goods_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Goods_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> OB_Goods_Update(OB_Goods_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Goods_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> OB_Input_Output_Inventory_Delete(OB_Input_Output_Inventory_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Input_Output_Inventory_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> OB_Input_Output_Inventory_Insert(OB_Input_Output_Inventory_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Input_Output_Inventory_Insert, input);
            return result;
        }
        public async Task<IDictionary<string, object>> OB_Input_Output_Inventory_Synchronized(OB_Input_Output_Inventory_Synchronized_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Input_Output_Inventory_Synchronized, input);
            return result;
        }

        public async Task<List<OB_Input_Output_Inventory_ENTITY>> OB_Input_Output_Inventory_Search(OB_Input_Output_Inventory_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<OB_Input_Output_Inventory_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Input_Output_Inventory_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> OB_Input_Output_Inventory_Update(OB_Input_Output_Inventory_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Input_Output_Inventory_Update, input);
            return result;
        }
        public async Task<IDictionary<string, object>> OB_Account_Delete(OB_Account_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Account_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> OB_Account_Insert(OB_Account_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Account_Insert, input);
            return result;
        }

        public async Task<List<OB_Account_ENTITY>> OB_Account_Search(OB_Account_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<OB_Account_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Account_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> OB_Account_Update(OB_Account_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Account_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> OB_Customer_Delete(OB_Customer_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Customer_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> OB_Customer_Insert(OB_Customer_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Customer_Insert, input);
            return result;
        }

        public async Task<List<OB_Customer_ENTITY>> OB_Customer_Search(OB_Customer_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<OB_Customer_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Customer_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> OB_Customer_Update(OB_Customer_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.OB_Customer_Update, input);
            return result;
        }
    }
}
