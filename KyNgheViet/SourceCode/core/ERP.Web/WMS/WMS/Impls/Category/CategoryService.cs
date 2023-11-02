using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WMS.Intfs.Category;
using WMS.Intfs.Category.Dto;
using WMS.Shared;

namespace WMS.Impls.Category
{
    public class CategoryService : ICategoryService
    {
        public async Task<IDictionary<string, object>> CAT_Goods_Delete(CAT_Goods_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Goods_Insert(CAT_Goods_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Insert, input);
            return result;
        }

        public async Task<List<CAT_Goods_ENTITY>> CAT_Goods_Search(CAT_Goods_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Goods_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Goods_Update(CAT_Goods_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Update, input);
            return result;
        }

        public async Task<List<CAT_Warehouse_ENTITY>> CAT_Warehouse_Search(CAT_Warehouse_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Warehouse_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Warehouse_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Warehouse_Action_By_Type(CAT_Warehouse_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Warehouse_Action_By_Type, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Goods_Unit_Action_By_Type(CAT_Goods_Unit_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Unit_Action_By_Type, input);
            return result;
        }

        public async Task<List<CAT_Goods_Unit_ENTITY>> CAT_Goods_Unit_Search(CAT_Goods_Unit_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Goods_Unit_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Unit_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Goods_Group_Action_By_Type(CAT_Goods_Group_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Group_Action_By_Type, input);
            return result;
        }

        public async Task<List<CAT_Goods_Group_ENTITY>> CAT_Goods_Group_Search(CAT_Goods_Group_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Goods_Group_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Group_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Goods_Unit_Conversion_Factor_Delete(CAT_Goods_Unit_Conversion_Factor_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Unit_Conversion_Factor_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Goods_Unit_Conversion_Factor_Update(CAT_Goods_Unit_Conversion_Factor_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Unit_Conversion_Factor_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Goods_Unit_Conversion_Factor_Insert(CAT_Goods_Unit_Conversion_Factor_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Unit_Conversion_Factor_Insert, input);
            return result;
        }

        public async Task<List<CAT_Goods_Unit_Conversion_Factor_ENTITY>> CAT_Goods_Unit_Conversion_Factor_Search(CAT_Goods_Unit_Conversion_Factor_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Goods_Unit_Conversion_Factor_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Goods_Unit_Conversion_Factor_Search, input);
            return result;
        }
    }
}
