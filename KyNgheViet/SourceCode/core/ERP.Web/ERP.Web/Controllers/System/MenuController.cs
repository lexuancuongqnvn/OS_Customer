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
            input.XML = XmlHelper.ToXML(input.SYS_Menu_Sub);
            var result = await SYS_MenuRepository.SYS_Menu_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_Account_Group>> SYS_Account_Group_Search()
        {
            var result = await SYS_MenuRepository.SYS_Account_Group_Search(new SYS_Account_Group());
            return result;
        }
    }
}
