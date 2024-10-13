using Common.Utils;
using DocumentFormat.OpenXml.Bibliography;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.System.Intfs.Department;
using ERP.System.Intfs.Department.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.System
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService Department;

        public DepartmentController(IDepartmentService Department)
        {
            this.Department = Department;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Department_Actions([FromBody]Department_ENTITY input)
        {
            input.xml = input.department_Positions.ToXmlFromList();
            var result = await this.Department.Department_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Department_Position_Insert([FromBody]Department_Position_ENTITY input)
        {
            input.type = "INSERT";
            var result = await this.Department.Department_Position_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Department_Position_Update([FromBody] Department_Position_ENTITY input)
        {
            input.type = "UPDATE";
            var result = await this.Department.Department_Position_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Department_Position_Delete([FromBody] Department_Position_ENTITY input)
        {
            input.type = "DELETE";
            var result = await this.Department.Department_Position_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<List<Department_Position_ENTITY>> Department_Position_Search([FromBody] Department_Position_ENTITY input)
        {
            input.type = "SEARCH";
            var result = await this.Department.Department_Position_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<Department_Title_ENTITY>> Department_Title_Search([FromBody] Department_Title_ENTITY input)
        {
            var result = await this.Department.Department_Title_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<Department_ENTITY>> Department_Search([FromBody] Department_ENTITY input)
        {
            var result = await this.Department.Department_Search(input);
            if(result != null)
            {
                try
                {
                    List<Department_Position_ENTITY> resultList = new List<Department_Position_ENTITY>();
                    Department_Position_ENTITY p = new Department_Position_ENTITY();
                    p.type = "SEARCH";
                    resultList = await this.Department.Department_Position_Search(p);
                    foreach (Department_ENTITY item in result)
                    {
                        foreach (Department_Position_ENTITY items in resultList)
                        {
                            if (item.department_Positions == null) item.department_Positions = new List<Department_Position_ENTITY>();
                            if (item.code == items.department_code)
                            {
                                //if (item.department_Positions == null) item.department_Positions = new List<Department_Position_ENTITY>();
                                item.department_Positions.Add(items);
                            }
                        }
                    }
                }
                catch{ }    
            }

            return result;
        }
    }
}
