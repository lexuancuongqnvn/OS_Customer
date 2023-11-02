using CASH.Infs.Category;
using CASH.Infs.Category.Dto;
using CASH.Shared;
using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CASH.Impls.Category
{
    public class CashCategoryService : ICashCategoryService
    {
        public async Task<IDictionary<string, object>> CAT_Foreign_Currency_Action_By_Type(CAT_Foreign_Currency_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Foreign_Currency_Action_By_Type, input);
            return result;
        }

        public async Task<List<CAT_Foreign_Currency_ENTITY>> CAT_Foreign_Currency_Search(CAT_Foreign_Currency_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Foreign_Currency_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Foreign_Currency_Search, input);
            return result;
        }
    }
}
