using Common.Utils;
using ERP.Common.Controllers;
using ERP.System.Intfs.Acction;
using ERP.System.Intfs.Acction.Dto;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ERP.System.Impls.Acction
{
    public class AcctionService : IAcctionService
    {
        public async Task<List<SYS_ActionsOnTable_ENTITY>> Acction_Search(SYS_ActionsOnTable_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_ActionsOnTable_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.Acction_Search,input);
            return result;
        }

        public async Task<List<SYS_ActionsOnTable_ENTITY>> Acction_Search_byTableName(int userID, string TABLE_NAME)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_ActionsOnTable_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.Acction_Search_byTableName, new
            {
                userID = userID,
                tbName = TABLE_NAME
            });
            return result;
        }
        public async Task<IDictionary<string, object>> Acction_Delete_ListID(string[] listId)
        {
            List<SYS_ActionsOnTable_ENTITY> listItem = new List<SYS_ActionsOnTable_ENTITY>();
            for(int i = 0; i < listId.Length; i++)
            {
                SYS_ActionsOnTable_ENTITY sYS_ActionsOnTable_ENTITY = new SYS_ActionsOnTable_ENTITY();
                sYS_ActionsOnTable_ENTITY.id = int.Parse(listId[i]);
                listItem.Add(sYS_ActionsOnTable_ENTITY);
            }
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.Acction_Delete_ListID, new
            {
                xml = listItem.ToXmlFromList()
            });
            return result;
        }

        public async Task<IDictionary<string, object>> Acction_Update(List<SYS_ActionsOnTable_ENTITY> input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.Acction_Update, new
            {
                xml = input.ToXmlFromList()
            });
            return result;
        }

        public async Task<IDictionary<string, object>> Acction_Autorenew(SYS_ActionsOnTable_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.Acction_Autorenew, input);
            return result;
        }

        public async Task<IDictionary<string, object>> Acction_Update_v2(ActionOnTableModel input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.Acction_Update_v2, new
            {
                xml = input.SYS_ActionsOnTables.ToXmlFromList(),
                tbName = input.tbName
            });
            return result;
        }
    }
}
