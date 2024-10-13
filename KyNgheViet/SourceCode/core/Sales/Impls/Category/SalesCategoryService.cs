using ERP.Common.Controllers;
using Sales.Infs.Category;
using Sales.Infs.Category.Dto;
using Sales.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Impls.Category
{
    public class SalesCategoryService : ISalesCategoryService
    {
        public async Task<IDictionary<string, object>> CAT_Contract_Action_By_Type(CAT_Contract_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Contract_Action_By_Type, input);
            return result;
        }

        public async Task<List<CAT_Contract_ENTITY>> CAT_Contract_Search(CAT_Contract_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Contract_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Contract_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Customer_Delete(CAT_Customer_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Customer_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Customer_Group_Action_By_Type(CAT_Customer_Group_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Customer_Group_Action_By_Type, input);
            return result;
        }

        public async Task<List<CAT_Customer_Group_ENTITY>> CAT_Customer_Group_Search(CAT_Customer_Group_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Customer_Group_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Customer_Group_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Customer_Insert(CAT_Customer_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Customer_Insert, input);
            return result;
        }

        public async Task<List<CAT_Customer_ENTITY>> CAT_Customer_Search(CAT_Customer_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Customer_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Customer_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Customer_Update(CAT_Customer_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Customer_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Warranty_Certificate_Delete(CAT_Warranty_Certificate_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Warranty_Certificate_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Warranty_Certificate_Insert(CAT_Warranty_Certificate_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Warranty_Certificate_Insert, input);
            return result;
        }

        public async Task<List<CAT_Warranty_Certificate_ENTITY>> CAT_Warranty_Certificate_Search(CAT_Warranty_Certificate_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Warranty_Certificate_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Warranty_Certificate_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Warranty_Certificate_Update(CAT_Warranty_Certificate_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Warranty_Certificate_Update, input);
            return result;
        }
    }
}
