using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Web.Shared.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using System;
using ERP.System.Intfs.Export.Dto;
using ERP.System.Intfs.Export;
using ERP.System.Intfs.Common;
using ERP.System.Intfs.Common.Dto;
using HRMS.Intfs.Employee;
using HRMS.Intfs.Employee.Dto;
using ERP.Web.Controllers.Upload;
using Common.Utils;
using HRMS.Intfs.Branch;
using HRMS.Intfs.Branch.Dto;

namespace ERP.Web.Controllers.Export.Excel
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class ExportAPIController : ControllerBase
    {
        private readonly IExportService IExportService;
        private readonly ISYSCommonService ICommonService;
        private readonly IEmployeeService IEmployeeService;
        private readonly IHRM_BranchService HRM_BranchService;

        public ExportAPIController(IExportService iExportService, ISYSCommonService iCommonService, IEmployeeService employeeService, IHRM_BranchService hRM_BranchService)
        {
            this.IExportService = iExportService;
            this.ICommonService = iCommonService;
            this.IEmployeeService = employeeService;
            this.HRM_BranchService = hRM_BranchService;
        }
        [HttpPost]
        public async Task<string> API_Data_Export_By_StoredProceduces([FromBody] ExportModdel input)
        {
            List<Tuple<string, string>> tuples = new List<Tuple<string, string>>();
            Tuple<string, string> filter = new Tuple<string, string>("p_filter", input.filter);
            Tuple<string, string> type = new Tuple<string, string>("p_type", input.type);
            tuples.Add(filter);
            tuples.Add(type);
            DataTable dt = ManagementController.GetListTable(ConnectController.GetConnectStringByKey(input.key_connect),input.stored, tuples).Tables[0]; 
            var result = await Task.Run(() => ManagementController.DataTableToJSONWithStringBuilder(dt).ToString());
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Report_Infomation_Delete([FromBody] SYS_Report_Infomation_ENTITY input)
        {
            var result = await this.IExportService.SYS_Report_Infomation_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Report_Infomation_Insert([FromBody] SYS_Report_Infomation_ENTITY input)
        {
            input.xml_detail = input.sYS_Report_Infomation_Details.ToXmlFromList2();
            var result = await this.IExportService.SYS_Report_Infomation_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_Report_Infomation_ENTITY>> SYS_Report_Infomation_Search([FromBody]SYS_Report_Infomation_ENTITY input)
        {
            var result = await this.IExportService.SYS_Report_Infomation_Search(input);
            if(result != null && result.Count > 0 && !string.IsNullOrEmpty(input.table_name) && !string.IsNullOrEmpty(result[0].company_code))
            {
                result[0].hRM_Branchs = await this.HRM_BranchService.HRM_Branch_Search(new HRM_Branch_ENTITY { company_code = result[0].company_code });
                var pr1 = new SYS_Report_Infomation_Detail_ENTITY();
                pr1.master_code = result[0].code;
                result[0].sYS_Report_Infomation_Details = await this.IExportService.SYS_Report_Infomation_Detail_Search(pr1);
                if (result[0].sYS_Report_Infomation_Details != null && result[0].sYS_Report_Infomation_Details.Count > 0)
                {
                    var pr2 = new SYS_Report_Infomation_Detail_Signature_ENTITY();
                    pr2.sys_report_infomation_detail_code = result[0].sYS_Report_Infomation_Details[0].code;
                    result[0].sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures = await this.IExportService.SYS_Report_Infomation_Detail_Signature_Search(pr2);
                    if (result[0].sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures != null && result[0].sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures.Count > 0)
                    {
                        string lstCode = "";
                        foreach(var sign in result[0].sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures)
                        {
                            if (!string.IsNullOrEmpty(lstCode)) lstCode += ";";
                            lstCode += sign.employee_code;
                        }
                        var pr3 = new HRM_Employee_ENTITY();
                        pr3.code = lstCode;
                        pr3.type = "ALL";
                        pr3.user_login = AuthenticateController.appSessionUser.code;
                        var lisEmployee = await this.IEmployeeService.HRM_Employee_Search(pr3);
                        if (lisEmployee != null)
                            foreach (var sign in result[0].sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures)
                            {
                                string empCode = sign.employee_code;
                                var employeeInfo = lisEmployee.Find(e => e.code == empCode);
                                sign.employee_info = new SYS_Report_Infomation_Detail_Signature_Employee_ENTITY();
                                sign.employee_info.role_name = employeeInfo.title_name;
                                //sign.employee_info.sub_role_name = "";
                                if(!string.IsNullOrEmpty(employeeInfo.signature))
                                    sign.employee_info.default_sign = FileManagerController.GetImageTypeBase64OnHosting(employeeInfo.signature);
                                sign.show_date_sign = DateTime.Now.ToString("dd/MM/yyyy");
                                sign.employee_info.sign_fullname = employeeInfo.fullName;
                            }
                    }
                }
            }  else if (!string.IsNullOrEmpty(input.code))
            {
                result[0].hRM_Branchs = await this.HRM_BranchService.HRM_Branch_Search(new HRM_Branch_ENTITY { company_code = result[0].company_code });

                var pr1 = new SYS_Report_Infomation_Detail_ENTITY();
                pr1.master_code = result[0].code;
                result[0].sYS_Report_Infomation_Details = await this.IExportService.SYS_Report_Infomation_Detail_Search(pr1);
            }
            return result;
        }
        
        [HttpPost]
        public async Task<IDictionary<string, object>> SYS_Report_Infomation_Update([FromBody] SYS_Report_Infomation_ENTITY input)
        {
            input.xml_detail = input.sYS_Report_Infomation_Details.ToXmlFromList2();
            input.xml_sign = input.sYS_Report_Infomation_Details[0].sYS_Report_Infomation_Detail_Signatures.ToXmlFromList2();
            var result = await this.IExportService.SYS_Report_Infomation_Update(input);
            return result;
        }

        [HttpPost]
        public async Task<List<SYS_Report_Infomation_Version_ENTITY>> SYS_Report_Infomation_Version_Search([FromBody] SYS_Report_Infomation_Version_ENTITY input)
        {
            var result = await this.IExportService.SYS_Report_Infomation_Version_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_Report_Infomation_Detail_Signature_ENTITY>> SYS_Report_Infomation_Detail_Signature_Search([FromBody] SYS_Report_Infomation_Detail_Signature_ENTITY input)
        {
            var result = await this.IExportService.SYS_Report_Infomation_Detail_Signature_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<SYS_Report_Infomation_Detail_ENTITY>> SYS_Report_Infomation_Detail_Search([FromBody] SYS_Report_Infomation_Detail_ENTITY input)
        {
            var result = await this.IExportService.SYS_Report_Infomation_Detail_Search(input);
            return result;
        }
   
    }
}
