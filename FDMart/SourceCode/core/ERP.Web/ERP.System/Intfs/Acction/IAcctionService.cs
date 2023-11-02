using Abp.Application.Services;
using ERP.System.Intfs.Acction.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Intfs.Acction
{
    public interface IAcctionService : IApplicationService
    {
        Task<List<SYS_ActionsOnTable_ENTITY>> Acction_Search_byTableName(int userID, string TABLE_NAME);
        Task<List<SYS_ActionsOnTable_ENTITY>> Acction_Search(SYS_ActionsOnTable_ENTITY input);
        Task<IDictionary<string, object>> Acction_Delete_ListID(string[] listId);
        Task<IDictionary<string, object>> Acction_Update(List<SYS_ActionsOnTable_ENTITY> input);
        Task<IDictionary<string, object>> Acction_Update_v2(ActionOnTableModel input);
        Task<IDictionary<string, object>> Acction_Autorenew(SYS_ActionsOnTable_ENTITY input);
    }
}
