using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ERP.System.Intfs.GenRowTable.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.System.Intfs.GenRowTable
{
    public interface IGenRowTableService : IApplicationService
    {
        Task<List<SYS_GenRowTable>> SYS_GenRowTable_Search(SYS_GenRowTable input);
        Task<List<SYS_GenRowTable>> SYS_GenRowTable_Root_Search(SYS_GenRowTable input);
        Task<List<SYS_GenRowTable>> SYS_GenRowTable_Opption_Search();
        Task<List<SYS_GenRowTable_Detail>> SYS_GenRowTable_Detail_Search(SYS_GenRowTable_Detail input);
        Task<List<SYS_GenRowTable_Detail>> SYS_GenRowTable_Detail_V2_Search(SYS_GenRowTable_Detail input);
        Task<List<SYS_GenRowTable_Detail>> SYS_GenRowTable_Detail_Root_Search(SYS_GenRowTable_Detail input);
        Task<IDictionary<string, object>> SYS_GenRowTable_Delete_ListID(string[] listId);
        Task<IDictionary<string, object>> SYS_GenRowTable_Update(List<SYS_GenRowTable> input);
        Task<IDictionary<string, object>> SYS_GenRowTable_Update_Detail(SYS_GenRowTable input);
        Task<IDictionary<string, object>> SYS_GenRowTable_Opption_Action_By_Type(SYS_GenRowTable_Opption_ENTITY input);
        Task<List<SYS_GenRowTable_Opption_ENTITY>> SYS_GenRowTable_Opption_V2_Search(SYS_GenRowTable_Opption_ENTITY input);
        Task<IDictionary<string, object>> SYS_GenRowTable_Insert(SYS_GenRowTable input);        
        
        Task<List<SYS_Column_Info_ENTITY>> SYS_Column_Info_Search(SYS_Column_Info_ENTITY input);
        Task<IDictionary<string, object>> SYS_Column_Info_Action_By_Type(SYS_Column_Info_ENTITY input);

        Task<IDictionary<string, object>> SYS_Generate_Table_Voucher(SYS_Generate_Table_Voucher_ENTITY input);
    }
}
