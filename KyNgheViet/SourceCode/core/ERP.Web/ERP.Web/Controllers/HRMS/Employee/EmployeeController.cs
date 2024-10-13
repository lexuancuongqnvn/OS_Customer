
using Common.Utils;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Common.Models.Report;
using ERP.Web.Controllers.Upload;
using ERP.Web.Models;
using HRMS.Intfs.Branch;
using HRMS.Intfs.Branch.Dto;
using HRMS.Intfs.Employee;
using HRMS.Intfs.Employee.Dto;
using HRMS.Intfs.TimeSheet.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Reporting.NETCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.IO.Compression;
using System.Net.Http;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.HRMS.Employee
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService employeeService;
        private readonly IHRM_BranchService HRM_BranchService;
        public EmployeeController(IEmployeeService employeeService, IHRM_BranchService HRM_BranchService)
        {
            this.employeeService = employeeService;
            this.HRM_BranchService = HRM_BranchService;
        }
        [HttpPost]
        public async Task<List<Employee_Positions_ENTITY>> Employee_Positions_Search([FromBody] Employee_Positions_ENTITY input)
        {
            var result = await employeeService.Employee_Positions_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Employee_ENTITY>> HRM_Employee_Search([FromBody] HRM_Employee_ENTITY input)
        {
            var result = await employeeService.HRM_Employee_Search(input);
            try
            {
                if(input.type == "Edit" || input.type == "ViewDetail")
                {
                    try
                    {
                        result[0].avarta_base64 = "data:image/jpeg;base64,"+ FileManagerController.GetImageBase64(FileManagerController.AppDirectory + "\\FaceAI\\EmployeeFace\\" + input.code + ".jpg");
                        result[0].avarta_base64_256x256 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + "\\FaceAI\\EmployeeFace\\256x256\\" + input.code + ".jpg");
                    }
                    catch { }
                    HRM_Employee_Academic_Level_ENTITY hRM_Employee_Academic_Level_ENTITY = new HRM_Employee_Academic_Level_ENTITY();
                    hRM_Employee_Academic_Level_ENTITY.employee_code = input.code;
                    result[0].hRM_Employee_Academic_Levels = await employeeService.HRM_Employee_Academic_Level_Search(hRM_Employee_Academic_Level_ENTITY);

                    HRM_Employee_Certificate_ENTITY hRM_Employee_Certificate_ENTITY = new HRM_Employee_Certificate_ENTITY();
                    hRM_Employee_Certificate_ENTITY.employee_code = input.code;
                    result[0].hRM_Employee_Certificates = await employeeService.HRM_Employee_Certificate_Search(hRM_Employee_Certificate_ENTITY);
                }   
                else if (input.type == "base64")
                {
                    result[0].avarta_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + "\\FaceAI\\EmployeeFace\\" + input.code + ".jpg");
                    result[0].avarta_base64_256x256 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + "\\FaceAI\\EmployeeFace\\256x256\\" + input.code + ".jpg");
                }
            }
            catch { }
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Employee_Marital_Status_ENTITY>> HRM_Employee_Marital_Status_Search([FromBody] HRM_Employee_Marital_Status_ENTITY input)
        {
            var result = await employeeService.HRM_Employee_Marital_Status_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_District_City_ENTITY>> HRM_District_City_Search([FromBody] HRM_District_City_ENTITY input)
        {
            var result = await employeeService.HRM_District_City_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Update([FromBody] HRM_Employee_ENTITY input)
        {
            input.xml_academic = input.hRM_Employee_Academic_Levels.ToXmlFromList();
            input.xml_certificates = input.hRM_Employee_Certificates.ToXmlFromList();
            var result = await employeeService.HRM_Employee_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<HRM_Employee_ENTITY> HRM_Employee_Insert([FromBody] HRM_Employee_ENTITY input)
        {
            FileInfo file = new FileInfo(FileManagerController.AppDirectory + "\\FaceAI\\EmployeeFace\\" + input.code + ".jpg");
            if (file.Exists)
            {
                try
                {
                    file.Delete();
                }
                catch (Exception ex) { }
            }
            input.xml_academic = input.hRM_Employee_Academic_Levels.ToXmlFromList();
            input.xml_certificates = input.hRM_Employee_Certificates.ToXmlFromList();
            var result = await employeeService.HRM_Employee_Insert(input);
            HRM_Employee_Academic_Level_ENTITY hRM_Employee_Academic_Level_ENTITY = new HRM_Employee_Academic_Level_ENTITY();
            hRM_Employee_Academic_Level_ENTITY.employee_code = input.code;
            result.hRM_Employee_Academic_Levels = await employeeService.HRM_Employee_Academic_Level_Search(hRM_Employee_Academic_Level_ENTITY);

            HRM_Employee_Certificate_ENTITY hRM_Employee_Certificate_ENTITY = new HRM_Employee_Certificate_ENTITY();
            hRM_Employee_Certificate_ENTITY.employee_code = input.code;
            result.hRM_Employee_Certificates = await employeeService.HRM_Employee_Certificate_Search(hRM_Employee_Certificate_ENTITY);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Delete(string code,string user_login)
        {
            var result = await employeeService.HRM_Employee_Delete(code, user_login);
            return result;
        }
        [HttpPost]
        public async Task<List<Part_ENTITY>> Part_Search([FromBody]Part_ENTITY input)
        {
            var result = await employeeService.Part_Search(input);
            return result;
        }
        
        [HttpPost]
        public async Task<List<HRM_Employee_Labour_Contract_Type_ENTITY>> HRM_Employee_Labour_Contract_Type_Search([FromBody] HRM_Employee_Labour_Contract_Type_ENTITY input)
        {
            var result = await employeeService.HRM_Employee_Labour_Contract_Type_Search(input);
            return result;
        }
        
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Delete(string code, string user_login)
        {
            var result = await employeeService.HRM_Employee_Labour_Contract_Delete(code, user_login);
            return result;
        }
        [HttpPost]
        public async Task<HRM_Employee_Labour_Contract_ENTITY> HRM_Employee_Labour_Contract_Insert([FromBody] HRM_Employee_Labour_Contract_ENTITY input)
        {
            input.xml_appendex = input.hRM_Employee_Labour_Contract_Appendixs.ToXmlFromList();
            input.xml_salary = input.hRM_Employee_Labour_Contract_Salarys.ToXmlFromList();
            input.xml_curriculum_vitae = input.hRM_Employee_Labour_Contract_Curriculum_Vitaes.ToXmlFromList();
            input.xml_salary_deduction = input.hRM_Employee_Labour_Contract_Salary_Deductions.ToXmlFromList();
            var result = await employeeService.HRM_Employee_Labour_Contract_Insert(input);
            HRM_Employee_Labour_Contract_Appendix_ENTITY pr = new HRM_Employee_Labour_Contract_Appendix_ENTITY();
            pr.contract_code = result.ref_code;
            HRM_Employee_Labour_Contract_Salary_ENTITY pr1 = new HRM_Employee_Labour_Contract_Salary_ENTITY();
            pr1.contract_code = result.ref_code;
            HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY pr2 = new HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY();
            pr2.contract_code = result.ref_code;
            HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY pr3 = new HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY();
            pr3.contract_code = result.ref_code;

            result.hRM_Employee_Labour_Contract_Appendixs = await employeeService.HRM_Employee_Labour_Contract_Appendix_Search(pr);
            result.hRM_Employee_Labour_Contract_Salarys = await employeeService.HRM_Employee_Labour_Contract_Salary_Search(pr1);
            result.hRM_Employee_Labour_Contract_Curriculum_Vitaes = await employeeService.HRM_Employee_Labour_Contract_Curriculum_Vitae_Search(pr2);
            result.hRM_Employee_Labour_Contract_Salary_Deductions = await employeeService.HRM_Employee_Labour_Contract_Salary_Deduction_Search(pr3);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Employee_Labour_Contract_Appendix_ENTITY>> HRM_Employee_Labour_Contract_Appendix_Search([FromBody] HRM_Employee_Labour_Contract_Appendix_ENTITY input)
        {
            var result = await employeeService.HRM_Employee_Labour_Contract_Appendix_Search(input);
            if(result!=null && !string.IsNullOrEmpty(input.code) && input.type == "MY_SALES")
            {
                HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY pr = new HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY();
                pr.appendix_target_code = input.code;
                result[0].hRM_Employee_Labour_Contract_Appendix_Target_Details = await employeeService.HRM_Employee_Labour_Contract_Appendix_Target_Detail_Search(pr);
            }else
            {
                HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY pr = new HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY();
                pr.type = "MULTI";
                foreach(var item in result)
                    pr.list_appendix_target_code += item.code+ ";";
                result[0].hRM_Employee_Labour_Contract_Appendix_Target_Details = await employeeService.HRM_Employee_Labour_Contract_Appendix_Target_Detail_Search(pr);
            }
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY>> HRM_Employee_Labour_Contract_Appendix_Target_Detail_Search([FromBody] HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY input)
        {
            input.type = "SALES_STATISTICS";
            var result = await employeeService.HRM_Employee_Labour_Contract_Appendix_Target_Detail_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<ReportModel> HRM_Employee_Labour_Contract_Appendix_Target_Detail_Export([FromBody] HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY input)
        {
            ReportModel result = new ReportModel();
            using var report = new LocalReport();
            string renderFormat = "Excel";
            string extention = "xls";
            input.type = "SALES_STATISTICS";
            decimal sum_sales = 0, sum_machine_value = 0, sum_machine_sale = 0, sum_machine_buy = 0, sum_profit = 0;
            int sum_asia = 0;
            List<HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY> list = await employeeService.HRM_Employee_Labour_Contract_Appendix_Target_Detail_Search(input);
            try
            {
                foreach (var item in list)
                {
                    if (item.sales != null)
                        sum_sales += (decimal)item.sales;
                    if (item.machine_value != null)
                        sum_machine_value += (decimal)item.machine_value;
                    if (item.machine_sale != null)
                        sum_machine_sale += (decimal)item.machine_sale;
                    if (item.machine_buy != null)
                        sum_machine_buy += (decimal)item.machine_buy;
                    if (item.profit != null)
                        sum_profit += (decimal)item.profit;
                    if (item.asia != null)
                        sum_asia += (int)item.asia;
                }
            }
            catch (Exception ex){
                string mgs = ex.Message;
            }
            var parameters = new[] {
                                new ReportParameter("sum_sales", string.Format("{0:#,##0}", sum_sales)),
                                new ReportParameter("sum_machine_value",  string.Format("{0:#,##0}", sum_machine_value)),
                                new ReportParameter("sum_machine_sale",  string.Format("{0:#,##0}", sum_machine_sale)),
                                new ReportParameter("sum_machine_buy", string.Format("{0:#,##0}", sum_machine_buy)),
                                new ReportParameter("sum_profit",  string.Format("{0:#,##0}", sum_profit)),
                                new ReportParameter("sum_asia", sum_asia.ToString())
                            };
            report.ReportPath = $"{FileManagerController.AppDirectory}\\Reports\\POS\\Sale\\DanhSachMayTheoThang.rdlc";
            report.SetParameters(parameters);
            DataTable dt = ManagementController.ConvertToDataTable(list);
            report.DataSources.Add(new ReportDataSource("HRM_Employee_Labour_Contract_Appendix_Target_Detail", dt));
            var excel = report.Render(renderFormat);
            string path = $"{FileManagerController.AppDirectory}\\Reports\\HRM\\Employees\\{DateTime.Now.ToString("dd-MM-yyyy")}\\";
            string fileName = $"Danh sách máy trong tháng." + extention;
            FileManagerController.SaveFile(excel, path, fileName);
            result.path_files = path.Replace(FileManagerController.AppDirectory,"").Replace("\\","/") + fileName.Replace("\\", "/");
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Appendix_Target_Detail_Insert([FromBody] HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY input)
        {
            var result = await employeeService.HRM_Employee_Labour_Contract_Appendix_Target_Detail_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY>> HRM_Employee_Labour_Contract_Salary_Deduction_Search([FromBody] HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY input)
        {
            var result = await employeeService.HRM_Employee_Labour_Contract_Salary_Deduction_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Appendix_Target_Update([FromBody] HRM_Employee_Labour_Contract_Appendix_ENTITY input)
        {
            input.xml_appendex_detail = input.hRM_Employee_Labour_Contract_Appendix_Target_Details.ToXmlFromList();
            var result = await employeeService.HRM_Employee_Labour_Contract_Appendix_Target_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Employee_Labour_Contract_ENTITY>> HRM_Employee_Labour_Contract_Search([FromBody] HRM_Employee_Labour_Contract_ENTITY input)
        {
            var result = await employeeService.HRM_Employee_Labour_Contract_Search(input);
            try
            {
                if (!string.IsNullOrEmpty(input.form) &&( input.form.ToUpper() == "EDIT" || input.form.ToUpper() == "VIEWDETAIL"))
                {
                    HRM_Employee_Labour_Contract_Appendix_ENTITY pr = new HRM_Employee_Labour_Contract_Appendix_ENTITY();
                    pr.contract_code = input.code;
                    HRM_Employee_Labour_Contract_Salary_ENTITY pr1 = new HRM_Employee_Labour_Contract_Salary_ENTITY();
                    pr1.contract_code = input.code;
                    HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY pr2 = new HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY();
                    pr2.contract_code = input.code;
                    HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY pr3 = new HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY();
                    pr3.contract_code = input.code;

                    result[0].hRM_Employee_Labour_Contract_Appendixs = await employeeService.HRM_Employee_Labour_Contract_Appendix_Search(pr);
                    result[0].hRM_Employee_Labour_Contract_Salarys = await employeeService.HRM_Employee_Labour_Contract_Salary_Search(pr1);
                    result[0].hRM_Employee_Labour_Contract_Curriculum_Vitaes = await employeeService.HRM_Employee_Labour_Contract_Curriculum_Vitae_Search(pr2);
                    result[0].hRM_Employee_Labour_Contract_Salary_Deductions = await employeeService.HRM_Employee_Labour_Contract_Salary_Deduction_Search(pr3);
                }else if(input.form == "SaleLevel")
                {
                    HRM_Employee_Labour_Contract_Appendix_ENTITY pr = new HRM_Employee_Labour_Contract_Appendix_ENTITY();
                    pr.contract_code = input.code;
                    pr.type = "BY_SALE";

                    result[0].hRM_Employee_Labour_Contract_Appendixs = await employeeService.HRM_Employee_Labour_Contract_Appendix_Search(pr);
                    if(result[0].hRM_Employee_Labour_Contract_Appendixs != null && result[0].hRM_Employee_Labour_Contract_Appendixs.Count > 0)
                    {
                        HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY pr1 = new HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY();
                        pr1.contract_code = input.code;
                        result[0].HRM_Employee_Labour_Contract_Appendix_Target_Sale_Levels = await employeeService.HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Search(pr1);
                    }
                }
            }
            catch { }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Update([FromBody] HRM_Employee_Labour_Contract_ENTITY input)
        {
            input.xml_sale_level = input.HRM_Employee_Labour_Contract_Appendix_Target_Sale_Levels.ToXmlFromList();
            var result = await employeeService.HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY>> HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Search([FromBody] HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY input) { 
            var result  = await employeeService.HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<HRM_Employee_Labour_Contract_ENTITY> HRM_Employee_Labour_Contract_Update([FromBody] HRM_Employee_Labour_Contract_ENTITY input)
        {
            try
            {
                input.xml_appendex = input.hRM_Employee_Labour_Contract_Appendixs.ToXmlFromList();
                input.xml_salary = input.hRM_Employee_Labour_Contract_Salarys.ToXmlFromList();
                input.xml_curriculum_vitae = input.hRM_Employee_Labour_Contract_Curriculum_Vitaes.ToXmlFromList();
                input.xml_salary_deduction = input.hRM_Employee_Labour_Contract_Salary_Deductions.ToXmlFromList();
                var result = await employeeService.HRM_Employee_Labour_Contract_Update(input);
                HRM_Employee_Labour_Contract_Appendix_ENTITY pr = new HRM_Employee_Labour_Contract_Appendix_ENTITY();
                pr.contract_code = input.code;
                HRM_Employee_Labour_Contract_Salary_ENTITY pr1 = new HRM_Employee_Labour_Contract_Salary_ENTITY();
                pr1.contract_code = input.code;
                HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY pr2 = new HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY();
                pr2.contract_code = input.code;
                HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY pr3 = new HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY();
                pr3.contract_code = input.code;

                result[0].hRM_Employee_Labour_Contract_Appendixs = await employeeService.HRM_Employee_Labour_Contract_Appendix_Search(pr);
                result[0].hRM_Employee_Labour_Contract_Salarys = await employeeService.HRM_Employee_Labour_Contract_Salary_Search(pr1);
                result[0].hRM_Employee_Labour_Contract_Curriculum_Vitaes = await employeeService.HRM_Employee_Labour_Contract_Curriculum_Vitae_Search(pr2);
                result[0].hRM_Employee_Labour_Contract_Salary_Deductions = await employeeService.HRM_Employee_Labour_Contract_Salary_Deduction_Search(pr3);
                return result[0];
            }
            catch
            {
                return null;
            }
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Work_Procedure_Delete(string code, string user_login)
        {
            var result = await employeeService.HRM_Employee_Work_Procedure_Delete(code,user_login);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Work_Procedure_Insert([FromBody] HRM_Employee_ENTITY input)
        {
            var result = await employeeService.HRM_Employee_Work_Procedure_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Employee_ENTITY>> HRM_Employee_Work_Procedure_Search([FromBody] HRM_Employee_ENTITY input)
        {
            var result = await employeeService.HRM_Employee_Search(input);
            try
            {
                if (input.type == "Edit" || input.type == "ViewDetail")
                {
                    HRM_Employee_Bonus_ENTITY p0 = new HRM_Employee_Bonus_ENTITY();
                    p0.employee_code = input.code;
                    result[0].hRM_Employee_Bonus = await employeeService.HRM_Employee_Bonus_Search(p0);

                    HRM_Employee_Discipline_ENTITY p1 = new HRM_Employee_Discipline_ENTITY();
                    p1.employee_code = input.code;
                    result[0].hRM_Employee_Discipline = await employeeService.HRM_Employee_Discipline_Search(p1);

                    HRM_Employee_Training_ENTITY p2 = new HRM_Employee_Training_ENTITY();
                    p2.employee_code = input.code;
                    result[0].hRM_Employee_Training = await employeeService.HRM_Employee_Training_Search(p2);

                    HRM_Employee_Evaluate_ENTITY p3 = new HRM_Employee_Evaluate_ENTITY();
                    p3.employee_code = input.code;
                    result[0].hRM_Employee_Evaluates = await employeeService.HRM_Employee_Evaluate_Search(p3);

                    HRM_Employee_Occupational_Accident_ENTITY p4 = new HRM_Employee_Occupational_Accident_ENTITY();
                    p4.employee_code = input.code;
                    result[0].hRM_Employee_Occupational_Accidents = await employeeService.HRM_Employee_Occupational_Accident_Search(p4);

                }
            }
            catch { }
            return result;
        }
        [HttpPost]
        public async Task<HRM_Employee_ENTITY> HRM_Employee_Work_Procedure_Update([FromBody] HRM_Employee_ENTITY input)
        {
            input.xml_bonus = input.hRM_Employee_Bonus.ToXmlFromList();
            input.xml_discipline = input.hRM_Employee_Discipline.ToXmlFromList();
            input.xml_training = input.hRM_Employee_Training.ToXmlFromList();
            input.xml_evaluate = input.hRM_Employee_Evaluates.ToXmlFromList();
            input.xml_occupational_accident = input.hRM_Employee_Occupational_Accidents.ToXmlFromList();
            var result = await employeeService.HRM_Employee_Work_Procedure_Update(input);
            
            HRM_Employee_Bonus_ENTITY p0 = new HRM_Employee_Bonus_ENTITY();
            p0.employee_code = input.code;
            result.hRM_Employee_Bonus = await employeeService.HRM_Employee_Bonus_Search(p0);

            HRM_Employee_Discipline_ENTITY p1 = new HRM_Employee_Discipline_ENTITY();
            p1.employee_code = input.code;
            result.hRM_Employee_Discipline = await employeeService.HRM_Employee_Discipline_Search(p1);

            HRM_Employee_Training_ENTITY p2 = new HRM_Employee_Training_ENTITY();
            p2.employee_code = input.code;
            result.hRM_Employee_Training = await employeeService.HRM_Employee_Training_Search(p2);

            HRM_Employee_Evaluate_ENTITY p3 = new HRM_Employee_Evaluate_ENTITY();
            p3.employee_code = input.code;
            result.hRM_Employee_Evaluates = await employeeService.HRM_Employee_Evaluate_Search(p3);

            HRM_Employee_Occupational_Accident_ENTITY p4 = new HRM_Employee_Occupational_Accident_ENTITY();
            p4.employee_code = input.code;
            result.hRM_Employee_Occupational_Accidents = await employeeService.HRM_Employee_Occupational_Accident_Search(p4);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Employee_Check_In_Out_ENTITY>> HRM_Employee_Check_In_Out_Search([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            var result = await employeeService.HRM_Employee_Check_In_Out_Search(input);
            if (input.type == "RECOGNITION")
            {
                result[0].link_image = result[0].link_image.Replace("FaceAI", "|");
                string path = result[0].link_image.Split('|')[1].Replace("/","\\"); 

                result[0].base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory+"\\FaceAI" + path);
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Warning_Actions([FromBody] List<HRM_Employee_Check_In_Out_ENTITY> input,string type)
        {
            return await employeeService.HRM_Employee_Check_In_Out_Warning_Actions(input.ToXmlFromList(), type);
        }
        [HttpPost]
        public async Task<List<HRM_Employee_Check_In_Out_Warning_ENTITY>> HRM_Employee_Check_In_Out_Warning_Search([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            List<HRM_Employee_Check_In_Out_Warning_ENTITY> result = new List<HRM_Employee_Check_In_Out_Warning_ENTITY>();
            List<HRM_Employee_Check_In_Out_ENTITY> checkInOut = new List<HRM_Employee_Check_In_Out_ENTITY>();
            List<HRM_Employee_ENTITY> employees = await employeeService.HRM_Employee_Search(
                new HRM_Employee_ENTITY { type="ALL",user_login=input.employee_code,active=true });
            for(int i=0; i < employees.Count; i++)
            {
                HRM_Employee_Check_In_Out_ENTITY param = new HRM_Employee_Check_In_Out_ENTITY();
                param.employee_code = employees[i].code;
                param.filter_date = input.filter_date;
                param.type = "FACE-WARNING";
                checkInOut = await employeeService.HRM_Employee_Check_In_Out_Search(param);
                HRM_Employee_Check_In_Out_Warning_ENTITY item = new HRM_Employee_Check_In_Out_Warning_ENTITY();
                item.employee_name = employees[i].firstName+ ""+ employees[i].lastName;
                item.list_datas = checkInOut;
                result.Add(item);
            }

            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Employee_Check_In_Out_ENTITY>> HRM_Employee_Timesheet_Search([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            return await employeeService.HRM_Employee_Timesheet_Search(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Update([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            return await employeeService.HRM_Employee_Check_In_Out_Update(input);
        } 
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Face_Training_Update([FromBody] FaceInfoFaceTrainingUpdate input)
        {
            return await employeeService.HRM_Employee_Check_In_Out_Face_Training_Update(input);
        }
        [HttpPost]
        public async Task<ResposeModel> HRM_Employee_Check_In_Out_Verify([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage(HttpMethod.Post, input.requestUri);
            try
            {
                HRM_Branch_ENTITY branch_info = (await HRM_BranchService.HRM_Branch_Search(new HRM_Branch_ENTITY { code = input.branch_code }))[0];

                var pr = new HRM_Employee_Check_In_Out_Image_Training_ENTITY();
                pr.employee_code = input.employee_code;
                input.hRM_Employee_Check_In_Out_Image_Trainings = new HRM_Employee_Check_In_Out_Image_Training_ENTITY();

                ResposeModel res = new ResposeModel();
                res.status = 0;
                res.message = "Success";

                for (int i = 0; i < 4; i++)
                {
                    string path = "\\FaceAI\\EmployeeTraining\\" + input.employee_code + "\\";
                    string name = input.employee_code;

                    if (i == 0)
                    {
                        name += "-Left.jpg";
                        input.hRM_Employee_Check_In_Out_Image_Trainings.left_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                        var content = new StringContent(
                            "{\"model_name\":\"SFace\", " +
                            "\"img1_path\":\""+ input.base64+ "\"," +
                            "\"img2_path\":\""+ input.hRM_Employee_Check_In_Out_Image_Trainings.left_base64 + "\"}", null, "application/json");
                        request.Content = content;
                        var response = await client.SendAsync(request);
                        response.EnsureSuccessStatusCode();
                        var json = await response.Content.ReadAsStringAsync();
                        var result = JsonConvert.DeserializeObject<SFaceModel>(json);
                        res.distance = result.distance;
                        if (result.distance <= branch_info.distance / 100) 
                        return res;
                    }
                    if (i == 1)
                    {
                        name += "-Right.jpg";
                        input.hRM_Employee_Check_In_Out_Image_Trainings.right_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                        var content = new StringContent(
                           "{\"model_name\":\"SFace\", " +
                           "\"img1_path\":\"" + input.base64 + "\"," +
                           "\"img2_path\":\"" + input.hRM_Employee_Check_In_Out_Image_Trainings.right_base64 + "\"}", null, "application/json");
                        request.Content = content;
                        var response = await client.SendAsync(request);
                        response.EnsureSuccessStatusCode();
                        var json = await response.Content.ReadAsStringAsync();
                        var result = JsonConvert.DeserializeObject<SFaceModel>(json);
                        res.distance = result.distance;
                        if (result.distance <= branch_info.distance / 100)
                            return res;
                    }
                    if (i == 2)
                    {
                        name += "-Top.jpg";
                        input.hRM_Employee_Check_In_Out_Image_Trainings.top_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                        var content = new StringContent(
                           "{\"model_name\":\"SFace\", " +
                           "\"img1_path\":\"" + input.base64 + "\"," +
                           "\"img2_path\":\"" + input.hRM_Employee_Check_In_Out_Image_Trainings.top_base64 + "\"}", null, "application/json");
                        request.Content = content;
                        var response = await client.SendAsync(request);
                        response.EnsureSuccessStatusCode();
                        var json = await response.Content.ReadAsStringAsync();
                        var result = JsonConvert.DeserializeObject<SFaceModel>(json);
                        res.distance = result.distance;
                        if (result.distance <= branch_info.distance / 100)
                            return res;
                    }
                    if (i == 3)
                    {
                        name += "-Bottom.jpg";
                        input.hRM_Employee_Check_In_Out_Image_Trainings.bottom_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                        var content = new StringContent(
                           "{\"model_name\":\"SFace\", " +
                           "\"img1_path\":\"" + input.base64 + "\"," +
                           "\"img2_path\":\"" + input.hRM_Employee_Check_In_Out_Image_Trainings.bottom_base64 + "\"}", null, "application/json");
                        request.Content = content;
                        var response = await client.SendAsync(request);
                        response.EnsureSuccessStatusCode();
                        var json = await response.Content.ReadAsStringAsync();
                        var result = JsonConvert.DeserializeObject<SFaceModel>(json);
                        res.distance = result.distance;
                        if (result.distance <= branch_info.distance / 100)
                            return res;
                    }
                }
                return new ResposeModel { status = 1, message = "Feail" };
            }
            catch (Exception ex)
            {
                return new ResposeModel { status = -1, message = ex.Message };
            }
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Insert([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            byte[] image = Convert.FromBase64String(input.base64.Replace("data:image/jpeg;base64,", ""));
            double fileSizeKB = 0;
            Image img;
            using (var ms = new MemoryStream(image))
            {
                img = Image.FromStream(ms);
                fileSizeKB = ms.Length / 1024; // or some other data container
            }
            string path = "\\FaceAI\\CheckInOut\\" + DateTime.Now.ToString("dd-MM-yyyy") + "\\";
            string name = input.code + "-" + Guid.NewGuid() + ".jpg";
            if (fileSizeKB > 100)
            {
                try
                {
                    bool is_android = false;
                    if (input.machine_id.ToUpper() == "ANDROID") is_android = true;
                    bool checkresize = FileManagerController.resizeImage(img, new Size(256, 256), FileManagerController.AppDirectory + path, name, is_android);
                    if (checkresize)
                    {
                        input.link_image = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + "_re" + name;
                    }
                }
                catch (Exception ex)
                {
                }
            }
            else
            {
                bool check = FileManagerController.SaveBase64ToImage(input.base64.Replace("data:image/jpeg;base64,", ""), FileManagerController.AppDirectory + path, name);
                input.link_image = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
            }
            
            return await employeeService.HRM_Employee_Check_In_Out_Insert(input);
        }
        [HttpPost]
        public async Task<HRM_Employee_Check_In_Out_ENTITY> HRM_Employee_Check_In_Out_Face_Training_Search([FromBody] HRM_Employee_Check_In_Out_ENTITY input)
        {
            try
            {
                var pr = new HRM_Employee_Check_In_Out_Image_Training_ENTITY();
                pr.employee_code = input.employee_code;
                List<HRM_Employee_Check_In_Out_Image_Training_ENTITY> list_img_trainings = await employeeService.HRM_Employee_Check_In_Out_Face_Training_Search(pr);
                if (list_img_trainings != null && list_img_trainings.Count > 0) input.hRM_Employee_Check_In_Out_Image_Trainings = list_img_trainings[0];
                else input.hRM_Employee_Check_In_Out_Image_Trainings = new HRM_Employee_Check_In_Out_Image_Training_ENTITY();

                input.status = 0;
                input.message = "Success";
                
                for (int i = 0; i < 4; i++)
                {
                    string path = "\\FaceAI\\EmployeeTraining\\" + input.employee_code + "\\";
                    string name = input.employee_code;
                    
                    if (i == 0)
                    {
                        name += "-Left.jpg";
                        input.hRM_Employee_Check_In_Out_Image_Trainings.left = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
                        input.hRM_Employee_Check_In_Out_Image_Trainings.left_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path+name);
                    }
                    if (i == 1)
                    {
                        name += "-Right.jpg";
                        input.hRM_Employee_Check_In_Out_Image_Trainings.right = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
                        input.hRM_Employee_Check_In_Out_Image_Trainings.right_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                    }
                    if (i == 2)
                    {
                        name += "-Top.jpg";
                        input.hRM_Employee_Check_In_Out_Image_Trainings.top = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
                        input.hRM_Employee_Check_In_Out_Image_Trainings.top_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                    }
                    if (i == 3)
                    {
                        name += "-Bottom.jpg";
                        input.hRM_Employee_Check_In_Out_Image_Trainings.bottom = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
                        input.hRM_Employee_Check_In_Out_Image_Trainings.bottom_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                    }
                    if (i == 4)
                    {
                        name += "-Center.jpg";
                        input.hRM_Employee_Check_In_Out_Image_Trainings.center = Request.Scheme + "://" + Request.HttpContext.Request.Host + path.Replace("\\", "/") + name;
                        input.hRM_Employee_Check_In_Out_Image_Trainings.center_base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + path + name);
                    }
                    FileInfo file = new FileInfo(FileManagerController.AppDirectory+path + name);
                    if (!file.Exists)
                    {
                        input.status = 1;
                        input.message = "Face training Not found";
                    }
                }
                if(input.type == "CHECKIN-ON-APP" && !string.IsNullOrEmpty(input.link_image))
                {
                    try
                    {
                        input.base64 = "data:image/jpeg;base64," + FileManagerController.GetImageBase64(FileManagerController.AppDirectory + input.link_image.Replace("/", "\\"));
                    }
                    catch { }
                }
                return input;
            }
            catch(Exception ex)
            {
                input.status = 1;
                input.message = ex.Message;
                return input;
            }
        }
        [HttpPost]
        public async Task<HRM_Employee_Report_Salary_ENTITY> HRM_Employee_Report_Salary_Search([FromBody] HRM_Employee_Report_Salary_ENTITY input)
        {
            HRM_Employee_Report_Salary_ENTITY result = new HRM_Employee_Report_Salary_ENTITY();
            string startPath = FileManagerController.AppDirectory+"\\Reports\\HRM\\Employees\\"+ input.start_datetime.Value.ToString("dd-MM-yyyy");
            string zipOutputPath = FileManagerController.AppDirectory+"\\Reports\\HRM\\Employees\\Output";
            try
            {
                Directory.Delete(startPath, true);
            }
            catch { }
            string startName = "PHIẾU CHI LƯƠNG THÁNG " + input.start_datetime.Value.Month + " NĂM " + input.start_datetime.Value.Year;
            string zipPath = $"{zipOutputPath}\\{startName+ Guid.NewGuid()}.zip";
            //string extractPath = @".\extract";

            //ZipFile.ExtractToDirectory(zipPath, extractPath);
            var dtDanhSachLuong = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "DanhSachLuong",
                       @"SELECT A.[ID],A.[code],A.[contract_code],A.[name],A.[salary_name],ISNULL(A.[salary],0)salary,A.[unit],B.employee_code
                            FROM [HRM_Employee_Labour_Contract_Salary] A
                            LEFT JOIN HRM_Employee_Labour_Contract B ON A.contract_code = B.code");
            var dtCacKhoanThuNhap = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "CacKhoanThuNhap", @"SELECT ISNULL(A.taget_default,0)taget_default,A.taget,A.taget_unit,A.month,A.year,A.employee_code,A.name,
				            CASE
					            WHEN A.taget_unit = 'PERCENT' THEN CAST(ISNULL(A.taget_default,0) AS VARCHAR(20)) + '%'
					            ELSE CAST(ISNULL(A.taget_default,0) AS VARCHAR(20)) +N' SL'
				            END taget_default_f,
				            ISNULL(B.sales,0) salesed,
				            CASE
					            WHEN ISNULL(B.sales,0)>ISNULL(A.taget_default,0) THEN ISNULL(B.sales,0)-ISNULL(A.taget_default,0)
					            ELSE 0
				            END over_sales,
				            CASE
					            WHEN ISNULL(B.sales,0)>ISNULL(A.taget_default,0) THEN 
						            CASE
							            WHEN A.taget_unit ='QUANTITY' THEN (ISNULL(B.sales,0)-ISNULL(A.taget_default,0)) * A.taget * A.salary
							            ELSE 0
						            END
					            ELSE 0
				            END salary,
				            CASE
					            WHEN ISNULL(B.sales,0)=0 THEN '0%'
					            ELSE CAST(ISNULL(B.sales,0)/100 AS VARCHAR(20))+'%'
				            END ratio_f,
				            ISNULL(B.sales,0)/100 ratio,
				            ISNULL(A.is_close,0)is_close,
				            CASE
					            WHEN ISNULL(A.is_close,0)=0 THEN N'Sổ đang mở'
					            WHEN A.is_close=1 THEN N'Đã đóng sổ'
				            END html_close
				            FROM HRM_Employee_Labour_Contract_Appendix_Target A
				            LEFT JOIN (
					            SELECT [appendix_target_code]
						              ,SUM([sales])[sales]
					              FROM [dbo].[HRM_Employee_Labour_Contract_Appendix_Target_Detail]
					              GROUP BY [appendix_target_code] 
				            ) B ON A.code = B.appendix_target_code
				            LEFT JOIN HRM_Employee_Labour_Contract C ON A.contract_code = C.code
				            WHERE A.month = " + input.start_datetime.Value.Month+ @"
				            AND A.year = " + input.start_datetime.Value.Year);
            var dtCacKhoanTruVaoLuong = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "CacKhoanTruVaoLuong", @"
                        SELECT A.[ID] ,A.[code],A.[contract_code],
                        CASE
	                        WHEN A.salary_deduction_unit = 'PERCENT' THEN (A.[name]+' ('+CAST(CAST(A.salary_deduction as numeric(10,1)) AS nvarchar(200))+'%)')
	                        ELSE A.[name]
                        END[name],
                        CASE
	                        WHEN A.salary_deduction_unit = 'PERCENT' THEN ISNULL(C.salary,0) * ((ISNULL(A.salary_deduction,0)/100))
	                        ELSE ISNULL(A.salary_deduction,0)
                        END salary
                        ,A.[salary_deduction_name],A.[unit] ,ISNULL(A.salary_deduction,0)[salary_deduction] ,A.[salary_deduction_unit],A.[contract_salary_code],B.employee_code,C.salary contract_salary
                            FROM HRM_Employee_Labour_Contract_Salary_Deduction A
                            LEFT JOIN HRM_Employee_Labour_Contract B ON A.contract_code = B.code
	                        LEFT JOIN HRM_Employee_Labour_Contract_Salary C ON C.code = A.contract_salary_code");
            
            var dt = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "dt", "EXEC [dbo].[HRM_Employee_Search]");
            var dtAll = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "dtAll", @"Declare @SalaryAll Table (
                        STT int,
                        employee_id varchar(50),
                        employee_full_name nvarchar(250),
                        department_name nvarchar(250),
                        branch_name nvarchar(250),
                        sum_standard decimal(18,4),
                        sum_work_day_practical decimal(18,4),
                        total_salary1 decimal(18,4),
                        total_salary decimal(18,4),
                        total_salary_minus decimal(18,4),
                        total_salary_last decimal(18,4))
                        select STT,employee_id,employee_full_name,department_name,branch_name,sum_standard,sum_work_day_practical,total_salary1,total_salary,total_salary_minus,total_salary_last from @SalaryAll ");

            try
            {
                int stt =0;
                using var reportAll = new LocalReport();
                string renderFormat = "Excel";
                string extention = "xls";
                foreach (HRM_Employee_Report_Salary_Employee_ENTITY employee in input.list_salary_employees)
                {
                    stt++;
                    try
                    {
                        var newrowAll = dtAll.NewRow();

                        
                        using var report = new LocalReport();
                        decimal total_salary = 0;
                        decimal total_salary1 = 0;//Doan số
                        decimal total_salary_minus = 0;
                        decimal total_salary_last = 0;
                        DataTable c_DanhSachLuong = dtDanhSachLuong.Select($"employee_code = '{employee.code}'").CopyToDataTable();
                        for (int i = 0; i < 3; i++)
                        {
                            var newrow = c_DanhSachLuong.NewRow();
                            switch (i)
                            {
                                case 0:
                                    newrow["name"] = "Số ngày công trong tháng";
                                    newrow["salary"] = employee.sum_standard;
                                    break;
                                case 1:
                                    newrow["name"] = "Số ngày công thực tế";
                                    newrow["salary"] = employee.sum_work_day_practical;
                                    break;
                                case 2:
                                    newrow["name"] = "Tổng thu nhập";
                                    newrow["salary"] = employee.total_salary;
                                    break;
                            }
                            c_DanhSachLuong.Rows.Add(newrow);
                        }
                        DataRow row = dt.Select($"code ='{employee.code}'")[0];
                        var employee_info = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "dt", "select '' name,'' title");
                        employee_info.Rows[0]["title"] = "Mã nhân viên";
                        employee_info.Rows[0]["name"] = row["employee_code"].ToString();
                        var newrow1 = employee_info.NewRow();
                        newrow1 = employee_info.NewRow();
                        newrow1["title"] = "Họ và tên";
                        newrow1["name"] = row["firstName"].ToString() + " " + row["lastName"].ToString();
                        employee_info.Rows.Add(newrow1);
                        newrow1 = employee_info.NewRow();
                        newrow1["title"] = "Phòng ban";
                        newrow1["name"] = row["department_name"].ToString();
                        employee_info.Rows.Add(newrow1);
                        DataRow[] r_dtCacKhoanThuNhap = dtCacKhoanThuNhap.Select($"employee_code = '{employee.code}'");
                        DataTable c_dtCacKhoanThuNhap;
                        if (r_dtCacKhoanThuNhap.Length > 0) {
                            c_dtCacKhoanThuNhap = dtCacKhoanThuNhap.Select($"employee_code = '{employee.code}'").CopyToDataTable();
                            foreach (DataRow row1 in c_dtCacKhoanThuNhap.Rows)//Doanh số
                            {
                                total_salary1 += decimal.Parse(row1["salary"].ToString());
                            }
                        }
                        else c_dtCacKhoanThuNhap = dtCacKhoanThuNhap;
                        var newrow2 = c_dtCacKhoanThuNhap.NewRow();
                        newrow2["name"] = "Lương thành tiền ngày công thực tế";
                        newrow2["salary"] = employee.sum_salary_by_work_day;
                        newrow2["employee_code"] = employee.code;
                        c_dtCacKhoanThuNhap.Rows.Add(newrow2);
                        if (r_dtCacKhoanThuNhap.Length == 0) c_dtCacKhoanThuNhap = dtCacKhoanThuNhap.Select($"employee_code = '{employee.code}'").CopyToDataTable();
                        DataTable c_dtCacKhoanTruVaoLuong = new DataTable();
                        try
                        {
                            c_dtCacKhoanTruVaoLuong = dtCacKhoanTruVaoLuong.Select($"employee_code = '{employee.code}'").CopyToDataTable();
                        }
                        catch
                        {
                            c_dtCacKhoanTruVaoLuong = new DataTable("dtCacKhoanTruVaoLuong");
                            DataColumn dtColumn = new DataColumn();
                            dtColumn.DataType = typeof(String);
                            dtColumn.ColumnName = "name";
                            c_dtCacKhoanTruVaoLuong.Columns.Add(dtColumn);

                            dtColumn = new DataColumn();
                            dtColumn.DataType = typeof(Decimal);
                            dtColumn.ColumnName = "salary";
                            c_dtCacKhoanTruVaoLuong.Columns.Add(dtColumn);
                        }

                        report.DataSources.Add(new ReportDataSource("DanhSachLuong", c_DanhSachLuong));
                        report.DataSources.Add(new ReportDataSource("CacKhoanThuNhap", c_dtCacKhoanThuNhap));
                        report.DataSources.Add(new ReportDataSource("CacKhoanTruVaoLuong", c_dtCacKhoanTruVaoLuong));
                        report.DataSources.Add(new ReportDataSource("Employee", employee_info));
                        foreach (DataRow row1 in dtCacKhoanTruVaoLuong.Select($"employee_code = '{employee.code}'"))
                        {
                            total_salary_minus += decimal.Parse(row1["salary"].ToString());
                        }
                        foreach (DataRow row1 in c_dtCacKhoanThuNhap.Rows)
                        {
                            total_salary += decimal.Parse(row1["salary"].ToString());
                        }
                        total_salary_last = total_salary - total_salary_minus;
                        if (employee.is_use == true)
                        {
                            var parameters = new[] {
                                new ReportParameter("branch_name", row["branch_name"].ToString()),
                                new ReportParameter("total_salary", total_salary.ToString()),
                                new ReportParameter("total_salary_minus", total_salary_minus.ToString()),
                                new ReportParameter("total_salary_last", total_salary_last.ToString()),
                                new ReportParameter("address_branch", row["address_branch"].ToString()),
                                new ReportParameter("title", "PHIẾU CHI LƯƠNG THÁNG "+input.start_datetime.Value.Month+" NĂM "+input.start_datetime.Value.Year)
                            };
                            report.ReportPath = $"{FileManagerController.AppDirectory}\\Reports\\HRM\\Employees\\PhieuLuongTungNhanVien.rdlc";
                            report.SetParameters(parameters);

                            var pdf = report.Render(renderFormat);
                            string filename = $"{row["firstName"]} {row["lastName"]}." + extention;
                            FileManagerController.SaveFile(pdf, $"{FileManagerController.AppDirectory}\\Reports\\HRM\\Employees\\{input.start_datetime.Value.ToString("dd-MM-yyyy")}\\", filename);
                        }
                        newrowAll["STT"] =stt;
                        newrowAll["employee_id"] = row["employee_code"].ToString();
                        newrowAll["employee_full_name"] = row["firstName"].ToString() + " " + row["lastName"].ToString();
                        newrowAll["department_name"] = row["department_name"].ToString();
                        newrowAll["branch_name"] = row["branch_name"].ToString();
                        newrowAll["sum_standard"] = employee.sum_standard;
                        newrowAll["sum_work_day_practical"] = employee.sum_work_day_practical;
                        newrowAll["total_salary1"] = total_salary1;
                        newrowAll["total_salary"] = total_salary;
                        newrowAll["total_salary_minus"] = total_salary_minus;
                        newrowAll["total_salary_last"] = total_salary_last;
                        dtAll.Rows.Add(newrowAll);
                    }
                    catch { }
                }
                reportAll.DataSources.Add(new ReportDataSource("SalaryAllEmployee", dtAll));
                reportAll.ReportPath = $"{FileManagerController.AppDirectory}\\Reports\\HRM\\Employees\\PhieuLuongTongHop.rdlc";

                var excel = reportAll.Render(renderFormat);
                string filenameAll = $"Bảng tổng hợp lương." + extention;
                FileManagerController.SaveFile(excel, $"{FileManagerController.AppDirectory}\\Reports\\HRM\\Employees\\{input.start_datetime.Value.ToString("dd-MM-yyyy")}\\", filenameAll);
            }
            catch (Exception ex){ }

            try {ZipFile.CreateFromDirectory(startPath, zipPath); } catch { }
            result.path = zipPath.Split("wwwroot")[1].Replace("\\","/");
            return result;
        }
        [HttpPost]
        public async Task<HRM_Employee_Report_Salary_ENTITY> HRM_Employee_Report_Salary_v2_Search([FromBody] HRM_Employee_Report_Salary_ENTITY input)
        {
            List<HRM_Branch_ENTITY> branch = await this.HRM_BranchService.HRM_Branch_Search(new HRM_Branch_ENTITY { company_code= AuthenticateController.appSessionUser.company_code });
            string company_symbol = branch[0].company_symbol.ToString();
            HRM_Employee_Report_Salary_ENTITY result = new HRM_Employee_Report_Salary_ENTITY();
            string startPath = FileManagerController.AppDirectory + "\\Reports\\"+ company_symbol + "\\HRM\\Employees\\" + input.start_datetime.Value.ToString("dd-MM-yyyy");
            string zipOutputPath = FileManagerController.AppDirectory + "\\Reports\\" + company_symbol + "\\HRM\\Employees\\Output";
            try
            {
                Directory.Delete(startPath, true);
            }
            catch { }
            string startName = "PHIẾU CHI LƯƠNG THÁNG " + input.start_datetime.Value.Month + " NĂM " + input.start_datetime.Value.Year;
            string zipPath = $"{zipOutputPath}\\{startName + Guid.NewGuid()}.zip";
            //string extractPath = @".\extract";

            //ZipFile.ExtractToDirectory(zipPath, extractPath);
            var dtDanhSachLuong = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "DanhSachLuong",
                       @"SELECT A.[ID],A.[code],A.[contract_code],A.[name],A.[salary_name],ISNULL(A.[salary],0)salary,A.[unit],B.employee_code
                            FROM [HRM_Employee_Labour_Contract_Salary] A
                            LEFT JOIN HRM_Employee_Labour_Contract B ON A.contract_code = B.code");
            var dtCacKhoanThuNhap = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "CacKhoanThuNhap", @" EXEC HRM_Employee_Report_Salary_Income_Search @p_month = " + input.start_datetime.Value.Month + @"
				            ,@p_year = " + input.start_datetime.Value.Year);
            var dtCacKhoanThuNhapPhuCap = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "CacKhoanThuNhapPhuCap",
                @"select A.[ID],A.[code],A.[contract_code],A.[name],A.[salary_name],ISNULL(A.[salary],0)salary,A.[unit],A.[taget],A.[taget_unit],A.[taget_default],A.[appendix_type],B.employee_code 
                    from HRM_Employee_Labour_Contract_Appendix A
                    LEFT JOIN HRM_Employee_Labour_Contract B ON A.contract_code = b.code
                    where B.employee_code is not null and B.employee_code <> ''  and (A.[appendix_type] = 'MONTH_FIXED' OR A.[appendix_type] = 'BY_WORKDAY') ");
            var dtCacKhoanTruVaoLuong = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "CacKhoanTruVaoLuong", @"
                        SELECT A.[ID] ,A.[code],A.[contract_code],
                        CASE
	                        WHEN A.salary_deduction_unit = 'PERCENT' THEN (A.[name]+' ('+CAST(CAST(A.salary_deduction as numeric(10,1)) AS nvarchar(200))+'%)')
	                        ELSE A.[name]
                        END[name],
                        CASE
	                        WHEN A.salary_deduction_unit = 'PERCENT' THEN ISNULL(C.salary,0) * ((ISNULL(A.salary_deduction,0)/100))
	                        ELSE ISNULL(A.salary_deduction,0)
                        END salary
                        ,A.[salary_deduction_name],A.[unit] ,ISNULL(A.salary_deduction,0)[salary_deduction] ,A.[salary_deduction_unit],A.[contract_salary_code],B.employee_code,C.salary contract_salary
                            FROM HRM_Employee_Labour_Contract_Salary_Deduction A
                            LEFT JOIN HRM_Employee_Labour_Contract B ON A.contract_code = B.code
	                        LEFT JOIN HRM_Employee_Labour_Contract_Salary C ON C.code = A.contract_salary_code");

            var dt = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "dt", "EXEC [dbo].[HRM_Employee_Search]");
            var dtAll = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "dtAll", @"Declare @SalaryAll Table (
                        STT int,
                        employee_id varchar(50),
                        employee_full_name nvarchar(250),
                        employee_full_name_sale nvarchar(250),
                        department_name nvarchar(250),
                        branch_name nvarchar(250),
                        sum_standard decimal(18,4),
                        sum_work_day_practical decimal(18,4),
                        total_salary1 decimal(18,4),
                        total_salary decimal(18,4),
                        total_salary_minus decimal(18,4),
                        total_salary_last decimal(18,4),
                        money_share decimal(18,4),
                        plus_salary decimal(18,4))
                        select STT,employee_id,employee_full_name,department_name,branch_name,sum_standard,sum_work_day_practical,total_salary1,total_salary,total_salary_minus,total_salary_last,money_share,plus_salary,employee_full_name_sale from @SalaryAll ");

            try
            {
                int stt = 0;
                using var reportAll = new LocalReport();
                string renderFormat = "Excel";
                string extention = "xls";
                foreach (HRM_Employee_Report_Salary_Employee_ENTITY employee in input.list_salary_employees)
                {
                    stt++;
                    try
                    {
                        var newrowAll = dtAll.NewRow();
                        using var report = new LocalReport();
                        decimal total_salary = 0;
                        decimal total_salary1 = 0;//Doan số
                        decimal total_salary_minus = 0;
                        decimal total_salary_last = 0;
                        DataTable c_DanhSachLuong = new DataTable();
                        DataRow[] dataRowDanhSachLuong = dtDanhSachLuong.Select($"employee_code = '{employee.code}'");
                        if(dataRowDanhSachLuong != null && dataRowDanhSachLuong.Length > 0)
                            c_DanhSachLuong = dataRowDanhSachLuong.CopyToDataTable();
                        else c_DanhSachLuong = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "dtAll", @"DECLARE @DT TABLE(
							name nvarchar(250),
							salary decimal(18,4))
							select * from @DT");
                        DataRow row = dt.Select($"code ='{employee.code}'")[0];
                        bool is_check_in_out = (bool)row["is_check_in_out"];
                        if (is_check_in_out == false)
                        {
                            employee.total_salary = 0;
                            foreach (DataRow item in c_DanhSachLuong.Rows)
                            {
                                employee.total_salary += (decimal)item["salary"];
                            }
                        }
                        for (int i = 0; i < 3; i++)
                        {
                            
                            var newrow = c_DanhSachLuong.NewRow();
                            switch (i)
                            {
                                case 0:
                                    newrow["name"] = "Số ngày công trong tháng";
                                    newrow["salary"] = employee.sum_standard; 
                                    break;
                                case 1:
                                    newrow["name"] = "Số ngày công thực tế";
                                    newrow["salary"] = employee.sum_work_day_practical;
                                    break;
                                case 2:
                                    if (is_check_in_out == false)
                                    {
                                        newrow["name"] = "Tổng thu nhập (Không áp dụng chấm công)";
                                        newrow["salary"] = employee.total_salary;
                                    }
                                    else
                                    {
                                        newrow["name"] = "Tổng thu nhập";
                                        newrow["salary"] = employee.total_salary;
                                    }
                                    break;
                            }
                            c_DanhSachLuong.Rows.Add(newrow);
                        }
                        
                        var employee_info = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "dt", "select '' name,'' title");
                        employee_info.Rows[0]["title"] = "Mã nhân viên";
                        employee_info.Rows[0]["name"] = row["employee_code"].ToString();
                        var newrow1 = employee_info.NewRow();
                        newrow1 = employee_info.NewRow();
                        newrow1["title"] = "Họ và tên";
                        newrow1["name"] = row["firstName"].ToString() + " " + row["lastName"].ToString();
                        employee_info.Rows.Add(newrow1);
                        newrow1 = employee_info.NewRow();
                        newrow1["title"] = "Phòng ban";
                        newrow1["name"] = row["department_name"].ToString();
                        employee_info.Rows.Add(newrow1);
                        DataRow[] r_dtCacKhoanThuNhap = dtCacKhoanThuNhap.Select($"employee_code = '{employee.code}'");
                        DataTable c_dtCacKhoanThuNhap;
                        if (r_dtCacKhoanThuNhap.Length > 0)
                        {
                            c_dtCacKhoanThuNhap = dtCacKhoanThuNhap.Select($"employee_code = '{employee.code}'").CopyToDataTable();
                            foreach (DataRow row1 in c_dtCacKhoanThuNhap.Rows)//Doanh số
                            {
                                total_salary1 += decimal.Parse(row1["salary"].ToString());
                            }
                        }

                        else c_dtCacKhoanThuNhap = dtCacKhoanThuNhap;

                        decimal minus_salary = 0, plus_salary = 0;
                        string plus_from_empoyee = "";
                        int count_plus_from_empoyee = 1;
                        List<HRM_Employee_ENTITY> list_employee_plus_for_orther = new List<HRM_Employee_ENTITY>();
                        foreach (DataRow row_salary in dtCacKhoanThuNhap.Rows)
                        {
                            if (row_salary["employee_code"].ToString() == employee.code)
                                minus_salary += decimal.Parse(row_salary["minus_for_orther"].ToString());//Lương trích cho các bộ phận khác

                            string[] find_employee = Array.FindAll(row_salary["list_employee_code"].ToString().Split(';'), s => s.Equals(employee.code));
                            if (find_employee.Length > 0)
                            {
                                decimal money_for_one_employee = decimal.Parse(row_salary["money_for_one_employee"].ToString());
                                plus_salary += money_for_one_employee;//Lương hưởng từ bộ phận khác
                                if(money_for_one_employee > 0)
                                {
                                    if (plus_from_empoyee != "") plus_from_empoyee += "\n";
                                    plus_from_empoyee += count_plus_from_empoyee+". " + row_salary["employee_name"].ToString() + ": +" + string.Format("{0:#,##0}", money_for_one_employee) + "";
                                    //plus_from_empoyee += count_plus_from_empoyee+". " + row_salary["employee_name"].ToString() + "("+ row_salary["name"].ToString() + "): +" + string.Format("{0:#,##0}", money_for_one_employee) + "";
                                    list_employee_plus_for_orther.Add(new HRM_Employee_ENTITY
                                    {
                                        employee_name = row_salary["employee_name"].ToString(),
                                        salary = money_for_one_employee
                                    });
                                    count_plus_from_empoyee++;
                                }
                            }
                        }
                        total_salary1 += minus_salary + plus_salary;

                        var newrow2 = c_dtCacKhoanThuNhap.NewRow();
                        if (is_check_in_out == false)
                        {
                            newrow2["name"] = "Lương theo hợp đồng (" + row["is_check_in_out_name"].ToString() +")";
                            newrow2["salary"] = employee.total_salary;
                        }
                        else
                        {
                            newrow2["name"] = "Lương thành tiền ngày công thực tế";
                            newrow2["salary"] = employee.sum_salary_by_work_day;
                        }
                        newrow2["employee_code"] = employee.code;
                        c_dtCacKhoanThuNhap.Rows.Add(newrow2);
                        newrow2 = c_dtCacKhoanThuNhap.NewRow();
                        newrow2["name"] = "Lương trích cho bộ phận khác";
                        newrow2["salary"] = minus_salary;
                        newrow2["employee_code"] = employee.code;
                        c_dtCacKhoanThuNhap.Rows.Add(newrow2);
                        newrow2 = c_dtCacKhoanThuNhap.NewRow();
                        newrow2["name"] = "Lương được cộng doanh số từ bộ phận kinh doanh: " + plus_from_empoyee;
                        newrow2["salary"] = plus_salary;
                        newrow2["employee_code"] = employee.code;
                        c_dtCacKhoanThuNhap.Rows.Add(newrow2);

                        DataRow[] row_Appendix_orther = dtCacKhoanThuNhapPhuCap.Select($"employee_code = '{employee.code}'");
                        foreach(DataRow rowAppendex in row_Appendix_orther)
                        {
                            decimal salary = 0;
                            string name = "";
                            if (rowAppendex["appendix_type"].ToString() == "MONTH_FIXED")
                            {
                                salary = decimal.Parse(rowAppendex["salary"].ToString());
                                name = rowAppendex["name"].ToString() + "(" + (((int)salary) / 1000).ToString() + "K / Tháng)";
                            }
                            if (rowAppendex["appendix_type"].ToString() == "BY_WORKDAY")
                            {
                                salary = (decimal)(decimal.Parse(rowAppendex["salary"].ToString()) * employee.sum_work_day_practical);
                                name = rowAppendex["name"].ToString() + "(" + (((int)salary) / 1000).ToString() + "K / " + employee.sum_work_day_practical.ToString() + " ngày)";
                            }
                            if (rowAppendex["appendix_type"].ToString() == "BY_SALE")
                            {
                                name = rowAppendex["name"].ToString() + "(" + (((int)salary) / 1000).ToString() + "K * " + employee.sum_work_day_practical.ToString() + ")";
                            }
                            newrow2 = c_dtCacKhoanThuNhap.NewRow();
                            
                            newrow2["name"] = name;
                            newrow2["salary"] = salary;
                            newrow2["employee_code"] = employee.code;
                            c_dtCacKhoanThuNhap.Rows.Add(newrow2);
                            total_salary1 += salary;
                        }
 
                        var hRM_Employee_Bonus = await employeeService.HRM_Employee_Bonus_Search(new HRM_Employee_Bonus_ENTITY { employee_code = employee.code,bobus_date = input.start_datetime});
                        foreach(var bonus in hRM_Employee_Bonus)
                        {
                            newrow2 = c_dtCacKhoanThuNhap.NewRow();

                            newrow2["name"] = bonus.name;
                            newrow2["salary"] = bonus.value;
                            newrow2["employee_code"] = employee.code;
                            c_dtCacKhoanThuNhap.Rows.Add(newrow2);
                            total_salary1 += (decimal)bonus.value;
                        }

                        if (r_dtCacKhoanThuNhap.Length == 0) c_dtCacKhoanThuNhap = dtCacKhoanThuNhap.Select($"employee_code = '{employee.code}'").CopyToDataTable();
                        DataTable c_dtCacKhoanTruVaoLuong = new DataTable();
                        try
                        {
                            c_dtCacKhoanTruVaoLuong = dtCacKhoanTruVaoLuong.Select($"employee_code = '{employee.code}'").CopyToDataTable();
                        }
                        catch
                        {
                            c_dtCacKhoanTruVaoLuong = new DataTable("dtCacKhoanTruVaoLuong");
                            DataColumn dtColumn = new DataColumn();
                            dtColumn.DataType = typeof(String);
                            dtColumn.ColumnName = "name";
                            c_dtCacKhoanTruVaoLuong.Columns.Add(dtColumn);

                            dtColumn = new DataColumn();
                            dtColumn.DataType = typeof(Decimal);
                            dtColumn.ColumnName = "salary";
                            c_dtCacKhoanTruVaoLuong.Columns.Add(dtColumn);
                        }
                        int count_r1 = c_dtCacKhoanThuNhap.Rows.Count;
                        int count_r2 = c_dtCacKhoanTruVaoLuong.Rows.Count;
                        if (count_r1>count_r2 && count_r2 > 0 && count_r1>0)
                        {
                            for(int i=0;i< count_r1 - count_r2; i++)
                            {
                                newrow2 = c_dtCacKhoanTruVaoLuong.NewRow();
                                newrow2["employee_code"] = employee.code;
                                c_dtCacKhoanTruVaoLuong.Rows.Add(newrow2);
                            }
                        }else if (count_r1 < count_r2 && count_r2 > 0 && count_r1 > 0)
                        {
                            for (int i = 0; i < count_r2 - count_r1; i++)
                            {
                                newrow2 = c_dtCacKhoanThuNhap.NewRow();
                                newrow2["employee_code"] = employee.code;
                                c_dtCacKhoanThuNhap.Rows.Add(newrow2);
                            }
                        }
                        report.DataSources.Add(new ReportDataSource("DanhSachLuong", c_DanhSachLuong));
                        report.DataSources.Add(new ReportDataSource("CacKhoanThuNhap", c_dtCacKhoanThuNhap));
                        report.DataSources.Add(new ReportDataSource("CacKhoanTruVaoLuong", c_dtCacKhoanTruVaoLuong));
                        report.DataSources.Add(new ReportDataSource("Employee", employee_info));
                        foreach (DataRow row1 in dtCacKhoanTruVaoLuong.Select($"employee_code = '{employee.code}'"))
                        {
                            total_salary_minus += decimal.Parse(row1["salary"].ToString());
                        }
                        foreach (DataRow row1 in c_dtCacKhoanThuNhap.Rows)
                        {
                            total_salary += decimal.Parse(row1["salary"].ToString());
                        }

                        HRM_Employee_Discipline_ENTITY p1 = new HRM_Employee_Discipline_ENTITY();
                        p1.type = "DISCIPLINE";
                        p1.employee_code = employee.code;
                        p1.start_discipline_date = input.start_datetime;
                        p1.end_discipline_date = input.end_datetime;
                        var hRM_Employee_Discipline = await employeeService.HRM_Employee_Discipline_Search(p1);
                        decimal total_month = total_salary, total_month_minus = 0;
                        if (hRM_Employee_Discipline.Count > 0)
                        {
                            foreach (var _row in hRM_Employee_Discipline)
                                total_month_minus += (decimal)_row.value;
                        }
                        total_salary_last = total_salary - (total_salary_minus + total_month_minus);

                        if (employee.is_use == true)
                        {
                            DataTable c_TotalSalaryByEmployee = new DataTable("TotalSalaryByEmployee");
                            DataColumn dtColumn = new DataColumn();
                            dtColumn.DataType = typeof(Decimal);
                            dtColumn.ColumnName = "total_salary";
                            c_TotalSalaryByEmployee.Columns.Add(dtColumn);
                            dtColumn = new DataColumn();
                            dtColumn.DataType = typeof(Decimal);
                            dtColumn.ColumnName = "total_salary_last";
                            c_TotalSalaryByEmployee.Columns.Add(dtColumn);
                            dtColumn = new DataColumn();
                            dtColumn.DataType = typeof(Decimal);
                            dtColumn.ColumnName = "total_salary_minus";
                            c_TotalSalaryByEmployee.Columns.Add(dtColumn);
                            dtColumn = new DataColumn();
                            dtColumn.DataType = typeof(Decimal);
                            dtColumn.ColumnName = "total_month";
                            c_TotalSalaryByEmployee.Columns.Add(dtColumn);
                            dtColumn = new DataColumn();
                            dtColumn.DataType = typeof(Decimal);
                            dtColumn.ColumnName = "total_month_minus";
                            c_TotalSalaryByEmployee.Columns.Add(dtColumn);

                            var newRow2 = c_TotalSalaryByEmployee.NewRow();
                            newRow2["total_salary"] = total_salary;
                            newRow2["total_salary_last"] = total_salary_last;
                            newRow2["total_salary_minus"] = total_salary_minus;
                            newRow2["total_month"] = total_month;
                            newRow2["total_month_minus"] = total_month_minus;
                            c_TotalSalaryByEmployee.Rows.Add(newRow2);

                            report.DataSources.Add(new ReportDataSource("TotalSalaryByEmployee", c_TotalSalaryByEmployee));
                            var parameters = new[] {
                                new ReportParameter("branch_name", row["branch_name"].ToString()),
                                new ReportParameter("total_salary", total_salary.ToString()),
                                new ReportParameter("total_salary_minus", total_salary_minus.ToString()),
                                new ReportParameter("total_salary_last", total_salary_last.ToString()),
                                new ReportParameter("address_branch", row["address_branch"].ToString()),
                                new ReportParameter("title", "PHIẾU CHI LƯƠNG THÁNG "+input.start_datetime.Value.Month+" NĂM "+input.start_datetime.Value.Year)
                            };
                            report.ReportPath = $"{FileManagerController.AppDirectory}\\Reports\\" + company_symbol + "\\HRM\\Employees\\PhieuLuongTungNhanVien.rdlc";
                            report.SetParameters(parameters);

                            var pdf = report.Render(renderFormat);
                            string filename = $"{row["firstName"]} {row["lastName"]}." + extention;
                            FileManagerController.SaveFile(pdf, $"{FileManagerController.AppDirectory}\\Reports\\{company_symbol}\\HRM\\Employees\\{input.start_datetime.Value.ToString("dd-MM-yyyy")}\\", filename);
                        }
                        newrowAll["STT"] = stt;
                        newrowAll["employee_id"] = row["employee_code"].ToString();
                        newrowAll["employee_full_name"] = row["firstName"].ToString() + " " + row["lastName"].ToString();
                        newrowAll["employee_full_name_sale"] = "";
                        newrowAll["department_name"] = row["department_name"].ToString();
                        newrowAll["branch_name"] = row["branch_name"].ToString();
                        newrowAll["sum_standard"] = employee.sum_standard;
                        newrowAll["sum_work_day_practical"] = employee.sum_work_day_practical;
                        newrowAll["total_salary1"] = total_salary1;
                        newrowAll["total_salary"] = total_salary;
                        newrowAll["total_salary_minus"] = total_salary_minus;
                        newrowAll["total_salary_last"] = total_salary_last;
                        newrowAll["money_share"] = minus_salary;
                        newrowAll["plus_salary"] = plus_salary;
                        dtAll.Rows.Add(newrowAll);
                        foreach(var item in list_employee_plus_for_orther)
                        {
                            stt++;
                            newrowAll = dtAll.NewRow();
                            newrowAll["STT"] = stt;
                            //newrowAll["employee_id"] = null;
                            //newrowAll["employee_full_name"] = null;
                            newrowAll["employee_full_name_sale"] = item.employee_name;
                            //newrowAll["department_name"] = null;
                            //newrowAll["branch_name"] = null;
                            //newrowAll["sum_standard"] = null;
                            //newrowAll["sum_work_day_practical"] = null;
                            //newrowAll["total_salary1"] = null;
                            //newrowAll["total_salary"] = null;
                            //newrowAll["total_salary_minus"] = null;
                            //newrowAll["total_salary_last"] = null;
                            //newrowAll["money_share"] = null;
                            newrowAll["plus_salary"] = item.salary;
                            dtAll.Rows.Add(newrowAll);
                        }
                    }
                    catch (Exception EX){
                        string msg = EX.Message;
                    }
                }
                reportAll.DataSources.Add(new ReportDataSource("SalaryAllEmployee", dtAll));
                reportAll.ReportPath = $"{FileManagerController.AppDirectory}\\Reports\\" + company_symbol + "\\HRM\\Employees\\PhieuLuongTongHop.rdlc";

                var excel = reportAll.Render(renderFormat);
                string filenameAll = $"Bảng tổng hợp công." + extention;
                FileManagerController.SaveFile(excel, $"{FileManagerController.AppDirectory}\\Reports\\{company_symbol}\\HRM\\Employees\\{input.start_datetime.Value.ToString("dd-MM-yyyy")}\\", filenameAll);
            }
            catch (Exception ex) { 
            
            }

            try { 
                ZipFile.CreateFromDirectory(startPath, zipPath); 
            } catch { }
            result.path = zipPath.Split("wwwroot")[1].Replace("\\", "/");
            return result;
        }

    }
}
