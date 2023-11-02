using HRMS.Intfs.TimeSheet.Dto;
using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_ENTITY
    {
        public int? ID { get; set; }
        public int? status { get; set; }
        public string message { get; set; }
        public string company_code { get; set; }
        public string ref_code { get; set; }
        public string id_employee { get; set; }//Mã số nhân viên
        public string marital_status_code { get; set; }//Tình trạng hôn nhân
        public string marital_status_name { get; set; }//Tình trạng hôn nhân
        public string sex_code { get; set; }//Giới tính
        public string sex_name { get; set; }//Giới tính
        public string department_code { get; set; }
        public string department_name { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string fullName { get; set; }
        public string text { get; set; }
        public string phone { get; set; }
        public string user_login { get; set; }

        public string address_detail { get; set; }//Số nhà thường trú
        public string address_sub_district_code { get; set; }//Nơi sinh phường/ xã
        public string address_sub_district_name { get; set; }//Nơi sinh phường/ xã
        public string address_district_code { get; set; }//Nơi sinh quận/huyện
        public string address_district_name { get; set; }//Nơi sinh quận/huyện
        public string address_city_code { get; set; }//Nơi sinh tỉnh/ thành phố
        public string address_city_name { get; set; }//Nơi sinh tỉnh/ thành phố
        public string address_current_detail { get; set; }//Số nhà tạm trú
        public string address_current_sub_district_code { get; set; }//tạm trú phường/ xã
        public string address_current_sub_district_name { get; set; }//tạm trú phường/ xã
        public string address_current_district_code { get; set; }//tạm trú quận/huyện
        public string address_current_district_name { get; set; }//tạm trú quận/huyện
        public string address_current_city_code { get; set; }//tạm trú tỉnh/ thành phố
        public string address_current_city_name { get; set; }//tạm trú tỉnh/ thành phố
        public string social_insurance_number { get; set; }//số bảo hiểm xã hội
        public DateTime? date_insurance_number { get; set; }//bảo hiểm xã hội tham gia từ
        public string from_insurance_number { get; set; }//bảo hiểm xã hội nơi tham gia
        public string fax { get; set; }//fax
        public string tax { get; set; }//tax
        public string bank_account_number { get; set; }//Tài khoản ngân hàng
        public string bank_name { get; set; }//Tên ngân hàng

        public string nation { get; set; }//Dân tộc
        public string religion { get; set; }//Tôn giáo
        public DateTime? date_joining_company_union { get; set; }//Ngày gia nhập công đoàn công ty
        public string date_joining_company_union_f { get; set; }//Ngày gia nhập công đoàn công ty
        public DateTime? date_joining_communist_party { get; set; }//Ngày gia nhập đảng cộng sản
        public string date_joining_communist_party_f { get; set; }//Ngày gia nhập đảng cộng sản

        public string uniform_size { get; set; }//Size áo đồng phục
        public string shoes_size { get; set; }//Size giày đồng phục
        public string trousers_size { get; set; }//Size quần đồng phục
        public string avarta { get; set; }
        public string avarta_html { get; set; }
        public string avarta_base64 { get; set; }
        public string avarta_base64_256x256 { get; set; }
        public string id_card { get; set; }//CMND
        public DateTime? date_create_card { get; set; }//Ngày cấp
        public string from_create_card { get; set; }//nơi cấp
        public string cccd { get; set; }//CCCD
        public DateTime? date_create_cccd { get; set; }//Ngày cấp CCCD
        public string from_create_cccd { get; set; }//Nơi cấp CCCD
        public DateTime? birthday { get; set; }
        public string birthday_f { get; set; }
        public string title_code { get; set; }
        public string title_name { get; set; }
        public string position_code { get; set; }
        public string position_name { get; set; }
        public string branch_code { get; set; }
        public string branch_name { get; set; }
        public string email { get; set; }//Cá nhân
        public string email_company { get; set; }//công ty
        public decimal? working_hour_on_month { get; set; }
        public string code { get; set; }
        public string employee_code { get; set; }
        public string employee_name { get; set; }
        public bool? approve { get; set; }
        public bool? active { get; set; }
        public string active_name { get; set; }
        public DateTime? date_add { get; set; }
        public DateTime? date_edit { get; set; }
        public DateTime? filter_date { get; set; }
        public string notes { get; set; }
        public string sub_sign_title_name { get; set; }
        public string type { get; set; }

        public string birthplace_detail { get; set; }//Số nhà thường trú
        public string birthplace_sub_district_code { get; set; }//Nơi sinh phường/ xã
        public string birthplace_sub_district_name { get; set; }//Nơi sinh phường/ xã
        public string birthplace_district_code { get; set; }//Nơi sinh quận/huyện
        public string birthplace_district_name { get; set; }//Nơi sinh quận/huyện
        public string birthplace_city_code { get; set; }//Nơi sinh tỉnh/ thành phố
        public string birthplace_city_name { get; set; }//Nơi sinh tỉnh/ thành phố
        public string part_code { get; set; }
        public string part_name { get; set; }
        public DateTime? date_join_company { get; set; }
        public string date_join_company_f { get; set; }
        public DateTime? date_quit_company { get; set; }
        public string date_quit_company_f { get; set; }
        public decimal? work_day { get; set; }
        public decimal? salary { get; set; }

        public int? level { get; set; }
        public bool? is_show_list_employee { get; set; }
        public string group_account_code { get; set; }
        public string tbName { get; set; } 
        public string work_shifts { get; set; }
        public string signature { get; set; }
        public string xml_academic { get; set; }
        public string xml_certificates { get; set; }
        public string xml_bonus { get; set; }
        public string xml_discipline { get; set; }
        public string xml_training { get; set; }
        public string xml_evaluate { get; set; }
        public string xml_occupational_accident { get; set; }
        public List<AllDayModel> allDay { get; set; }
        public List<HRM_TimeSheet_Work_Shift_ENTITY> hRM_TimeSheet_Work_Shifts { get; set; }
        public List<HRM_Employee_Academic_Level_ENTITY> hRM_Employee_Academic_Levels { get; set; }
        public List<HRM_Employee_Certificate_ENTITY> hRM_Employee_Certificates { get; set; }
        public List<HRM_Employee_Labour_Contract_ENTITY> hRM_Employee_Labour_Contracts { get; set; }
        public List<HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY> hRM_Employee_Labour_Contract_Curriculum_Vitaes { get; set; }//thông tin hộ gia đình
        public List<HRM_Employee_Bonus_ENTITY> hRM_Employee_Bonus { get; set; }//Quá trình khen thưởng
        public List<HRM_Employee_Discipline_ENTITY> hRM_Employee_Discipline { get; set; }//Quá trình phạt
        public List<HRM_Employee_Training_ENTITY> hRM_Employee_Training { get; set; }//Quá trình đào tạo
        public List<HRM_Employee_Evaluate_ENTITY> hRM_Employee_Evaluates { get; set; }//Quá trình đánh giá
        public List<HRM_Employee_Occupational_Accident_ENTITY> hRM_Employee_Occupational_Accidents { get; set; }//Quá trình tai nạn lao động
        public List<HRM_Employee_Check_In_Out_ENTITY> hRM_Employee_Check_In_Outs { get; set; }
    }
}
