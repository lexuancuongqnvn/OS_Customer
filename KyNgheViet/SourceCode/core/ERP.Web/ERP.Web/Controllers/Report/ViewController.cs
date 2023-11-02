using Microsoft.AspNetCore.Mvc;
using Stimulsoft.Report;
using Stimulsoft.Report.Mvc;

namespace ERP.Web.Controllers.Report
{
    public class ViewController : Controller
    {
        // GET: View
        public IActionResult Reports()
        {
            return View();
        }

        public IActionResult GetReport(string id = "SimpleList")
        {
            // Create the report object
            var report = new StiReport();

            report.Load(StiNetCoreHelper.MapPath(this, "/Reports/" + id + ".mrt"));

            return StiNetCoreViewer.GetReportResult(this, report);
        }

        public IActionResult ViewerEvent()
        {
            return StiNetCoreViewer.ViewerEventResult(this);
        }

        public IActionResult Design(string id)
        {
            return RedirectToAction("Reports", "Design", new { id });
        }
    }
}
