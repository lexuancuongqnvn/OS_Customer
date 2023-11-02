using ERP.Common.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WMS.Intfs.Report;
using WMS.Intfs.Report.Dto;

namespace ERP.Web.Controllers.WMS
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class WMSReportController : ControllerBase
    {
        private readonly IWMSReportService IWMSReportService;
        public WMSReportController(IWMSReportService iWMSReportService)
        {
            this.IWMSReportService = iWMSReportService;
        }
        [HttpPost]
        public async Task<List<WMS_Report_Inventory_Movement_ENTITY>> WMS_Report_Inventory_Movement([FromBody] WMS_Report_Inventory_Movement_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Movement(input);
        }
        [HttpPost]
        public async Task<List<WMS_Report_Inventory_ENTITY>> WMS_Report_Inventory([FromBody] WMS_Report_Inventory_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory(input);
        }
        [HttpPost]//Tạo bút toán
        public async Task<List<WMS_Prepaid_Expense_Allocation_ENTITY>> WMS_Prepaid_Expense_Allocation([FromBody] WMS_Prepaid_Expense_Allocation_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Prepaid_Expense_Allocation(input);
        }
        [HttpPost]//Xóa bút toán
        public async Task<IDictionary<string, object>> WMS_Prepaid_Expense_Allocation_Delete([FromBody] WMS_Prepaid_Expense_Allocation_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Prepaid_Expense_Allocation_Delete(input);
        }
        [HttpPost]//Báo cáo phiếu xuất công cụ dụng dụ lao động
        public async Task<List<WMS_Report_I45_ENTITY>> WMS_Report_I45_Search([FromBody] WMS_Report_I45_ENTITY input)
        {
            var result = await this.IWMSReportService.WMS_Report_I45_Search(input);
            return result;
        }
        [HttpPost]//Báo cáo phiếu điều chuyển
        public async Task<List<WMS_Report_I44_ENTITY>> WMS_Report_I44_Search([FromBody] WMS_Report_I44_ENTITY input)
        {
            var result = await this.IWMSReportService.WMS_Report_I44_Search(input);
            return result;
        }
        [HttpPost]//Báo cáo phiếu xuất kho
        public async Task<List<WMS_Report_I43_ENTITY>> WMS_Report_I43_Search([FromBody] WMS_Report_I43_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_I43_Search(input);
        }
        [HttpPost]//Báo cáo phiếu nhập kho
        public async Task<List<WMS_Report_I42_ENTITY>> WMS_Report_I42_Search([FromBody] WMS_Report_I42_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_I42_Search(input);
        }   
        [HttpPost]//Báo cáo phiếu nhập thành phẩm
        public async Task<List<WMS_Report_I41_ENTITY>> WMS_Report_I41_Search([FromBody] WMS_Report_I41_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_I41_Search(input);
        }
        [HttpPost]//Báo cáo chi tiết phân phổ công cụ dụng cụ
        public async Task<List<WMS_Report_Allocation_ENTITY>> WMS_Report_Allocation_Search([FromBody] WMS_Report_Allocation_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Allocation_Search(input);
        }
        [HttpPost]//Báo cáo hàng nhập kho
        public async Task<List<WMS_Report_Goods_Import_ENTITY>> WMS_Report_Goods_Import_Search([FromBody] WMS_Report_Goods_Import_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Goods_Import_Search(input);
        } 
        [HttpPost]//Báo cáo thẻ kho vật tư
        public async Task<List<WMS_Report_Inventory_Material_Ledger_ENTITY>> WMS_Report_Inventory_Material_Ledger_Search([FromBody] WMS_Report_Inventory_Material_Ledger_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Material_Ledger_Search(input);
        }   
        [HttpPost]//Sổ chi tiết vật tư
        public async Task<List<WMS_Report_Inventory_Book_Detail_ENTITY>> WMS_Report_Inventory_Book_Detail_Search([FromBody] WMS_Report_Inventory_Book_Detail_ENTITY input)
        {
            var result = await this.IWMSReportService.WMS_Report_Inventory_Book_Detail_Search(input);
            return result;
        } 
        [HttpPost]//báo cáo hàng tồn theo kho
        public async Task<List<WMS_Report_Inventory_By_Warehouse_ENTITY>> WMS_Report_Inventory_By_Warehouse_Search([FromBody] WMS_Report_Inventory_By_Warehouse_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_By_Warehouse_Search(input);
        } 
        [HttpPost]//báo cáo nhập xuất tồn
        public async Task<List<WMS_Report_Inventory_Import_Export_ENTITY>> WMS_Report_Inventory_Import_Export_Search([FromBody] WMS_Report_Inventory_Import_Export_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Import_Export_Search(input);
        }
        [HttpPost]//Báo cáo tổng hợp hàng nhập kho
        public async Task<List<WMS_Report_Inventory_Incoming_Summary_ENTITY>> WMS_Report_Inventory_Incoming_Summary_Search([FromBody] WMS_Report_Inventory_Incoming_Summary_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Incoming_Summary_Search(input);
        } 
        [HttpPost]//Báo cáo tổng hợp hàng xuất kho
        public async Task<List<WMS_Report_Inventory_Issued_Summary_ENTITY>> WMS_Report_Inventory_Issued_Summary_Search([FromBody] WMS_Report_Inventory_Issued_Summary_ENTITY input)
        {
            return await this.IWMSReportService.WMS_Report_Inventory_Issued_Summary_Search(input);
        }
    }
}
