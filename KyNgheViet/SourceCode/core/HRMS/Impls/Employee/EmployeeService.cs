using ERP.Common.Controllers;
using HRMS.Intfs.Employee;
using HRMS.Intfs.Employee.Dto;
using HRMS.Intfs.TimeSheet.Dto;
using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace HRMS.Impls.Employee
{
    public class EmployeeService : IEmployeeService
    {
        public async Task<List<Employee_Positions_ENTITY>> Employee_Positions_Search(Employee_Positions_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<Employee_Positions_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Positions_Search, input);
            return result;
        }

        public async Task<List<HRM_District_City_ENTITY>> HRM_District_City_Search(HRM_District_City_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_District_City_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_District_City_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Academic_Level_ENTITY>> HRM_Employee_Academic_Level_Search(HRM_Employee_Academic_Level_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Academic_Level_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Academic_Level_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Bonus_ENTITY>> HRM_Employee_Bonus_Search(HRM_Employee_Bonus_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Bonus_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Bonus_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Certificate_ENTITY>> HRM_Employee_Certificate_Search(HRM_Employee_Certificate_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Certificate_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Certificate_Search, input);
            return result;
        }
        public async Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Update(HRM_Employee_Check_In_Out_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Check_In_Out_Update, input);
            return result;
        }
        public async Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Insert(HRM_Employee_Check_In_Out_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Check_In_Out_Insert, input);
            return result;
        }

        public async Task<List<HRM_Employee_Check_In_Out_ENTITY>> HRM_Employee_Check_In_Out_Search(HRM_Employee_Check_In_Out_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Check_In_Out_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Check_In_Out_Search, input);
            return result;
        } 
        public async Task<List<HRM_Employee_Check_In_Out_ENTITY>> HRM_Employee_Timesheet_Search(HRM_Employee_Check_In_Out_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Check_In_Out_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Timesheet_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Employee_Delete(string code, string user_login)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Delete, new {code = code, user_login = user_login });
            return result;
        }

        public async Task<List<HRM_Employee_Discipline_ENTITY>> HRM_Employee_Discipline_Search(HRM_Employee_Discipline_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Discipline_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Discipline_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Evaluate_ENTITY>> HRM_Employee_Evaluate_Search(HRM_Employee_Evaluate_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Evaluate_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Evaluate_Search, input);
            return result;
        }

        public async Task<HRM_Employee_ENTITY> HRM_Employee_Insert(HRM_Employee_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Insert, input);
            return result[0];
        }

        public async Task<List<HRM_Employee_Labour_Contract_Appendix_ENTITY>> HRM_Employee_Labour_Contract_Appendix_Search(HRM_Employee_Labour_Contract_Appendix_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Labour_Contract_Appendix_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Appendix_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY>> HRM_Employee_Labour_Contract_Curriculum_Vitae_Search(HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Labour_Contract_Curriculum_Vitae_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Curriculum_Vitae_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Delete(string code, string user_login)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Delete, new { code = code, user_login = user_login });
            return result;
        }

        public async Task<HRM_Employee_Labour_Contract_ENTITY> HRM_Employee_Labour_Contract_Insert(HRM_Employee_Labour_Contract_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Labour_Contract_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Insert, input);
            return result[0];
        }

        public async Task<List<HRM_Employee_Labour_Contract_Salary_ENTITY>> HRM_Employee_Labour_Contract_Salary_Search(HRM_Employee_Labour_Contract_Salary_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Labour_Contract_Salary_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Salary_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Labour_Contract_ENTITY>> HRM_Employee_Labour_Contract_Search(HRM_Employee_Labour_Contract_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Labour_Contract_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Labour_Contract_Type_ENTITY>> HRM_Employee_Labour_Contract_Type_Search(HRM_Employee_Labour_Contract_Type_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Labour_Contract_Type_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Type_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Labour_Contract_ENTITY>> HRM_Employee_Labour_Contract_Update(HRM_Employee_Labour_Contract_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Labour_Contract_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Update, input);
            return result;
        }

        public async Task<List<HRM_Employee_Marital_Status_ENTITY>> HRM_Employee_Marital_Status_Search(HRM_Employee_Marital_Status_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Marital_Status_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Marital_Status_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Occupational_Accident_ENTITY>> HRM_Employee_Occupational_Accident_Search(HRM_Employee_Occupational_Accident_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Occupational_Accident_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Occupational_Accident_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_ENTITY>> HRM_Employee_Search(HRM_Employee_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Training_ENTITY>> HRM_Employee_Training_Search(HRM_Employee_Training_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Training_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Training_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Employee_Update(HRM_Employee_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Employee_Work_Procedure_Delete(string code, string user_login)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Work_Procedure_Delete, new {code = code , user_login = user_login});
            return result;
        }
        public async Task<IDictionary<string, object>> HRM_Employee_Work_Procedure_Insert(HRM_Employee_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Work_Procedure_Insert, input);
            return result;
        }

        public async Task<List<HRM_Employee_ENTITY>> HRM_Employee_Work_Procedure_Search(HRM_Employee_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Work_Procedure_Search, input);
            return result;
        }

        public async Task<HRM_Employee_ENTITY> HRM_Employee_Work_Procedure_Update(HRM_Employee_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Work_Procedure_Update, input);
            return result[0];
        }

        

        public async Task<List<Part_ENTITY>> Part_Search(Part_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<Part_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.Part_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Appendix_Target_Update(HRM_Employee_Labour_Contract_Appendix_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Appendix_Target_Update, input);
            return result;
        }

        public async Task<List<HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY>> HRM_Employee_Labour_Contract_Salary_Deduction_Search(HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Labour_Contract_Salary_Deduction_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Salary_Deduction_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY>> HRM_Employee_Labour_Contract_Appendix_Target_Detail_Search(HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Appendix_Target_Detail_Search, input);
            return result;
        }
        public async Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Appendix_Target_Detail_Insert(HRM_Employee_Labour_Contract_Appendix_Target_Detail_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Appendix_Target_Detail_Insert, input);
            return result;
        }

        public async Task<List<HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY>> HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Search(HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Update(HRM_Employee_Labour_Contract_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Labour_Contract_Appendix_Target_Sale_Level_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Warning_Actions(string xml_data,string type)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Check_In_Out_Warning_Actions, new
            {
                xml_data = xml_data,type=type
            });
            return result;
        }

        public async Task<List<HRM_Employee_Check_In_Out_Image_Training_ENTITY>> HRM_Employee_Check_In_Out_Face_Training_Search(HRM_Employee_Check_In_Out_Image_Training_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure2<HRM_Employee_Check_In_Out_Image_Training_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Check_In_Out_Face_Training_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Employee_Check_In_Out_Face_Training_Update(FaceInfoFaceTrainingUpdate input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Check_In_Out_Face_Training_Update, input);
            return result;
        }
    }
}
