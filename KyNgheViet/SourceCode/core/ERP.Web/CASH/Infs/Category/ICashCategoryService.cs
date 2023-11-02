using CASH.Infs.Category.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CASH.Infs.Category
{
    public interface ICashCategoryService
    {
        Task<IDictionary<string, object>> CAT_Foreign_Currency_Action_By_Type(CAT_Foreign_Currency_ENTITY input);
        Task<List<CAT_Foreign_Currency_ENTITY>> CAT_Foreign_Currency_Search(CAT_Foreign_Currency_ENTITY input);
    }
}
