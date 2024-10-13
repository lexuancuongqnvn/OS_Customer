using Consolidation.Infs.Category;
using Consolidation.Infs.Category.Dto;
using Consolidation.Shared;
using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Consolidation.Impls.Category
{
    public class ConsolidationCategoryService : IConsolidationCategoryService
    {
        public async Task<IDictionary<string, object>> CAT_Account_Delete(CAT_Account_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Account_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Account_Insert(CAT_Account_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Account_Insert, input);
            return result;
        }

        public async Task<List<CAT_Account_ENTITY>> CAT_Account_Search(CAT_Account_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Account_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Account_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Account_Update(CAT_Account_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Account_Update, input);
            return result;
        }
        
        public async Task<IDictionary<string, object>> CAT_Profession_Delete(CAT_Profession_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Profession_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Profession_Insert(CAT_Profession_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Profession_Insert, input);
            return result;
        }

        public async Task<List<CAT_Profession_ENTITY>> CAT_Profession_Search(CAT_Profession_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Profession_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Profession_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Profession_Update(CAT_Profession_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Profession_Update, input);
            return result;
        }
        
        public async Task<IDictionary<string, object>> CAT_Carry_Forward_Delete(CAT_Carry_Forward_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Carry_Forward_Delete, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Carry_Forward_Insert(CAT_Carry_Forward_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Carry_Forward_Insert, input);
            return result;
        }

        public async Task<List<CAT_Carry_Forward_ENTITY>> CAT_Carry_Forward_Search(CAT_Carry_Forward_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Carry_Forward_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Carry_Forward_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> CAT_Carry_Forward_Update(CAT_Carry_Forward_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Carry_Forward_Update, input);
            return result;
        }
    }
}
