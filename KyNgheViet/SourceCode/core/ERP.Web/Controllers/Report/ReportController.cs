using Dapper;
using DocumentFormat.OpenXml.EMMA;
using DocumentFormat.OpenXml.Wordprocessing;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.System.Intfs.Export;
using ERP.System.Intfs.Export.Dto;
using ERP.Web.Controllers.Upload;
using ERP.Web.Models;
using Grpc.Core;
using HRMS.Impls.Branch;
using HRMS.Intfs.Branch.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Reporting.NETCore;
using NPOI.Util;
using ReportViewer.Controllers;
using Stimulsoft.Report;
using Stimulsoft.Report.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Globalization;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Report
{
    public class ReportController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public ReportController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        [TokenAuthenticationFilter]
        public IActionResult Export(ParamPreviewModel input)
        {
            DataSet myDataSet = new DataSet();
            List<Tuple<string, string>> tuplesRequest = new List<Tuple<string, string>>();
            tuplesRequest.Add(new Tuple<string, string>("p_voucher_code", input.voucher_code));
            tuplesRequest.Add(new Tuple<string, string>("p_master_code", input.master_code));
            tuplesRequest.Add(new Tuple<string, string>("p_voucher_no", input.voucher_no));
            tuplesRequest.Add(new Tuple<string, string>("p_company_code", input.company_code));
            tuplesRequest.Add(new Tuple<string, string>("p_voucher_year", input.voucher_year.ToString()));

            DataTable reportInfo = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "SYS_Report_Infomation_Search", $"EXEC SYS_Report_Infomation_Search @p_company_code = '{input.company_code}',@p_code = '{input.report_code}'");

            string storedProcName = ""; bool is_reference = false, is_branch = false;
            try
            {
                is_reference = bool.Parse(reportInfo.Rows[0]["is_reference"].ToString());
            }
            catch { }
            try
            {
                is_branch = bool.Parse(reportInfo.Rows[0]["is_branch"].ToString());
            }
            catch { }
            if (is_reference)
            {
                storedProcName = reportInfo.Rows[0]["reference"].ToString();
                ManagementController.GetParamTupleStored(ConnectController.GetConnectStringByKey("HRM"), storedProcName, input, ref tuplesRequest);
                myDataSet = ManagementController.GetListTable(ConnectController.GetConnectStringByKey("HRM"), storedProcName, tuplesRequest);
            }
            else
            {
                myDataSet = ManagementController.GetListTable(ConnectController.GetConnectStringByKey("HRM"), "SYS_Report_Print_Search", tuplesRequest);
            }
            if (is_branch == true)
            {
                DataTable HRM_Branch = ManagementController.GetDataTable(storedProcName, $"EXEC [dbo].[HRM_Branch_Search] @p_company_code = '{input.company_code}',@p_name = '',@p_code = '{reportInfo.Rows[0]["branch_code_default"].ToString()}'");

                if (myDataSet.Tables.Count > 1)
                {

                }
                else
                {
                    DataSet newDataSet = new DataSet();
                    DataTable newDataTable;
                    int i = 0;
                    for (; i < myDataSet.Tables.Count; i++)
                    {
                        newDataTable = myDataSet.Tables[i].Clone();
                        newDataTable.TableName = storedProcName + i.ToString();
                        foreach (DataRow row in myDataSet.Tables[i].Rows)
                        {
                            DataRow newrow = newDataTable.NewRow();
                            foreach (var col in myDataSet.Tables[i].Columns)
                            {
                                newrow[col.ToString()] = row[col.ToString()];
                            }
                            newDataTable.Rows.Add(newrow);
                        }
                        newDataSet.Tables.Add(newDataTable);
                    }

                    newDataTable = HRM_Branch.Clone();
                    newDataTable.TableName = storedProcName + i.ToString();

                    foreach (DataRow row in HRM_Branch.Rows)
                    {
                        DataRow newrow = newDataTable.NewRow();
                        foreach (var col in HRM_Branch.Columns)
                        {
                            newrow[col.ToString()] = row[col.ToString()];
                        }
                        newDataTable.Rows.Add(newrow);
                    }
                    newDataSet.Tables.Add(newDataTable);
                    myDataSet = newDataSet;
                }
            }
            DataTable branch = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Branch_Search", $"EXEC HRM_Branch_Search @p_company_code = '{input.company_code}',@p_code = '',@p_name = ''");

            string company_symbol = branch.Rows[0]["company_symbol"].ToString();

            //check logo
            try
            {
                if (reportInfo.Rows[0]["is_logo"].ToString() == "True")
                {
                    if (is_reference)
                    {
                        string colName = reportInfo.Rows[0]["column_logo"].ToString();

                        for (int i = 0; i < myDataSet.Tables.Count; i++)
                        {
                            string url = "";
                            string logo = "";
                            foreach (var col in myDataSet.Tables[i].Columns)
                            {
                                if (col.ToString() == colName)
                                {
                                    url = myDataSet.Tables[i].Rows[0][colName].ToString();
                                    logo = FileManagerController.GetImageBase64(FileManagerController.AppDirectory.Replace("\\", "/") + url);
                                    break;
                                }
                            }
                            if (!string.IsNullOrEmpty(url) && !string.IsNullOrEmpty(logo))
                                myDataSet.Tables[i].Rows[0][colName] = logo;
                        }
                    }
                    else
                    {
                        string colName = reportInfo.Rows[0]["column_logo"].ToString();
                        string url = myDataSet.Tables[0].Rows[0][colName].ToString();
                        string logo = FileManagerController.GetImageBase64(FileManagerController.AppDirectory.Replace("\\", "/") + url);
                        myDataSet.Tables[0].Rows[0][colName] = logo;
                    }

                }
            }
            catch { }

            byte[] data = ReportManagementController.RenderReport(input.company_code, input.company_code, input.voucher_code, myDataSet, reportInfo.Rows[0]["report_name"].ToString(), company_symbol, input.type, is_reference, reportInfo.Rows[0]["reference"].ToString(), storedProcName);

            return File(data, "application/octet-stream", reportInfo.Rows[0]["report_name"].ToString().Replace("rdlc",input.type));
        }
        [TokenAuthenticationFilter]
        public IActionResult Preview(ParamPreviewModel input)
        {
            DataSet myDataSet = new DataSet();
            List<Tuple<string, string>> tuplesRequest = new List<Tuple<string, string>>();
            tuplesRequest.Add(new Tuple<string, string>("p_voucher_code", input.voucher_code));
            tuplesRequest.Add(new Tuple<string, string>("p_master_code", input.master_code));
            tuplesRequest.Add(new Tuple<string, string>("p_voucher_no", input.voucher_no));
            tuplesRequest.Add(new Tuple<string, string>("p_company_code", input.company_code));
            tuplesRequest.Add(new Tuple<string, string>("p_voucher_year", input.voucher_year.ToString()));
      
            //if (input.id != null)
            //    tuplesRequest.Add(new Tuple<string, string>("p_id", input.id.ToString()));
            //if (input.language_id != null)
            //    tuplesRequest.Add(new Tuple<string, string>("p_language_id", input.language_id.ToString()));
            //if (input.code != null)
            //    tuplesRequest.Add(new Tuple<string, string>("p_code", input.code.ToString()));
            //if (input.voucher_date != null)
            //    tuplesRequest.Add(new Tuple<string, string>("p_voucher_date", input.voucher_date.ToString()));
            //if (input.voucher_date_start != null)
            //    tuplesRequest.Add(new Tuple<string, string>("p_voucher_date_start", input.voucher_date_start.ToString()));
            //if (input.voucher_date_end != null)
            //    tuplesRequest.Add(new Tuple<string, string>("p_voucher_date_end", input.voucher_date_end.ToString()));
            //if (input.date_add != null)
            //    tuplesRequest.Add(new Tuple<string, string>("p_date_add", input.date_add.ToString()));
            //if (input.date_modified != null)
            //    tuplesRequest.Add(new Tuple<string, string>("p_date_modified", input.date_modified.ToString()));
            //if (input.account != null)
            //    tuplesRequest.Add(new Tuple<string, string>("p_account", input.account.ToString()));
            //if (input.account_code_add != null)
            //    tuplesRequest.Add(new Tuple<string, string>("p_account_code_add", input.account_code_add.ToString()));
            //if (input.account_code_modified != null)
            //    tuplesRequest.Add(new Tuple<string, string>("p_account_code_modified", input.account_code_modified.ToString()));


            DataTable reportInfo = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "SYS_Report_Infomation_Search", $"EXEC SYS_Report_Infomation_Search @p_company_code = '{input.company_code}',@p_code = '{input.report_code}'");

            string storedProcName = ""; bool is_reference = false, is_branch = false;
            try
            {
                is_reference = bool.Parse(reportInfo.Rows[0]["is_reference"].ToString());
            }
            catch { }
            try
            {
                is_branch = bool.Parse(reportInfo.Rows[0]["is_branch"].ToString());
            }
            catch { }
            if (is_reference)
            {
                storedProcName = reportInfo.Rows[0]["reference"].ToString();
                ManagementController.GetParamTupleStored(ConnectController.GetConnectStringByKey("HRM"), storedProcName, input, ref tuplesRequest);
                myDataSet = ManagementController.GetListTable(ConnectController.GetConnectStringByKey("HRM"), storedProcName, tuplesRequest);
            }
            else
            {
                myDataSet = ManagementController.GetListTable(ConnectController.GetConnectStringByKey("HRM"), "SYS_Report_Print_Search", tuplesRequest);
            }
            if(is_branch == true)
            {
                DataTable HRM_Branch =  ManagementController.GetDataTable(storedProcName, $"EXEC [dbo].[HRM_Branch_Search] @p_company_code = '{input.company_code}',@p_name = '',@p_code = '{reportInfo.Rows[0]["branch_code_default"].ToString()}'");

                if (myDataSet.Tables.Count > 1)
                {
                    
                }
                else
                {
                    DataSet newDataSet = new DataSet();
                    DataTable newDataTable;
                    int i = 0;
                    for (; i < myDataSet.Tables.Count; i++)
                    {
                        newDataTable = myDataSet.Tables[i].Clone();
                        newDataTable.TableName = storedProcName + i.ToString();
                        foreach (DataRow row in myDataSet.Tables[i].Rows)
                        {
                            DataRow newrow = newDataTable.NewRow();
                            foreach (var col in myDataSet.Tables[i].Columns)
                            {
                                newrow[col.ToString()] = row[col.ToString()];
                            }
                            newDataTable.Rows.Add(newrow);
                        }
                        newDataSet.Tables.Add(newDataTable);
                    }

                    newDataTable = HRM_Branch.Clone();
                    newDataTable.TableName = storedProcName + i.ToString();

                    foreach (DataRow row in HRM_Branch.Rows)
                    {
                        DataRow newrow = newDataTable.NewRow();
                        foreach (var col in HRM_Branch.Columns)
                        {
                            newrow[col.ToString()] = row[col.ToString()];
                        }
                        newDataTable.Rows.Add(newrow);
                    }
                    newDataSet.Tables.Add(newDataTable);
                    myDataSet = newDataSet;
                }
            }

            DataTable branch = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Branch_Search", $"EXEC HRM_Branch_Search @p_company_code = '{input.company_code}',@p_code = '',@p_name = ''");

            string company_symbol = branch.Rows[0]["company_symbol"].ToString();

            //check logo
            try
            {
                if(reportInfo.Rows[0]["is_logo"].ToString() == "True")
                {
                    if (is_reference)
                    {
                        string colName = reportInfo.Rows[0]["column_logo"].ToString();

                        for (int i = 0; i < myDataSet.Tables.Count; i++)
                        {
                            string url = "";
                            string logo = "";
                            foreach (var col in myDataSet.Tables[i].Columns)
                            {
                                if(col.ToString() == colName)
                                {
                                    url = myDataSet.Tables[i].Rows[0][colName].ToString();
                                    logo = FileManagerController.GetImageBase64(FileManagerController.AppDirectory.Replace("\\", "/") + url);
                                    break;
                                }
                            }
                            if(!string.IsNullOrEmpty(url) && !string.IsNullOrEmpty(logo))
                                myDataSet.Tables[i].Rows[0][colName] = logo;
                        }
                    }
                    else
                    {
                        string colName = reportInfo.Rows[0]["column_logo"].ToString();
                        string url = myDataSet.Tables[0].Rows[0][colName].ToString();
                        string logo = FileManagerController.GetImageBase64(FileManagerController.AppDirectory.Replace("\\", "/") + url);
                        myDataSet.Tables[0].Rows[0][colName] = logo;
                    }

                }
            }
            catch { }

            byte[] data = ReportManagementController.RenderReport(input.company_code, input.company_code, input.voucher_code, myDataSet, reportInfo.Rows[0]["report_name"].ToString(), company_symbol, "PDF", is_reference, reportInfo.Rows[0]["reference"].ToString(), storedProcName);

            var viewModel = new FilePreviewViewModel
            {
                FileData = data
            };

            return View(viewModel);
        }
        public IActionResult PreviewPDF(byte[] data)
        {
            // Assuming pdfBytes is your byte array containing the PDF content
            byte[] pdfBytes = data; // Replace this with your own logic to get the byte array

            // Return the PDF as a file
            return File(pdfBytes, "application/pdf");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
