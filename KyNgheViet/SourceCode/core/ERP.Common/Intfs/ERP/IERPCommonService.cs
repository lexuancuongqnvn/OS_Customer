using ERP.Common.Intfs.ERP.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Common.Intfs.ERP
{
    public interface IERPCommonService
    {
        Task<IDictionary<string, object>> ERP_Common_Check_Voucher_Save(ERPCommon_ENTITY input);
        Task<IDictionary<string, object>> ERP_Common_Generate_Voucher_No(ERPCommon_ENTITY input);
        Task<List<SYS_List_Voucher_ENTITY>> SYS_List_Voucher_Search(SYS_List_Voucher_ENTITY input);  
        Task<IDictionary<string, object>> SYS_Language_Translate_Action_By_Type(SYS_Language_Translate_ENTITY input);
      
        Task<List<SYS_Language_Translate_ENTITY>> SYS_Language_Translate_Search(SYS_Language_Translate_ENTITY input);
        Task<List<SYS_Voucher_Year_ENTITY>> SYS_Voucher_Year_Search(SYS_Voucher_Year_ENTITY input);  
        Task<IDictionary<string, object>> SYS_List_Voucher_Block_Book_Update(SYS_List_Voucher_ENTITY input);

    }
}
