using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Warranty.Intfs.Laptop.Dto
{
    public class Warranty_Laptop_Print_History_ENTITY
    {
        public int ID { get; set; }
        public string doc_code { get; set; }
        public DateTime? datetime_print { get; set; }
        public string datetime_print_f { get; set; }
        public string account_print { get; set; }
        public string account_print_name { get; set; }
        public string banch_print { get; set; }
        public string branch_name { get; set; }
        public string banch_print_name { get; set; }
        public string link_file_print { get; set; }
        public string warranty_type { get; set; }
        public string warranty_type_name { get; set; }
    }
}
