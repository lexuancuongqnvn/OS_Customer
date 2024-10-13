using Common.Utils;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.System.Intfs.Acction;
using ERP.System.Intfs.Acction.Dto;
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
    public class AcctionController : ControllerBase
    {
        private readonly IAcctionService IAcctionRepository;

        public AcctionController(IAcctionService acctionRepository)
        {
            this.IAcctionRepository = acctionRepository;
        }
        [HttpPost]
        public async Task<List<SYS_ActionsOnTable_ENTITY>> Acction_Search_byTableName(int userID, string TABLE_NAME)
        {
            var result = await IAcctionRepository.Acction_Search_byTableName(userID,TABLE_NAME);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_ActionsOnTable_ENTITY>> Acction_Search([FromBody]SYS_ActionsOnTable_ENTITY input)
        {
            var result = await IAcctionRepository.Acction_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_ActionsOnTable_ENTITY>> Acction_V3_Search([FromBody] SYS_ActionsOnTable_ENTITY input)
        {
            var result = await IAcctionRepository.Acction_V3_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<SYS_ActionsOnTable_Permission_ENTITY> Action_Permission_Search([FromBody] SYS_ActionsOnTable_Permission_ENTITY input)
        {
            var result = new SYS_ActionsOnTable_Permission_ENTITY();
            result.code = input.code_menu_sub;
            result.details = await IAcctionRepository.Action_Permission_Search(new SYS_ActionsOnTable_Permission_Detail_ENTITY
            {
                tbName = input.tbName,
                userID = input.userID,
                language_id = AuthenticateController.appSessionUser.language_id,
                code_menu_sub = input.code_menu_sub
            });
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Acction_Delete_ListID(string[] input)
        {
            var result = await IAcctionRepository.Acction_Delete_ListID(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Acction_Update([FromBody] List<SYS_ActionsOnTable_ENTITY> input)
        {
            var result = await IAcctionRepository.Acction_Update(input);
            return result;
        } 
        [HttpPost]
        public async Task<IDictionary<string, object>> Action_Permission_Update([FromBody] SYS_ActionsOnTable_Permission_ENTITY input)
        {
            input.xml = input.details.ToXmlFromList();
            var result = await IAcctionRepository.Action_Permission_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Acction_Update_v2([FromBody]ActionOnTableModel input)
        {
            var result = await IAcctionRepository.Acction_Update_v2(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Acction_Autorenew([FromBody]SYS_ActionsOnTable_ENTITY input)
        {
            var result = await IAcctionRepository.Acction_Autorenew(input);
            return result;
        }
    }
}
