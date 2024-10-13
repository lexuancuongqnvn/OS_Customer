using Abp.Application.Services.Dto;
using ERP.Common.Controllers;
using ERP.System.Impls.Account.Dto;
using ERP.System.Intfs.Acction.Dto;
using ERP.System.Intfs.Menu;
using ERP.System.Intfs.Menu.Dto;
using ERP.System.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.System.Impls.Menu
{
    public class SYS_MenuService : ISYS_MenuService
    {
        public async Task<IDictionary<string, object>> SYS_Menu_Delete(int ID)
        {
            var result = (await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Menu_Delete, new { 
                ID=ID
            }));
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Menu_Inserst(SYS_Menu input)
        {
            var result = (await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Menu_Inserst, input));
            return result;
        }

        public async Task<List<SYS_Menu>> SYS_Menu_Search(SYS_Menu input)
        {
            List<SYS_Menu> result =  await ManagementController.GetDataFromStoredProcedure<SYS_Menu>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Menu_Search, input);
            List<SYS_Menu_Sub> _result = await ManagementController.GetDataFromStoredProcedure<SYS_Menu_Sub>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Menu_Detail_Search, input);
            foreach(SYS_Menu items in result)
            {
                if (items.SYS_Menu_Sub == null)
                    items.SYS_Menu_Sub = new List<SYS_Menu_Sub>();
                foreach (SYS_Menu_Sub _items in _result)
                {
                    if (items.CODE == _items.FATHER)
                        items.SYS_Menu_Sub.Add(_items);
                }
            }
            return result;
        }
        public async Task<List<SYS_Menu_Sub>> SYS_Menu_Detail_Search(SYS_Menu_Sub input)
        {
            var result =  await ManagementController.GetDataFromStoredProcedure<SYS_Menu_Sub>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Menu_Detail_Search, input);
            return result;
        }
        public async Task<SYS_Menu> SYS_Menu_Search_byID(string CODE, int userID,string type)
        {
            var result = (await ManagementController.GetDataFromStoredProcedure<SYS_Menu>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Menu_Search_byID, new
            {
                CODE = CODE,
                userID = userID
            })).FirstOrDefault();
            return result;
        }

        public async Task<IDictionary<string, object>> SYS_Menu_Update(SYS_Menu input)
        {
            var result = (await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Menu_Update, input));
            return result;
        }  public async Task<IDictionary<string, object>> SYS_Menu_Sub_Pin(SYS_Menu_Sub_Pin input)
        {
            var result = (await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Menu_Sub_Pin, input));
            return result;
        }
        public async Task<IDictionary<string, object>> SYS_Menu_Permission_Update(SYS_Menu input)
        {
            var result = (await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Menu_Permission_Update, input));
            return result;
        }

        public async Task<List<SYS_Account_Group>> SYS_Account_Group_Search(SYS_Account_Group input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<SYS_Account_Group>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Account_Group_Search, input);
            return result;
        }

        public async Task<List<SYS_Menu_Permission_ENTITY>> SYS_Menu_Permission_Search(SYS_Menu_Permission_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SYS_Menu_Permission_ENTITY>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Menu_Permission_Search, input);
            return result;
        }
        public async Task<List<SYS_Menu_Sub>> SYS_Menu_Permission_Detail_Search(SYS_Menu_Sub input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<SYS_Menu_Sub>(ConnectController.GetConnectStringByKey("ID"), CommonStoreProcedure.SYS_Menu_Permission_Detail_Search, input);
            return result;
        }

    }
}
