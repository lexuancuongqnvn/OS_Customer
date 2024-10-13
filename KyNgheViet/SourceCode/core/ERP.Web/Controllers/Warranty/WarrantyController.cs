using Common.Utils;
using ERP.Common.Controllers;
using ERP.Common.Intfs.ERP;
using ERP.Common.Intfs.ERP.Dto;
using ERP.Warranty.Intfs.Laptop;
using ERP.Warranty.Intfs.Laptop.Dto;
using HRMS.Intfs.Employee;
using HRMS.Intfs.Employee.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using WMS.Intfs.Voucher;
using WMS.Intfs.Voucher.Dto;

namespace ERP.Web.Controllers.Warranty
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WarrantyController : ControllerBase
    {
        private readonly IWarrantyService warrantyService;
        private readonly IWMSVouchercService WMSVouchercService;
        private readonly IEmployeeService employeeService;
        private readonly IERPCommonService iERPCommonService;

        public WarrantyController(IWarrantyService warrantyService, IWMSVouchercService wMSVouchercService, IEmployeeService employeeService, IERPCommonService eRPCommonService)
        {
            this.warrantyService = warrantyService;
            this.WMSVouchercService = wMSVouchercService;
            this.employeeService = employeeService;
            this.iERPCommonService = eRPCommonService;
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
            //if(input.is_import_goods == true)
            //{
            //    string codeLogin = AuthenticateController.appSessionUser.code;
            //    var customer = await employeeService.HRM_Employee_Search(new HRM_Employee_ENTITY { code = codeLogin });
                
            //    I42_M_ENTITY i42_M = new I42_M_ENTITY();
            //    if (customer != null && customer.Count > 0){
            //        i42_M.customer_code = customer[0].employee_code;
            //        i42_M.address = customer[0].address_detail;
            //        i42_M.customer_name = customer[0].firstName + " " + customer[0].lastName;
            //    }
            //    i42_M.account_code_add = codeLogin;
            //    i42_M.company_code = AuthenticateController.appSessionUser.company_code;
            //    i42_M.voucher_code = "PNH";
            //    i42_M.voucher_date = input.doc_date;
            //    i42_M.voucher_no = input.voucher_no;

            //    i42_M.profession_code = "TMVT";
            //    i42_M.notes = "Nhập kho vật tư thừa từ sản xuất";
            //    i42_M.exchange_rate = 1;
            //    i42_M.is_direct_import_and_export = true;
            //    if (result.TryGetValue("code_fc", out object code_fc)) i42_M.code_fc = code_fc.ToString();

            //    i42_M.i42_D = new List<I42_D_ENTITY>();
            //    var i42_D = new I42_D_ENTITY();

            //    i42_D.goods_name = input.goods_name;
            //    i42_D.code = "NEW-"+ i42_D.goods_code;
            //    if(result.TryGetValue("unit_code", out object unit_code))i42_D.unit_code = unit_code.ToString();
            //    i42_D.warehouse_code = input.warehouse_code;
            //    i42_D.quantity = 1;
            //    i42_D.price_fc = 0;
            //    i42_D.price = 0;
            //    i42_D.arise_fc = 0;
            //    i42_D.arise = 0;
            //    i42_D.conversion_factor = 0;
            //    i42_D.conversion_quantity = 0;
            //    i42_D.conversion_price = 0;
            //    if (result.TryGetValue("ref_code", out object ref_code)) i42_D.goods_code = ref_code.ToString();
            //    if (result.TryGetValue("creditor_account", out object creditor_account)) i42_D.creditor_account = creditor_account.ToString();
            //    if (result.TryGetValue("debitor_account", out object debitor_account)) i42_D.debitor_account = debitor_account.ToString();
            //    i42_D.goods_name = input.goods_name;

            //    i42_M.i42_D.Add(i42_D);
            //    i42_M.xml_42d = i42_M.i42_D.ToXmlFromList2();
            //    var result_import = await this.WMSVouchercService.I42_M_Insert(i42_M);
            //}
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
            if (input.is_import_goods == true && input.move_warehouse_from != input.move_warehouse_to)
            {
                string codeLogin = AuthenticateController.appSessionUser.code;
                var customer = await employeeService.HRM_Employee_Search(new HRM_Employee_ENTITY { code = input.move_to_account });
                string company_code = AuthenticateController.appSessionUser.company_code;
                string voucher_code = "PDC";
                DateTime voucher_date = DateTime.Now;
                var getVoucherNo = await this.iERPCommonService.ERP_Common_Generate_Voucher_No(new ERPCommon_ENTITY { company_code = company_code , voucher_code = voucher_code, voucher_date = voucher_date });
                var check = await this.iERPCommonService.ERP_Common_Check_Voucher_Save(new ERPCommon_ENTITY
                { voucher_code = voucher_code, voucher_date =voucher_date,  voucher_year = AuthenticateController.appSessionUser.voucher_year, language_id = AuthenticateController.appSessionUser.language_id });
                if (check["status"].ToString() != "0") return check;

                I44_M_ENTITY i44_M = new I44_M_ENTITY();
                if (customer != null && customer.Count > 0)
                {
                    i44_M.customer_code = customer[0].employee_code;
                    i44_M.address = customer[0].address_detail;
                    i44_M.customer_name = customer[0].firstName + " " + customer[0].lastName;
                }
                i44_M.account_code_add = codeLogin;
                i44_M.company_code = company_code;
                i44_M.voucher_code = voucher_code;
                i44_M.voucher_date = voucher_date;
                if (getVoucherNo.TryGetValue("result", out object voucher_no)) i44_M.voucher_no = voucher_no.ToString();

                i44_M.profession_code = "CK";
                i44_M.notes = "chuyển kho (tạo tự động từ quản lý công việc)";
                i44_M.exchange_rate = 1;
                i44_M.total_money_fc = 0;
                i44_M.total_money = 0;
                i44_M.numerical_order = 0;
                i44_M.warehouse_out_code = input.move_warehouse_from;
                i44_M.warehouse_in_code = input.move_warehouse_to;
                if (result.TryGetValue("code_fc", out object code_fc)) i44_M.code_fc = code_fc.ToString();

                i44_M.i44_D = new List<I44_D_ENTITY>();
                var i44_D = new I44_D_ENTITY();
                if (result.TryGetValue("ref_code", out object ref_code)) i44_D.goods_code = ref_code.ToString();
                if (result.TryGetValue("goods_name", out object goods_name)) i44_D.goods_name = goods_name.ToString();

                if (result.TryGetValue("unit_code", out object unit_code)) i44_D.unit_code = unit_code.ToString();
                i44_D.quantity = 1;
                i44_D.price_fc = 0;
                i44_D.price = 0;
                i44_D.arise_fc = 0;
                i44_D.arise = 0;
                i44_D.conversion_factor = 0;
                i44_D.conversion_quantity = 0;
                i44_D.conversion_price = 0;
                if (result.TryGetValue("serial", out object serial)) i44_D.serial_no = serial.ToString();
                if (result.TryGetValue("creditor_account", out object creditor_account)) i44_D.creditor_account = creditor_account.ToString();
                if (result.TryGetValue("debitor_account", out object debitor_account)) i44_D.debitor_account = debitor_account.ToString();
                i44_D.goods_name = input.goods_name;

                i44_M.i44_D.Add(i44_D);
                i44_M.xml_44d = i44_M.i44_D.ToXmlFromList2();
                var result_move = await this.WMSVouchercService.I44_M_Insert(i44_M);
            }
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
