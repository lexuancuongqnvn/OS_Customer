using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stimulsoft.Report;
using Stimulsoft.Report.Dictionary;
using Stimulsoft.Report.Mvc;
using Stimulsoft.Report.Web;
using System.IO;
using Microsoft.Reporting.NETCore;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Report
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReportViewerController : ControllerBase
    {
        public static readonly string AppDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        [HttpPost]
        [Route("api/getFile")]
        public virtual async Task<FileContentResult> GetFile()
        {
            var filePath = "path_to_your_file";
            byte[] fileBytes = GenerateReport();
            return File(fileBytes, "application/octet-stream");
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public byte[] GenerateReport(string type = ".pdf")
        {
            using var report = new LocalReport();
            //report.EnableHyperlinks = true;

            //string linksignoff = "";
            //decimal kl_sx = 0;
            //var parameters = new[] {
            //        new ReportParameter("linksignoff", linksignoff),
            //        new ReportParameter("kl_sx", kl_sx.ToString())
            //    };
            string reportName = "Template";
            report.ReportPath = $"{AppDirectory}\\Reports\\ERP\\{reportName.Trim()}.rdlc";
            //report.SetParameters(parameters);
            string format = "PDF";
            if (type == ".xls") format = "Excel";
            else if (type == ".doc")
            {
                return report.Render("PDF");
            }
            return report.Render(format);
        }
        
    }
}
