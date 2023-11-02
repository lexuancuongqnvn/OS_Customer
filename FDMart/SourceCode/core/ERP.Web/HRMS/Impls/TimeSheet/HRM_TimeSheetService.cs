using ERP.Common.Controllers;
using HRMS.Intfs.Employee.Dto;
using HRMS.Intfs.TimeSheet;
using HRMS.Intfs.TimeSheet.Dto;
using HRMS.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace HRMS.Impls.TimeSheet
{
    public class HRM_TimeSheetService : IHRM_TimeSheetService
    {
        public async Task<List<HRM_TimeSheet_ENTITY>> HRM_Project_Management_Task_WorkTime_Report_Search(HRM_TimeSheet_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Project_Management_Task_WorkTime_Report_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Insert(HRM_TimeSheet_Attendance_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Insert, input);
            return result;
        }
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Approve(HRM_TimeSheet_Attendance_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Approve, input);
            return result;
        }
        public async  Task<List<HRM_TimeSheet_Attendance_ENTITY>> HRM_TimeSheet_Attendance_Search(HRM_TimeSheet_Attendance_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Attendance_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Search, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Attendance_ENTITY>> HRM_TimeSheet_Attendance_Search_Detail(string code)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Attendance_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Search_Detail, new {code = code});
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Status_Delete(string code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Status_Delete, new { code = code });
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Status_Insert(HRM_TimeSheet_Attendance_Status_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Status_Insert, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Attendance_Status_ENTITY>> HRM_TimeSheet_Attendance_Status_Search(HRM_TimeSheet_Attendance_Status_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Attendance_Status_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Status_Search, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Attendance_Status_ENTITY>> HRM_TimeSheet_Attendance_Status_Search_Detail(string code)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Attendance_Status_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Status_Search_Detail, new {code=code});
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Status_Update(HRM_TimeSheet_Attendance_Status_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Status_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Type_Off_Delete(string code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Type_Off_Delete, new {code=code});
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Type_Off_Insert(HRM_TimeSheet_Attendance_Type_Off_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Type_Off_Insert, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Attendance_Type_Off_ENTITY>> HRM_TimeSheet_Attendance_Type_Off_Search(HRM_TimeSheet_Attendance_Type_Off_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Attendance_Type_Off_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Type_Off_Search, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Attendance_Type_Off_ENTITY>> HRM_TimeSheet_Attendance_Type_Off_Search_Detail(string code)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Attendance_Type_Off_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Type_Off_Search_Detail, new {code = code});
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Type_Off_Update(HRM_TimeSheet_Attendance_Type_Off_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Type_Off_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Update(HRM_TimeSheet_Attendance_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Attendance_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Register_Approve(HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Soon_Late_Register_Approve, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Register_Delete(string code)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Soon_Late_Register_Delete, new {code = code});
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Register_Insert(HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Soon_Late_Register_Insert, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Register_Moving(HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Soon_Late_Register_Moving, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY>> HRM_TimeSheet_Employee_Soon_Late_Register_Search(HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Soon_Late_Register_Search, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY>> HRM_TimeSheet_Employee_Soon_Late_Register_Search_Detail(string code)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Soon_Late_Register_Search_Detail, new { code = code });
            return result;
        }

        public async Task<List<HRM_TimeSheet_Employee_Soon_Late_Register_Status_ENTITY>> HRM_TimeSheet_Employee_Soon_Late_Register_Status_Search(HRM_TimeSheet_Employee_Soon_Late_Register_Status_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Employee_Soon_Late_Register_Status_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Soon_Late_Register_Status_Search, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Employee_Soon_Late_Register_Type_ENTITY>> HRM_TimeSheet_Employee_Soon_Late_Register_Type_Search(HRM_TimeSheet_Employee_Soon_Late_Register_Type_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Employee_Soon_Late_Register_Type_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Soon_Late_Register_Type_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Register_Update(HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Soon_Late_Register_Update, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Employee_Work_Shift_ENTITY>> HRM_TimeSheet_Employee_Work_Shift_Bycode(HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Employee_Work_Shift_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Work_Shift_Bycode, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Work_Shift_Delete(HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Work_Shift_Delete, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY>> HRM_TimeSheet_Employee_Work_Shift_Detail_All_Day_In_Month(HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Work_Shift_Detail_All_Day_In_Month, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY>> HRM_TimeSheet_Employee_Work_Shift_Detail_Bycode(HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Work_Shift_Detail_Bycode, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Work_Shift_Insert(HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Work_Shift_Insert, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Employee_Work_Shift_ENTITY>> HRM_TimeSheet_Employee_Work_Shift_Search(HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Employee_Work_Shift_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Work_Shift_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Work_Shift_Update(HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Work_Shift_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Work_Shift_Update_Name(HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Work_Shift_Update_Name, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Insert(HRM_TimeSheet_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Insert, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_ENTITY>> HRM_TimeSheet_Search(HRM_TimeSheet_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Search, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Detail_ENTITY>> HRM_TimeSheet_Search_Detail(int id)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Detail_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Search_Detail, new {ID = id});
            return result;
        }
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Update(HRM_TimeSheet_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Work_Shift_Actions(HRM_TimeSheet_Work_Shift_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Work_Shift_Actions, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Work_Shift_ENTITY>> HRM_TimeSheet_Work_Shift_Search(HRM_TimeSheet_Work_Shift_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Work_Shift_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Work_Shift_Search, input);
            return result;
        }
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Mission_Allowance_Delete(string code, string user_login)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Mission_Allowance_Delete, new { code = code, user_login = user_login });
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Mission_Allowance_Insert(HRM_Timesheet_Employee_Mission_Allowance_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Mission_Allowance_Insert, input);
            return result;
        }

        public async Task<List<HRM_Timesheet_Employee_Mission_Allowance_ENTITY>> HRM_Timesheet_Employee_Mission_Allowance_Search(HRM_Timesheet_Employee_Mission_Allowance_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Timesheet_Employee_Mission_Allowance_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Mission_Allowance_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Mission_Allowance_Update(HRM_Timesheet_Employee_Mission_Allowance_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Mission_Allowance_Update, input);
            return result;
        }
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Mission_Allowance_Approve(HRM_Timesheet_Employee_Mission_Allowance_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Mission_Allowance_Approve, input);
            return result;
        }

        public async Task<List<HRM_Timesheet_Employee_Overtime_ENTITY>> HRM_Timesheet_Employee_Overtime_Search(HRM_Timesheet_Employee_Overtime_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Timesheet_Employee_Overtime_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Overtime_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Overtime_Update(HRM_Timesheet_Employee_Overtime_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Overtime_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Overtime_Approve(HRM_Timesheet_Employee_Overtime_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Overtime_Approve, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Overtime_Insert(HRM_Timesheet_Employee_Overtime_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Overtime_Insert, input);
            return result;
        }

        public async Task<List<HRM_Timesheet_Employee_Update_Timkeeping_ENTITY>> HRM_Timesheet_Employee_Update_Timkeeping_Search(HRM_Timesheet_Employee_Update_Timkeeping_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Timesheet_Employee_Update_Timkeeping_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Update_Timkeeping_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Update_Timkeeping_Update(HRM_Timesheet_Employee_Update_Timkeeping_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Update_Timkeeping_Update, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Update_Timkeeping_Approve(HRM_Timesheet_Employee_Update_Timkeeping_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Update_Timkeeping_Approve, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Update_Timkeeping_Insert(HRM_Timesheet_Employee_Update_Timkeeping_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Update_Timkeeping_Insert, input);
            return result;
        }

        public async Task<List<HRM_Holiday_ENTITY>> HRM_Holiday_Search(HRM_Holiday_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Holiday_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Holiday_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Holiday_Actions(HRM_Holiday_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Holiday_Actions, input);
            return result;
        }

        public async Task<List<HRM_Timesheet_Employee_Overtime_Type_ENTITY>> HRM_Timesheet_Employee_Overtime_Type_Search(HRM_Timesheet_Employee_Overtime_Type_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Timesheet_Employee_Overtime_Type_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Overtime_Type_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Overtime_Type_Actions(HRM_Timesheet_Employee_Overtime_Type_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Timesheet_Employee_Overtime_Type_Actions, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY>> HRM_TimeSheet_Employee_Soon_Late_Regulation_Search(HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Soon_Late_Regulation_Search, input);
            return result;
        }

        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Regulation_Update(HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY input)
        {
            var result = await ManagementController.GetResultValueFromStore(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Employee_Soon_Late_Regulation_Update, input);
            return result;
        }

        public async Task<List<HRM_TimeSheet_Work_Shift_Detail_ENTITY>> HRM_TimeSheet_Work_Shift_Detail_Search(HRM_TimeSheet_Work_Shift_Detail_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_TimeSheet_Work_Shift_Detail_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_TimeSheet_Work_Shift_Detail_Search, input);
            return result;
        }

        public async Task<List<HRM_Employee_Log_Paid_Holiday_ENTITY>> HRM_Employee_Log_Paid_Holiday_Search(HRM_Employee_Log_Paid_Holiday_ENTITY input)
        {
            var result = await ManagementController.GetDataFromStoredProcedure<HRM_Employee_Log_Paid_Holiday_ENTITY>(ConnectController.GetConnectStringByKey("HRM"), CommonStoredProcedule.HRM_Employee_Log_Paid_Holiday_Search, input);
            return result;
        }
    }
}
