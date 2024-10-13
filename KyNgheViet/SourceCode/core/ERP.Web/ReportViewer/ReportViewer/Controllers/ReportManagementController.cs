using Microsoft.AspNetCore.Mvc;
using Microsoft.Reporting.NETCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace ReportViewer.Controllers
{

    public class ReportManagementController : Controller
    {

        public static byte[] RenderReport(string customer_code, string company_code, string voucher_code,DataSet dataSet,string report_name,string company_symbol , string format = "PDF", bool is_reference = false,string reference = "",string storedProcName = "")
        {
            try
            {
                string filePath = Path.Combine(Directory.GetCurrentDirectory(), $"~\\Reports\\Template\\{company_symbol}\\{company_code}\\{report_name}").Replace("\\~", "");

                using var report = new LocalReport();
                //report.SetParameters(new ReportParameter { Name:""});
                if (is_reference)
                {
                    for(int i = 0; i < dataSet.Tables.Count; i++)
                        report.DataSources.Add(new ReportDataSource(storedProcName+i.ToString(), dataSet.Tables[i]));
                }
                else
                {
                    for (int i = 0; i < dataSet.Tables.Count; i++)
                    {
                        if (i == 0)
                            report.DataSources.Add(new ReportDataSource(voucher_code, dataSet.Tables["SYS_Report_Print_Search"]));
                        else
                            report.DataSources.Add(new ReportDataSource(voucher_code + i.ToString(), dataSet.Tables["SYS_Report_Print_Search" + i.ToString()]));
                    }
                }
               
                report.ReportPath = filePath;
              
                return report.Render(format);
            }
            catch(Exception ex)
            {
                return null;
            }
        }
       
    }
}
