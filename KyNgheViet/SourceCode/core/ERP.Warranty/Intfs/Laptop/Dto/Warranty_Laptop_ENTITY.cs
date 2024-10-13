using HRMS.Intfs.ProjectManagement.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace ERP.Warranty.Intfs.Laptop.Dto
{
    public class Warranty_Laptop_ENTITY
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
        public int? des_hdd { get; set; }
        public string des_hdd_unit { get; set; }
        public int? des_ssd { get; set; }
        public string des_ssd_unit { get; set; }
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
        public DateTime? customer_return_date { get; set; }
        public string customer_return_date_f { get; set; }
        public string customer_notes { get; set; }
        public string warranty_type { get; set; }
        public string accounting_notes { get; set; }
        public string in_task { get; set; }
        public string branch_name { get; set; }
        public string branch_code { get; set; }
        public Double? hour_done { get; set; }
        public string topic_code { get; set; }
        public string move_from_account { get; set; }
        public string move_to_account { get; set; }
        public string account_move_name { get; set; }
        public string executor_name { get; set; }
        public Double? account_move_hour_done { get; set; }
        public string account_move_logtime_description { get; set; }
        public string topic_name { get; set; }
        public string user_login { get; set; }
        public string task_content { get; set; }
        public string date_add_f { get; set; }
        public string logtime_description { get; set; }
        public string type { get; set; }
        public string doc_number_guess { get; set; }
        public string path { get; set; }
        public string type_name { get; set; }
        public int? drop_index { get; set; }
        public int? value_index { get; set; }
        public string des_lcd { get; set; }
        public string department_followers { get; set; }
        public string employee_code { get; set; }
        public string expiry_task_name { get; set; }
        public string expiry_task_name_s { get; set; }
        public string name { get; set; }
        public string template_report { get; set; }
        public string customer_name_contact_phone { get; set; }
        public bool? is_done { get; set; }
        public DateTime? doc_date_from { get; set; }
        public DateTime? doc_date_to { get; set; }
        public string sku { get; set; }
        public string account_code_add { get; set; }
        public string account_code_modified { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_modified { get; set; }
        public string move_warehouse_from { get; set; }
        public string move_warehouse_to { get; set; }
        public string warehouse_code { get; set; }
        public string company_code { get; set; }
        public string goods_name { get; set; }
        public string voucher_no { set; get; }
        public string goods_symbol { set; get; }
        public int? voucher_year { set; get; }
        public int? language_id { get; set; }
        public bool? is_import_goods { get; set; }
        public HRM_Project_Management_Task_ENTITY hRM_Project_Management_Task { get; set; }
    }
}
