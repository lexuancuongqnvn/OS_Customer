using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Common.Models.Report
{
    public class ReportModel
    {
        public int id { get; set; }
        public string code { get; set; }
        public string employee_code { get; set; }
        public string type_file { get; set; }
        public string path_files { get; set; }
        public int? status { get; set; }
        public string message { get; set; }
    }
}
