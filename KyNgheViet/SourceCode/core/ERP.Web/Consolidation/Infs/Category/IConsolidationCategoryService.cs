using Consolidation.Infs.Category.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Consolidation.Infs.Category
{
    public interface IConsolidationCategoryService
    {
        //tai khoan
        Task<List<CAT_Account_ENTITY>> CAT_Account_Search(CAT_Account_ENTITY input);
        Task<IDictionary<string, object>> CAT_Account_Insert(CAT_Account_ENTITY input);
        Task<IDictionary<string, object>> CAT_Account_Update(CAT_Account_ENTITY input);
        Task<IDictionary<string, object>> CAT_Account_Delete(CAT_Account_ENTITY input);

        Task<List<CAT_Profession_ENTITY>> CAT_Profession_Search(CAT_Profession_ENTITY input);
        Task<IDictionary<string, object>> CAT_Profession_Insert(CAT_Profession_ENTITY input);
        Task<IDictionary<string, object>> CAT_Profession_Update(CAT_Profession_ENTITY input);
        Task<IDictionary<string, object>> CAT_Profession_Delete(CAT_Profession_ENTITY input);       
        
        Task<List<CAT_Carry_Forward_ENTITY>> CAT_Carry_Forward_Search(CAT_Carry_Forward_ENTITY input);
        Task<IDictionary<string, object>> CAT_Carry_Forward_Insert(CAT_Carry_Forward_ENTITY input);
        Task<IDictionary<string, object>> CAT_Carry_Forward_Update(CAT_Carry_Forward_ENTITY input);
        Task<IDictionary<string, object>> CAT_Carry_Forward_Delete(CAT_Carry_Forward_ENTITY input);
    }
}
