using Common.Utils;
using ERP.Common.Content.Helper;
using ERP.Common.Filters;
using ERP.System.Impls.Account.Dto;
using ERP.System.Intfs.Menu;
using ERP.System.Intfs.Menu.Dto;
using ERP.Web.Shared.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.System
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class MenuController : ControllerBase
    {
        private readonly ISYS_MenuService SYS_MenuRepository;

        public MenuController(ISYS_MenuService sYS_MenuRepository)
        {
            this.SYS_MenuRepository = sYS_MenuRepository;
        }
        [HttpPost]
        public async Task<List<SYS_Menu>> SYS_Menu_Search([FromBody] SYS_Menu input)
        {
            var result = await SYS_MenuRepository.SYS_Menu_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Menu_Sub_Pin([FromBody] SYS_Menu_Sub_Pin input)
        {
            var result = await SYS_MenuRepository.SYS_Menu_Sub_Pin(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_Menu_Sub>> SYS_Menu_Detail_Search([FromBody] SYS_Menu_Sub input)
        {
            var result = await SYS_MenuRepository.SYS_Menu_Detail_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<SYS_Menu> SYS_Menu_Search_byID(string CODE,int userID, string type)
        {
            var result = await SYS_MenuRepository.SYS_Menu_Search_byID(CODE, userID, type);
            SYS_Menu_Sub p = new SYS_Menu_Sub();
            p.FATHER = result.CODE;
            p.userID = userID;
            p.type = type;
            result.SYS_Menu_Sub = await SYS_MenuRepository.SYS_Menu_Detail_Search(p);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Menu_Delete(int id)
        {
            var result = await SYS_MenuRepository.SYS_Menu_Delete(id);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Menu_Inserst([FromBody] SYS_Menu input)
        {
            var result = await SYS_MenuRepository.SYS_Menu_Inserst(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Menu_Update([FromBody] SYS_Menu input)
        {
            input.XML = input.SYS_Menu_Sub.ToXmlFromList();
            var result = await SYS_MenuRepository.SYS_Menu_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_Account_Group>> SYS_Account_Group_Search()
        {
            var result = await SYS_MenuRepository.SYS_Account_Group_Search(new SYS_Account_Group());
            return result;
        }     
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Menu_Permission_Update([FromBody] SYS_Menu input)
        {
            input.XML = input.SYS_Menu_Sub.ToXmlFromList();
            var result = await SYS_MenuRepository.SYS_Menu_Permission_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_Menu_Permission_ENTITY>> SYS_Menu_Permission_Search([FromBody] SYS_Menu_Permission_ENTITY input)
        {
            var result = await SYS_MenuRepository.SYS_Menu_Permission_Search(input);
            if(!string.IsNullOrEmpty(input.code))
            {
                result = new List<SYS_Menu_Permission_ENTITY>();
                SYS_Menu_Permission_ENTITY item = new SYS_Menu_Permission_ENTITY();
                var menuSubs = await SYS_MenuRepository.SYS_Menu_Permission_Detail_Search(new SYS_Menu_Sub { CODE = input.code,userID=input.userID });
                if(menuSubs != null && menuSubs.Count > 0)
                {
                    var menu = await SYS_MenuRepository.SYS_Menu_Search_byID(menuSubs[0].FATHER, (int)input.userID,"");
                    item.sys_menu = menu;
                    item.sys_menu.SYS_Menu_Sub = menuSubs;
                }
                result.Add(item);
            }    
            return result;
        }
    }
}
