using ERP.Common.Controllers;
using ERP.Warranty.Intfs.Laptop;
using ERP.Warranty.Intfs.Laptop.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Warranty
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WarrantyController : ControllerBase
    {
        private readonly IWarrantyService warrantyService;

        public WarrantyController(IWarrantyService warrantyService)
        {
            this.warrantyService = warrantyService;
        }
        [HttpPost]
        public async Task<List<Warranty_Laptop_ENTITY>> Warranty_Laptop_History_Search([FromBody] Warranty_Laptop_ENTITY input)
        {
            var result = await warrantyService.Warranty_Laptop_History_Search(input);
            return result;
        }

        [HttpPost]
        public async Task<IDictionary<string, object>> Warranty_Laptop_Inserst([FromBody]Warranty_Laptop_ENTITY input)
        {
            var result = await warrantyService.Warranty_Laptop_Inserst(input);
            return result;
        }
        [HttpPost]
        public async Task<List<Warranty_Laptop_ENTITY>> Warranty_Laptop_Search([FromBody] Warranty_Laptop_ENTITY input)
        {
            var result = await warrantyService.Warranty_Laptop_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Warranty_Laptop_Update([FromBody] Warranty_Laptop_ENTITY input)
        {
            var result = await warrantyService.Warranty_Laptop_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Warranty_Report_Laptop_Search([FromBody] Warranty_Laptop_ENTITY input)
        {
            Dictionary<string, object> result = new Dictionary<string, object>();
            var data = await warrantyService.Warranty_Laptop_Search(input);
            DataTable dt = ManagementController.ConvertToDataTable(data);
            WarrantyReportController.WarrantyReport(input, dt, ref result);

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> Warranty_Laptop_PrintDocWarranty([FromBody] Warranty_Laptop_ENTITY input)
        {
            string link_file = "";
            int status = 1;
            string message = "";
            string warranty_type = "";
            WarrantyReportController.PrintDocumentWarranty(input.code, input.branch_code, ref link_file,ref status,ref message,ref warranty_type);
            if(status == 0)
            {
                string qr = @"
                INSERT INTO [dbo].[Warranty_Laptop_Print_History]
                       ([doc_code]
                       ,[datetime_print]
                       ,[account_print]
                       ,[banch_print]
                       ,[link_file_print]
                       ,[warranty_type])
                 VALUES
                       ('" + input.code + @"'
                       ,GETDATE()
                       ,'" + input.employee_code + @"'
                       ,'" + input.branch_code + @"'
                       ,N'" + link_file + @"'
                       ,'" + warranty_type + @"')
            ";
                ManagementController.ExecuteNonQuery(ConnectController.GetConnectStringByKey("HRM"), qr);
            }
            Dictionary<string, object> result = new Dictionary<string, object>();
            result.Add("stats", status);
            result.Add("link_file", link_file);
            result.Add("message", message);
            return result;
        }
        [HttpPost]
        public async Task<List<Warranty_Laptop_Print_History_ENTITY>> Warranty_Laptop_Print_History_Search([FromBody] Warranty_Laptop_Print_History_ENTITY input)
        {
            var result = await warrantyService.Warranty_Laptop_Print_History_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<Warranty_Laptop_Log_Update_ENTITY>> Warranty_Laptop_Log_Update_Search([FromBody] Warranty_Laptop_Log_Update_ENTITY input)
        {
            var result = await warrantyService.Warranty_Laptop_Log_Update_Search(input);
            return result;
        }
    }
}
