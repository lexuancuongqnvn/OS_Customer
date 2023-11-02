using ERP.Common.Controllers;
using ERP.Warranty.Intfs.Laptop.Dto;
using ERP.Web.Controllers.Upload;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Reporting.NETCore;
using Stimulsoft.Report;
using System;
using System.Collections.Generic;
using System.Data;

namespace ERP.Web.Controllers.Warranty
{
    public class WarrantyReportController : Controller
    {
        private readonly ILogger<WarrantyReportController> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public IActionResult Index()
        {
            return View();
        }
        public WarrantyReportController(ILogger<WarrantyReportController> logger, IWebHostEnvironment webHostEnvironment)
        {
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult PrintReport()
        {
            string renderFormat = "PDF";
            string extention = "pdf";
            string mimetype = "application/pdf";
            using var report = new LocalReport();

            
            var dt = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "Warranty_Laptop", @"
                    EXEC [dbo].[Warranty_Laptop_Search]
		                    @p_code = '3A1007CE-2745-48EA-9F2D-2B1CA69A0A80',
		                    @p_type = 'PRINT',
		                    @p_branch_code = 'E1D61B58-5225-4816-98F5-6CA7BF7EF363'
                    ");

            report.DataSources.Add(new ReportDataSource("Warranty_Laptop", dt));
            DataRow row = dt.Rows[0];
            var parameters = new[] {
                    new ReportParameter("doc_number", row["doc_number"].ToString()),
                    new ReportParameter("customer_name", row["customer_name"].ToString()),
                    new ReportParameter("customer_phone", row["customer_phone"].ToString()),
                    new ReportParameter("customer_email", row["customer_email"].ToString()),
                    new ReportParameter("customer_address", row["customer_address"].ToString()),
                    new ReportParameter("des_model", row["des_model"].ToString()),
                    new ReportParameter("des_sevice_tag", row["des_sevice_tag"].ToString()),
                    new ReportParameter("des_cpu", row["des_cpu"].ToString()),
                    new ReportParameter("des_ram", row["des_ram"].ToString()),
                    new ReportParameter("des_disk", row["des_disk"].ToString()),
                    new ReportParameter("des_battery", row["des_battery"].ToString()),
                    new ReportParameter("des_charger", row["des_charger"].ToString()),
                    new ReportParameter("des_password", row["des_password"].ToString()),
                    new ReportParameter("des_password_bios", row["des_password_bios"].ToString()),
                    new ReportParameter("machine_status", row["machine_status"].ToString()),
                    new ReportParameter("doc_date_f", row["doc_date_f"].ToString()),
                    new ReportParameter("branch_name", row["branch_name"].ToString())
                };
            report.ReportPath = $"{this._webHostEnvironment.WebRootPath}\\Reports\\WarrantyLaptop\\SoBaoHanh2022.rdlc";
            report.SetParameters(parameters);

            var pdf = report.Render(renderFormat);
            string filename = "SoBaoHanh." + extention;
            FileManagerController.SaveFile(pdf, $"{this._webHostEnvironment.WebRootPath}\\Reports\\WarrantyLaptop\\", filename);
            //return Redirect("\\Reports\\WarrantyLaptop\\"+ filename); 
            return File(pdf, mimetype, filename); 
        }
        public static void PrintDocumentWarranty(string code,string branch_code,ref string link,ref int status,ref string message,ref string warranty_type)
        {
            try
            {
                string renderFormat = "PDF";
                string extention = "pdf";
                string path = $"\\Reports\\WarrantyLaptop\\Files\\" + DateTime.Now.ToString("dd-MM-yyyy HH-mm-ss");
                using var report = new LocalReport();

                var dt = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "Warranty_Laptop", @"
                    EXEC [dbo].[Warranty_Laptop_Search]
		                    @p_code = '"+code+@"',
		                    @p_type = 'PRINT',
		                    @p_branch_code = '"+ branch_code + @"'
                    ");

                report.DataSources.Add(new ReportDataSource("Warranty_Laptop", dt));
                DataRow row = dt.Rows[0];
                string logo = FileManagerController.GetImageBase64(FileManagerController.AppDirectory.Replace("\\", "/") + row["url_logo"].ToString());
                var parameters = new[] { 
                    new ReportParameter("doc_number", row["doc_number"].ToString()),
                    new ReportParameter("customer_name", row["customer_name"].ToString()),
                    new ReportParameter("customer_phone", row["customer_phone"].ToString()),
                    new ReportParameter("customer_email", row["customer_email"].ToString()),
                    new ReportParameter("customer_address", row["customer_address"].ToString()),
                    new ReportParameter("des_model", row["des_model"].ToString()),
                    new ReportParameter("des_sevice_tag", row["des_sevice_tag"].ToString()),
                    new ReportParameter("des_cpu", row["des_cpu"].ToString()),
                    new ReportParameter("des_ram", row["des_ram"].ToString()),
                    new ReportParameter("des_disk", row["des_disk"].ToString()),
                    new ReportParameter("des_battery", row["des_battery"].ToString()),
                    new ReportParameter("des_charger", row["des_charger"].ToString()),
                    new ReportParameter("des_password", row["des_password"].ToString()),
                    new ReportParameter("des_password_bios", row["des_password_bios"].ToString()),
                    new ReportParameter("machine_status", row["machine_status"].ToString()),
                    new ReportParameter("doc_date_f", row["doc_date_f"].ToString()),
                    new ReportParameter("branch_name", row["branch_name"].ToString()),
                    new ReportParameter("url_logo",logo)
                };
                warranty_type = row["warranty_type"].ToString();
                string file = "";
                if (warranty_type == "BH") file = "SoBaoHanh2022";
                if (warranty_type == "SC") file = "SoSuaChua2022";
                if (string.IsNullOrEmpty(file))
                {
                    status = 1;
                    message = "Không tìm thấy loại bảo hành";
                    return;
                }
                report.ReportPath = $"{FileManagerController.AppDirectory}\\Reports\\WarrantyLaptop\\{file}.rdlc";
                report.SetParameters(parameters);

                var pdf = report.Render(renderFormat);

                string filename = "";
                if (warranty_type == "BH") filename = "So-Bao-Hanh-2022.";
                if (warranty_type == "SC") filename = "So-Sua-Chua-2022.";
                filename += extention;

                FileManagerController.SaveFile(pdf, FileManagerController.AppDirectory + path, filename);
                link = path.Replace("\\", "/") + filename;
                status = 0;
                message = "OK";
            }
            catch (Exception ex){
                status = 1;
                message = ex.Message;
            }
        }

        public static void WarrantyReport(Warranty_Laptop_ENTITY param,DataTable data, ref Dictionary<string, object> result)
        {
            int status = 0;
            string message = "";
            string link_file = "";
            try
            {
                string renderFormat = "Excel";
                string extention = ".xls";
                string title = "";
                string path = $"\\Reports\\WarrantyLaptop\\Files\\" ;
                using var report = new LocalReport();
                if (param.type == "warehouse") title = "SỔ BẢO HÀNH CÔNG TY";
                else if (param.type == "customer") title = "SỔ BẢO HÀNH KHÁCH HÀNG";
                report.DataSources.Add(new ReportDataSource("WarrantyReport", data));
                var parameters = new[] {
                    new ReportParameter("title", title)
                };
                string template = "";
                if (param.template_report == "CUSTOMER") template = "WarrantyReportByCustomer";
                else if (param.template_report == "MODEL") template = "WarrantyReportByModel";
                report.ReportPath = $"{FileManagerController.AppDirectory}\\Reports\\WarrantyLaptop\\"+ template + ".rdlc";
                report.SetParameters(parameters);

                var pdf = report.Render(renderFormat);

                string filename = title;
                filename += extention;

                FileManagerController.SaveFile(pdf, FileManagerController.AppDirectory + path, filename);
                link_file = path.Replace("\\", "/") + filename;
                status = 0;
                message = "OK";
            }
            catch (Exception ex)
            {
                status = 1;
                message = ex.Message;
            }
            result.Add("status", status);
            result.Add("link_file", link_file);
            result.Add("message", message);
        }
    }
}
