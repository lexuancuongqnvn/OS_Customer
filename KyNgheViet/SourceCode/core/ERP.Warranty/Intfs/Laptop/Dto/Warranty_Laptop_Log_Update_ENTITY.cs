using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Warranty.Intfs.Laptop.Dto
{
    public class Warranty_Laptop_Log_Update_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string task_code { get; set; }
        public string doc_number { get; set; }
        public DateTime? doc_date { get; set; }
        public string doc_date_f { get; set; }
        public string customer_name { get; set; }
        public string customer_address { get; set; }
        public string customer_email { get; set; }
        public string customer_phone { get; set; }
        public string des_model { get; set; }
        public string des_cpu { get; set; }
        public int? des_ram { get; set; }
        public string des_ram_f { get; set; }
        public int? des_hdd { get; set; }
        public string des_hdd_unit { get; set; }
        public string des_hdd_unit_f { get; set; }
        public string des_hdd_f { get; set; }
        public int? des_ssd { get; set; }
        public string des_ssd_unit { get; set; }
        public string des_ssd_unit_f { get; set; }
        public string des_ssd_f { get; set; }
        public bool? des_is_battery { get; set; }
        public string des_is_battery_f { get; set; }
        public bool? des_is_charger { get; set; }
        public string des_is_charger_f { get; set; }
        public string des_notes { get; set; }
        public string des_sevice_tag { get; set; }
        public string des_password { get; set; }
        public string des_password_bios { get; set; }
        public string machine_status { get; set; }
        public DateTime? sell_date { get; set; }
        public string sell_date_f { get; set; }
        public string warranty_type { get; set; }
        public DateTime? customer_return_date { get; set; }
        public string customer_return_date_f { get; set; }
        public string customer_notes { get; set; }
        public string accounting_notes { get; set; }
        public string type { get; set; }
        public string des_lcd { get; set; }
        public DateTime? log_date_modified { get; set; }
        public string log_date_modified_f { get; set; }
        public string log_account_modified { get; set; }
        public string log_account_modified_name { get; set; }
    }
}
