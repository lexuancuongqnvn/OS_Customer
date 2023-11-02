using ERP.Common.Controllers;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TAX.Infs.Category;
using TAX.Infs.Category.Dto;
using TAX.Shared;

namespace TAX.Impls.Category
{
    public class TaxCategoryService : ITaxCategoryService
    {
        public async Task<IDictionary<string, object>> CAT_Tax_Action_By_Type(CAT_Tax_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore2(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Tax_Action_By_Type, input);
            return result;
        }

        public async Task<List<CAT_Tax_ENTITY>> CAT_Tax_Search(CAT_Tax_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<CAT_Tax_ENTITY>(ConnectController.GetConnectStringByKey("WMS"), CommonStoredProcedures.CAT_Tax_Search, input);
            return result;
        }
    }
}
