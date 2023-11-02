using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Intfs.Employee.Dto
{
    public class HRM_Employee_Check_In_Out_Image_Training_ENTITY
    {
        public string left { get; set; }
        public FaceInfo face_info_left { get; set; }
        public string right { get; set; }
        public FaceInfo face_info_right { get; set; }
        public string center { get; set; }
        public FaceInfo face_info_center { get; set; }
        public string bottom { get; set; }
        public FaceInfo face_info_bottom { get; set; }
        public string top { get; set; }
        public FaceInfo face_info_top { get; set; }
        public string left_base64 { get; set; }
        public string right_base64 { get; set; }
        public string center_base64 { get; set; }
        public string bottom_base64 { get; set; }
        public string top_base64 { get; set; }
        public string employee_code { get; set; }
        public decimal? img_left_age { get; set; }
        public decimal? img_right_age { get; set; }
        public decimal? img_top_age { get; set; }
        public decimal? img_bottom_age { get; set; }
        public decimal? min_age { get; set; }
        public decimal? max_age { get; set; }
        public string gender { get; set; }
    }
    public class FaceInfo
    {
        public decimal? age { get; set; }
        public decimal? gender_probability { get; set; }
        public string gender { get; set; }
    }
    public class FaceInfoFaceTrainingUpdate
    {
        public decimal? img_left_age { get; set; }
        public string img_left_gender { get; set; }
        public decimal? img_right_age { get; set; }
        public string img_right_gender { get; set; }
        public decimal? img_top_age { get; set; }
        public string img_top_gender { get; set; }
        public decimal? img_bottom_age { get; set; }
        public string img_bottom_gender { get; set; }
        public decimal? img_left_gender_probability { get; set; }
        public decimal? img_right_gender_probability { get; set; }
        public decimal? img_top_gender_probability { get; set; }
        public decimal? img_bottom_gender_probability { get; set; }
        public string employee_code { get; set; }
    }
}
