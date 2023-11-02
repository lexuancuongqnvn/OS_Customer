using ERP.Common.Controllers;
using POS.Intfs.Product;
using POS.Intfs.Product.Dto;
using POS.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Impls.Product
{
    public class ProductService : IProductService
    {
        public async Task<IDictionary<string, object>> POS_Product_Update(POS_Product_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Update, input);
            return result;
        }
        public async Task<IDictionary<string, object>> POS_Product_Insert(POS_Product_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> POS_Product_Delete(string code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Delete, new { code = code });
            return result;
        }
        public async Task<IDictionary<string, object>> POS_Product_Color_Actions(POS_Product_Color_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Color_Actions, input);
            return result;
        }

        public async Task<List<POS_Product_Color_ENTITY>> POS_Product_Color_Search(POS_Product_Color_ENTITY input)
        {
            input.type = "SEARCH";
            var result = await ManagementController.GetDataFromStoredProcedure<POS_Product_Color_ENTITY>(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Color_Actions, input);
            return result;
        }

        public async Task<IDictionary<string, object>> POS_Product_Gift_Actions(POS_Product_Gift_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Gift_Actions, input);
            return result;
        }

        public async Task<List<POS_Product_Gift_ENTITY>> POS_Product_Gift_Search(POS_Product_Gift_ENTITY input)
        {
            input.type = "SEARCH";
            var result = await ManagementController.GetDataFromStoredProcedure<POS_Product_Gift_ENTITY>(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Gift_Actions, input);
            return result;
        }

        public async Task<IDictionary<string, object>> POS_Product_Group_Actions(POS_Product_Group_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Group_Actions, input);
            return result;
        }

        public async Task<List<POS_Product_Group_ENTITY>> POS_Product_Group_Search(POS_Product_Group_ENTITY input)
        {
            input.type = "SEARCH";
            var result = await ManagementController.GetDataFromStoredProcedure<POS_Product_Group_ENTITY>(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Group_Actions, input);
            return result;
        }

        public async Task<List<POS_Product_ENTITY>> POS_Product_Search(POS_Product_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<POS_Product_ENTITY>(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> POS_Product_Size_Actions(POS_Product_Size_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Size_Actions, input);
            return result;
        }

        public async Task<List<POS_Product_Size_ENTITY>> POS_Product_Size_Search(POS_Product_Size_ENTITY input)
        {
            input.type = "SEARCH";
            var result = await ManagementController.GetDataFromStoredProcedure<POS_Product_Size_ENTITY>(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Size_Actions, input);
            return result;
        }

        public async Task<IDictionary<string, object>> POS_Product_Unit_Actions(POS_Product_Unit_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Unit_Actions, input);
            return result;
        }

        public async Task<List<POS_Product_Unit_ENTITY>> POS_Product_Unit_Search(POS_Product_Unit_ENTITY input)
        {
            input.type = "SEARCH";
            var result = await ManagementController.GetDataFromStoredProcedure<POS_Product_Unit_ENTITY>(ConnectController.GetConnectStringByKey("POS"), CommonStoredProcedures.POS_Product_Unit_Actions, input);
            return result;
        }

        
    }
}
