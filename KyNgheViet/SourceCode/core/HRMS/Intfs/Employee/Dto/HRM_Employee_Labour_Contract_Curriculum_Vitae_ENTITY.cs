using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string contract_code { get; set; }
        public string fullname { get; set; }
        public string relationship { get; set; }
        public string id_card { get; set; }
        public string birth_certificate_number { get; set; }
        public string birthplace_district_sub { get; set; }
        public string birthplace_district { get; set; }
        public string birthplace_city { get; set; }
        public string birthplace_detail { get; set; }
        public string phone { get; set; }
        public string tax { get; set; }
        public DateTime? birthday { get; set; }
        public DateTime? registering_dependents_from { get; set; }
        public DateTime? registering_dependents_end { get; set; }

    }
}
