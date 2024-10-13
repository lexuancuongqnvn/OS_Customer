using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ERP.System.Impls.Account.Dto;
using ERP.System.Intfs.Menu.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ERP.System.Intfs.Menu
{
    public interface ISYS_MenuService : IApplicationService
    {
        Task<List<SYS_Menu>> SYS_Menu_Search(SYS_Menu input);
        Task<List<SYS_Menu_Sub>> SYS_Menu_Detail_Search(SYS_Menu_Sub input);
        Task<SYS_Menu> SYS_Menu_Search_byID(string CODE, int userID, string type);
        Task<List<SYS_Account_Group>> SYS_Account_Group_Search(SYS_Account_Group input);
        Task<IDictionary<string, object>> SYS_Menu_Delete(int ID);
        Task<IDictionary<string, object>> SYS_Menu_Inserst(SYS_Menu SYS_Menu);
        Task<IDictionary<string, object>> SYS_Menu_Sub_Pin(SYS_Menu_Sub_Pin input);
        Task<IDictionary<string, object>> SYS_Menu_Update(SYS_Menu SYS_Menu);
        Task<IDictionary<string, object>> SYS_Menu_Permission_Update(SYS_Menu SYS_Menu);
        Task<List<SYS_Menu_Permission_ENTITY>> SYS_Menu_Permission_Search(SYS_Menu_Permission_ENTITY input);
        Task<List<SYS_Menu_Sub>> SYS_Menu_Permission_Detail_Search(SYS_Menu_Sub input);
    }
}
