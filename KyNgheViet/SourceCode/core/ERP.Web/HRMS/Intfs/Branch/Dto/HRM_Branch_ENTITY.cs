using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Branch.Dto
{
    public class HRM_Branch_ENTITY
    {
        public int id { get; set; }
        public string code { get; set; }
        public string company_code { get; set; }
        public string name { get; set; }
        public string name1 { get; set; }
        public string name2 { get; set; }
        public string Address { get; set; }
        public string type { get; set; }
        public string url_logo { get; set; }
        public decimal? Lat { get; set; }
        public decimal? Long { get; set; }
        public int? distance { get; set; }
        public int? max_dif_face { get; set; }
        public bool? is_mo { get; set; }
        public DateTime? from_mo { get; set; }
        public DateTime? to_mo { get; set; }
        public bool? is_tu { get; set; }
        public DateTime? from_tu { get; set; }
        public DateTime? to_tu { get; set; }
        public bool? is_we { get; set; }
        public DateTime? from_we { get; set; }
        public DateTime? to_we { get; set; }
        public bool? is_th { get; set; }
        public DateTime? from_th  { get; set; }
        public DateTime? to_th { get; set; }
        public bool? is_fr { get; set; }
        public DateTime? from_fr { get; set; }
        public DateTime? to_fr { get; set; }
        public bool? is_sa { get; set; }
        public DateTime? from_sa { get; set; }
        public DateTime? to_sa { get; set; }
        public bool? is_su { get; set; }
        public DateTime? from_su { get; set; }
        public DateTime? to_su { get; set; }

    }
}
