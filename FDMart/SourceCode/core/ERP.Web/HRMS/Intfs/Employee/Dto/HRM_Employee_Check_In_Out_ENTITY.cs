using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Check_In_Out_ENTITY
    {
        public int ID { get; set; }
        public string code { get; set; }
        public string title { get; set; }
        public string dates { get; set; }
        public string check_in { get; set; }
        public Boolean? is_check_in { get; set; }
        public string check_out { get; set; }
        public string username { get; set; }
        public Boolean? is_check_out { get; set; }
        public string employee_code { get; set; }
        public int? status_checkin { get; set; }
        public int? status { get; set; }
        public string message { get; set; }
        public string message_checkin { get; set; }
        public double? result_checkin { get; set; }
        public Boolean? is_ready_checkin { get; set; }

        public string device_id { get; set; }
        public string machine_id { get; set; }
        public string machine_employee_id { get; set; }
        public string base64 { get; set; }
        public string branch_code { get; set; }
        public string branch_name_in { get; set; }
        public string branch_name_out { get; set; }
        public string branch_address_in { get; set; }
        public string branch_address_out { get; set; }
        public string type { get; set; }
        public int? _day { get; set; }
        public int? soon { get; set; }
        public int? late { get; set; }
        public string link_image { get; set; }
        public decimal? latitude { get; set; }
        public decimal? longitude { get; set; }
        public DateTime? check_time { get; set; }
        public DateTime? filter_date { get; set; }
        public decimal? work_hour { get; set; }
        public decimal? work_unit { get; set; }
        public decimal? work_hour_total { get; set; }
        public decimal? work_day_total { get; set; }
        public string path { get; set; }
        public double? percent_success { get; set; }
        public DateTime? date_check_in { get; set; }
        public DateTime? date_check_out { get; set; }
        public string link_image_in { get; set; }
        public string link_image_out { get; set; }
        public int? stt  { get; set; }
        public int? max_dif_face { get; set; }
        public DateTime? check_in_time { get; set; }
        public string check_in_time_f { get; set; }
        public DateTime? check_out_time { get; set; }
        public string check_out_time_f { get; set; }
        public string work_shift_code { get; set; }
        public string work_shift_name_in { get; set; }
        public string work_shift_name_out { get; set; }
        public decimal? latitude_in { get; set; }
        public decimal? longitude_in { get; set; }
        public decimal? latitude_out { get; set; }
        public decimal? longitude_out { get; set; }
        public DateTime? datetime_in_week { get; set; }
        public string date_name_en_in_week { get; set; }
        public string date_name_vn_in_week { get; set; }
        public decimal? age { get; set; }
        public decimal? gender_probability { get; set; }
        public string gender { get; set; }
        public string requestUri { get; set; }
        public HRM_Employee_Check_In_Out_Image_Training_ENTITY hRM_Employee_Check_In_Out_Image_Trainings { get; set; }
    }
}
