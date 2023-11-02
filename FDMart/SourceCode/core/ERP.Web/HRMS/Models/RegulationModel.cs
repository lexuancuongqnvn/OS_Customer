using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Models
{
    public class RegulationModel
    {
        public string type { get; set; }
        public decimal time { get; set; }
        public int times { get; set; }
        public decimal work_day_minus { get; set; }
        public int count { get; set; }
        public string log { get; set; }
        public List<ListDateSoonLate> list_date_soon_lates { get; set; }
        public string date_soon_late_string { get; set; }
    }
    public class ListDateSoonLate
    {
        public DateTime date { get; set; }
        public decimal work_day { get; set; }
        public int minute_request { get; set; }
    }
}
