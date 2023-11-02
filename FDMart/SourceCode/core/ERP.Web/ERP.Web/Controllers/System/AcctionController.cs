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
