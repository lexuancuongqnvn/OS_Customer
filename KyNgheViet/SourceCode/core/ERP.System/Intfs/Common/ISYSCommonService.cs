using ERP.Common.Models;
using ERP.System.Intfs.Common.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Intfs.Common
{
    public interface ISYSCommonService
    {
        Task<IDictionary<string, object>> SYS_Version_UI_Search();
        Task<IDictionary<string, object>> SYS_List_App_Actions(SYS_List_App_ENTITY input);
        Task<List<SYS_List_App_ENTITY>> SYS_List_App_Search(SYS_List_App_ENTITY input);
        Task<List<Colors>> SYS_Color_Acctions(Colors input);
        Task<List<SYS_List_Company_ENTITY>> SYS_List_Company_Search(SYS_List_Company_ENTITY input);

        Task<IDictionary<string, object>> SYS_List_App_Group_Actions(SYS_List_App_Group_ENTITY input);
        Task<List<SYS_List_App_Group_ENTITY>> SYS_List_App_Group_Search(SYS_List_App_Group_ENTITY input);

        Task<IDictionary<string, object>> SYS_Alter_Table_Voucher(SYS_Alter_Table_Voucher_ENTITY input);


    }
}
