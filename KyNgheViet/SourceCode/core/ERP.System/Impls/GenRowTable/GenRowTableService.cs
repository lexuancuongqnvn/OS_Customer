using Abp.Application.Services.Dto;
using Common.Utils;
using ERP.Common.Controllers;
using ERP.System.Intfs.GenRowTable;
using ERP.System.Intfs.GenRowTable.Dto;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.System.Impls.Shared.GenRowTable
{
    public class GenRowTableService : IGenRowTableService
    {
        public async Task<List<SYS_GenRowTable>> SYS_GenRowTable_Search(SYS_GenRowTable input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_GenRowTable>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Search, input);
            return result;
        }       
        public async Task<List<SYS_GenRowTable_Detail>> SYS_GenRowTable_Detail_Search(SYS_GenRowTable_Detail input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_GenRowTable_Detail>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Detail_Search, input);
            return result;
        }     
        public async Task<List<SYS_GenRowTable_Detail>> SYS_GenRowTable_Detail_V2_Search(SYS_GenRowTable_Detail input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_GenRowTable_Detail>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Detail_V2_Search, input);
            return result;
        }

        public async Task<List<SYS_GenRowTable>> SYS_GenRowTable_Opption_Search()
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_GenRowTable>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Opption_Search, new SYS_GenRowTable());
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_GenRowTable_Delete_ListID(string[] listId)
        {
            List<SYS_GenRowTable> listItem = new List<SYS_GenRowTable>();
            for (int i = 0; i < listId.Length; i++)
            {
                SYS_GenRowTable sYS_ActionsOnTable_ENTITY = new SYS_GenRowTable();
                sYS_ActionsOnTable_ENTITY.ID = int.Parse(listId[i]);
                listItem.Add(sYS_ActionsOnTable_ENTITY);
            }
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Delete_ListID, new
            {
                xml = listItem.ToXmlFromList()
            });
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_GenRowTable_Update(List<SYS_GenRowTable> input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Update, new
            {
                xml = input.ToXmlFromList()
            });
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_GenRowTable_Update_Detail(SYS_GenRowTable input)
        {
            input.XML_Detail = input.SYS_GenRowTable_Detail.ToXmlFromList();
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Update_Detail, input);
            return result;
        }  
        public async Task<IDictionary<string, object>> SYS_GenRowTable_Opption_Action_By_Type(SYS_GenRowTable_Opption_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Opption_Action_By_Type, input);
            return result;
        }
        public async Task<List<SYS_GenRowTable_Opption_ENTITY>> SYS_GenRowTable_Opption_V2_Search(SYS_GenRowTable_Opption_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_GenRowTable_Opption_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Opption_v2_Search, input);
            return result;
        }
        public async Task<IDictionary<string, object>> SYS_GenRowTable_Insert(SYS_GenRowTable input)
        {
            input.XML_Detail = input.SYS_GenRowTable_Detail.ToXmlFromList();
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Insert, input);
            return result;
        }

        public async Task<List<SYS_GenRowTable>> SYS_GenRowTable_Root_Search(SYS_GenRowTable input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_GenRowTable>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Root_Search, input);
            return result;
        }

        public async Task<List<SYS_GenRowTable_Detail>> SYS_GenRowTable_Detail_Root_Search(SYS_GenRowTable_Detail input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_GenRowTable_Detail>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_GenRowTable_Detail_Root_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Generate_Table_Voucher(SYS_Generate_Table_Voucher_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Generate_Table_Voucher, input);
            return result;
        }
        public async Task<List<SYS_Column_Info_ENTITY>> SYS_Column_Info_Search(SYS_Column_Info_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_Column_Info_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Column_Info_Search, input);
            return result;
        }
        public async Task<IDictionary<string, object>> SYS_Column_Info_Action_By_Type(SYS_Column_Info_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Column_Info_Action_By_Type, input);
            return result;
        }
    }
}
