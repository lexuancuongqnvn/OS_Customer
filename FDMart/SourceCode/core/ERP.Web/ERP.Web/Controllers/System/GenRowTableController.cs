using Abp.Application.Services.Dto;
using ERP.Common.Filters;
using ERP.System.Intfs.GenRowTable;
using ERP.System.Intfs.GenRowTable.Dto;
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
    //[EnableCors("AllowAllHeaders")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class GenRowTableController : ControllerBase
    {
        private readonly IGenRowTableService IGenRowTableService;

        public GenRowTableController(IGenRowTableService iGenRowTableService)
        {
            this.IGenRowTableService = iGenRowTableService;
        }
        [HttpPost]
        public async Task<List<SYS_GenRowTable>> SYS_GenRowTable_Data_Search([FromBody] SYS_GenRowTable input)
        {
            List<SYS_GenRowTable> result = await IGenRowTableService.SYS_GenRowTable_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_GenRowTable>> SYS_GenRowTable_Search([FromBody] SYS_GenRowTable input)
        {
            string[] ListTableSub = new string[30];int inList = 0;
            List<SYS_GenRowTable> result = await IGenRowTableService.SYS_GenRowTable_Search(input);
            SYS_GenRowTable_Detail _input = new SYS_GenRowTable_Detail();
            if(input.SYS_GenRowTable_Detail != null)
            {
                if(input.SYS_GenRowTable_Detail.Count > 0)
                {
                    _input = input.SYS_GenRowTable_Detail[0];
                }
            }
            _input.FATHER = result[0].CODE;
            _input.userID = result[0].userID;
            _input.TABLE_NAME = result[0].TABLE_NAME;
            _input.FORM = input.FORM;
            List<SYS_GenRowTable_Detail> _result = await IGenRowTableService.SYS_GenRowTable_Detail_Search(_input);
            result[0].SYS_GenRowTable_Detail = _result;
            foreach (SYS_GenRowTable_Detail _items in _result)
            {
                if (_items.TYPE_ID == 16)//type multirow
                {
                    ListTableSub[inList] = _items.REFERENCE;
                    inList++;
                }
            }
            //for (int i = 0; i < ListTableSub.Length; i++)
            //{
            //    if(ListTableSub[i] != null)
            //    {
            //        input.TABLE_NAME = ListTableSub[i];
            //        List<SYS_GenRowTable> results = await IGenRowTableService.SYS_GenRowTable_Search(input);
            //        _input = new SYS_GenRowTable_Detail();
            //        _input.FATHER = results[0].CODE;
            //        _input.userID = input.userID;
            //        _input.TABLE_NAME = input.TABLE_NAME;
            //        List<SYS_GenRowTable_Detail> _results = await IGenRowTableService.SYS_GenRowTable_Detail_Search(_input);
            //        results[0].SYS_GenRowTable_Detail = _results;
            //        result.Add(results[0]);
            //    }
            //}
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_GenRowTable>> SYS_GenRowTable_v2_Search([FromBody] SYS_GenRowTable input)
        {
            List<SYS_GenRowTable> result = await IGenRowTableService.SYS_GenRowTable_Search(input);
            SYS_GenRowTable_Detail _input = new SYS_GenRowTable_Detail();

            _input.FATHER = result[0].CODE;
            _input.userID = result[0].userID;
            List<SYS_GenRowTable_Detail> _result = await IGenRowTableService.SYS_GenRowTable_Detail_V2_Search(_input);
            result[0].SYS_GenRowTable_Detail = _result;
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_GenRowTable_Detail>> SYS_GenRowTable_Detail_Search([FromBody] SYS_GenRowTable_Detail input)
        {
            var result = await IGenRowTableService.SYS_GenRowTable_Detail_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_GenRowTable>> SYS_GenRowTable_Root_Search([FromBody] SYS_GenRowTable input)
        {
            string[] ListTableSub = new string[30]; int inList = 0;
            List<SYS_GenRowTable> result = await IGenRowTableService.SYS_GenRowTable_Root_Search(input);
            SYS_GenRowTable_Detail _input = new SYS_GenRowTable_Detail();
            _input.FATHER = result[0].CODE;
            _input.userID = input.userID;
            _input.TABLE_NAME = input.TABLE_NAME;
            List<SYS_GenRowTable_Detail> _result = await IGenRowTableService.SYS_GenRowTable_Detail_Root_Search(_input);
            result[0].SYS_GenRowTable_Detail = _result;
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_GenRowTable_Detail>> SYS_GenRowTable_Detail_Root_Search([FromBody] SYS_GenRowTable_Detail input)
        {
            var result = await IGenRowTableService.SYS_GenRowTable_Detail_Root_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_GenRowTable>> SYS_GenRowTable_Opption_Search()
        {
            var result = await IGenRowTableService.SYS_GenRowTable_Opption_Search();
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_GenRowTable_Delete_ListID(string[] listId)
        {
            var result = await IGenRowTableService.SYS_GenRowTable_Delete_ListID(listId);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_GenRowTable_Update([FromBody]List<SYS_GenRowTable> input)
        {
            var result = await IGenRowTableService.SYS_GenRowTable_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_GenRowTable_Update_Detail([FromBody] SYS_GenRowTable input)
        {
            var result = await IGenRowTableService.SYS_GenRowTable_Update_Detail(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_GenRowTable_Opption_ENTITY>> SYS_GenRowTable_Opption_V2_Search([FromBody] SYS_GenRowTable_Opption_ENTITY input)
        {
            var result = await IGenRowTableService.SYS_GenRowTable_Opption_V2_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_GenRowTable_Opption_Action_By_Type([FromBody] SYS_GenRowTable_Opption_ENTITY input)
        {
            var result = await IGenRowTableService.SYS_GenRowTable_Opption_Action_By_Type(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_GenRowTable_Insert([FromBody] SYS_GenRowTable input)
        {
            var result = await IGenRowTableService.SYS_GenRowTable_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_Column_Info_ENTITY>> SYS_Column_Info_Search([FromBody] SYS_Column_Info_ENTITY input)
        {
            var result = await IGenRowTableService.SYS_Column_Info_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Column_Info_Action_By_Type([FromBody] SYS_Column_Info_ENTITY input)
        {
            var result = await IGenRowTableService.SYS_Column_Info_Action_By_Type(input);
            return result;
        }
    }
}
