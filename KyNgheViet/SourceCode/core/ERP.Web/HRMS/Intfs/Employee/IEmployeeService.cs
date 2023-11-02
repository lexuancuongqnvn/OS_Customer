using HRMS.Intfs.Employee.Dto;
using HRMS.Intfs.TimeSheet.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Intfs.Employee
{
    public interface IEmployeeService
    {
        Task<List<Employee_Positions_ENTITY>> Employee_Positions_Search(Employee_Positions_ENTITY input);
        Task<List<HRM_Employee_ENTITY>> HRM_Employee_Search(HRM_Employee_ENTITY input);
        Task<List<HRM_District_City_ENTITY>> HRM_District_City_Search(HRM_District_City_ENTITY input);
        Task<List<HRM_Employee_Certificate_ENTITY>> HRM_Employee_Certificate_Search(HRM_Employee_Certificate_ENTITY input);
        Task<List<HRM_Employee_Academic_Level_ENTITY>> HRM_Employee_Academic_Level_Search(HRM_Employee_Academic_Level_ENTITY input);
        Task<List<Part_ENTITY>> Part_Search(Part_ENTITY input);
        Task<List<HRM_Employee_Marital_Status_ENTITY>> HRM_Employee_Marital_Status_Search(HRM_Employee_Marital_Status_ENTITY input);
        Task<List<HRM_Employee_Labour_Contract_Type_ENTITY>> HRM_Employee_Labour_Contract_Type_Search(HRM_Employee_Labour_Contract_Type_ENTITY input);
        Task<IDictionary<string, object>> HRM_Employee_Update(HRM_Employee_ENTITY input);
        Task<HRM_Employee_ENTITY> HRM_Employee_Insert(HRM_Employee_ENTITY input);
        Task<IDictionary<string, object>> HRM_Employee_Delete(string code, string user_login);
        
        Task<List<HRM_Employee_Labour_Contract_ENTITY>> HRM_Employee_Labour_Contract_Search(HRM_Employee_Labour_Contract_ENTITY input);
        Task<List<HRM_Employee_Labour_Contract_Appendix_ENTITY>> HRM_Employee_Labour_Contract_Appendix_Search(HRM_Employee_Labour_Contract_Appendix_ENTITY input);
        Task<List<HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY>> HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Search(HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY input);
        Task<List<HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY>> HRM_Employee_Labour_Contract_Appendix_Target_Detail_Search(HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY input);
        Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Appendix_Target_Detail_Insert(HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY input);
        Task<List<HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY>> HRM_Employee_Labour_Contract_Salary_Deduction_Search(HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY input);
        Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Appendix_Target_Update(HRM_Employee_Labour_Contract_Appendix_ENTITY input);
        Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Update(HRM_Employee_Labour_Contract_ENTITY input);
        Task<List<HRM_Employee_Labour_Contract_Salary_ENTITY>> HRM_Employee_Labour_Contract_Salary_Search(HRM_Employee_Labour_Contract_Salary_ENTITY input);
        Task<List<HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY>> HRM_Employee_Labour_Contract_Curriculum_Vitae_Search(HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY input);
        Task<List<HRM_Employee_Labour_Contract_ENTITY>> HRM_Employee_Labour_Contract_Update(HRM_Employee_Labour_Contract_ENTITY input);
        Task<HRM_Employee_Labour_Contract_ENTITY> HRM_Employee_Labour_Contract_Insert(HRM_Employee_Labour_Contract_ENTITY input);
        Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Delete(string code, string user_login);
        Task<List<HRM_Employee_ENTITY>> HRM_Employee_Work_Procedure_Search(HRM_Employee_ENTITY input);
        Task<List<HRM_Employee_Bonus_ENTITY>> HRM_Employee_Bonus_Search(HRM_Employee_Bonus_ENTITY input);
        Task<List<HRM_Employee_Discipline_ENTITY>> HRM_Employee_Discipline_Search(HRM_Employee_Discipline_ENTITY input);
        Task<List<HRM_Employee_Training_ENTITY>> HRM_Employee_Training_Search(HRM_Employee_Training_ENTITY input);
        Task<List<HRM_Employee_Evaluate_ENTITY>> HRM_Employee_Evaluate_Search(HRM_Employee_Evaluate_ENTITY input);
        Task<List<HRM_Employee_Occupational_Accident_ENTITY>> HRM_Employee_Occupational_Accident_Search(HRM_Employee_Occupational_Accident_ENTITY input);
        Task<HRM_Employee_ENTITY> HRM_Employee_Work_Procedure_Update(HRM_Employee_ENTITY input);
        Task<IDictionary<string, object>> HRM_Employee_Work_Procedure_Insert(HRM_Employee_ENTITY input);
        Task<IDictionary<string, object>> HRM_Employee_Work_Procedure_Delete(string code, string user_login);
        Task<List<HRM_Employee_Check_In_Out_ENTITY>> HRM_Employee_Check_In_Out_Search(HRM_Employee_Check_In_Out_ENTITY input);
        Task<List<HRM_Employee_Check_In_Out_ENTITY>> HRM_Employee_Timesheet_Search(HRM_Employee_Check_In_Out_ENTITY input);
        Task<List<HRM_Employee_Check_In_Out_Image_Training_ENTITY>> HRM_Employee_Check_In_Out_Face_Training_Search(HRM_Employee_Check_In_Out_Image_Training_ENTITY input);
        Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Insert(HRM_Employee_Check_In_Out_ENTITY input);
        Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Update(HRM_Employee_Check_In_Out_ENTITY input);
        Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Warning_Actions(string xml_data, string type);
        Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Face_Training_Update(FaceInfoFaceTrainingUpdate input);
    }
}
