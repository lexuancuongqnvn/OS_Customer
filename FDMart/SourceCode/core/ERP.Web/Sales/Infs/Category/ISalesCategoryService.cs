using Sales.Infs.Category.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Infs.Category
{
    public interface ISalesCategoryService
    {
        Task<IDictionary<string, object>> CAT_Contract_Action_By_Type(CAT_Contract_ENTITY input);
        Task<List<CAT_Contract_ENTITY>> CAT_Contract_Search(CAT_Contract_ENTITY input);

        Task<IDictionary<string, object>> CAT_Customer_Group_Action_By_Type(CAT_Customer_Group_ENTITY input);
        Task<List<CAT_Customer_Group_ENTITY>> CAT_Customer_Group_Search(CAT_Customer_Group_ENTITY input);

        Task<List<CAT_Customer_ENTITY>> CAT_Customer_Search(CAT_Customer_ENTITY input);
        Task<IDictionary<string, object>> CAT_Customer_Insert(CAT_Customer_ENTITY input);
        Task<IDictionary<string, object>> CAT_Customer_Update(CAT_Customer_ENTITY input);
        Task<IDictionary<string, object>> CAT_Customer_Delete(CAT_Customer_ENTITY input);

        Task<List<CAT_Warranty_Certificate_ENTITY>> CAT_Warranty_Certificate_Search(CAT_Warranty_Certificate_ENTITY input);
        Task<IDictionary<string, object>> CAT_Warranty_Certificate_Insert(CAT_Warranty_Certificate_ENTITY input);
        Task<IDictionary<string, object>> CAT_Warranty_Certificate_Update(CAT_Warranty_Certificate_ENTITY input);
        Task<IDictionary<string, object>> CAT_Warranty_Certificate_Delete(CAT_Warranty_Certificate_ENTITY input);

    }
}
