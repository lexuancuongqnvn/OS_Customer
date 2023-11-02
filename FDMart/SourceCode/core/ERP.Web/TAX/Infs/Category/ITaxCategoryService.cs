using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TAX.Infs.Category.Dto;

namespace TAX.Infs.Category
{
    public interface ITaxCategoryService
    {
        Task<IDictionary<string, object>> CAT_Tax_Action_By_Type(CAT_Tax_ENTITY input);
        Task<List<CAT_Tax_ENTITY>> CAT_Tax_Search(CAT_Tax_ENTITY input);
    }
}
