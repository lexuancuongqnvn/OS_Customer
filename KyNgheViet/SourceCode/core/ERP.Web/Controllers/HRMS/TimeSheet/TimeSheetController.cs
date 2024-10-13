using Common.Utils;
using DocumentFormat.OpenXml.EMMA;
using ERP.Common.App_Data.Log;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.Web.Controllers.SignalR;
using ERP.Web.Controllers.Upload;
using ERP.Web.Models;
using HRMS.Controllers;
using HRMS.Intfs.Employee.Dto;
using HRMS.Intfs.TimeSheet;
using HRMS.Intfs.TimeSheet.Dto;
using HRMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Process.Controllers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.HRMS.TimeSheet
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class TimeSheetController : ControllerBase
    {
        private readonly IHRM_TimeSheetService HRM_TimeSheetService;
        //private readonly BackgroundWorkerQueue _backgroundWorkerQueue;

        public TimeSheetController(IHRM_TimeSheetService HRM_TimeSheetService)
        {
            this.HRM_TimeSheetService = HRM_TimeSheetService;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Insert(HRM_TimeSheet_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_ENTITY>> HRM_TimeSheet_Search(HRM_TimeSheet_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Detail_ENTITY>> HRM_TimeSheet_Search_Detail(int id)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Search_Detail(id);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Update(HRM_TimeSheet_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_ENTITY>> HRM_Project_Management_Task_WorkTime_Report_Search([FromBody]HRM_TimeSheet_ENTITY input)
        {
            List<HRM_TimeSheet_ENTITY> hRM_TimeSheet_ENTITies = new List<HRM_TimeSheet_ENTITY>();
            DataTable dt = new DataTable();
            string qr = @"EXEC [dbo].[HRM_Project_Management_Task_WorkTime_Report_Search]
		                @p_start_date = '"+ input.start_date.ToString("yyyy/MM/dd") + @"',
		                @p_end_date = '" + input.end_date.ToString("yyyy/MM/dd") + @"',
		                @p_department = '" + input.department + @"'";
            dt = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Project_Management_Task_WorkTime_Report_Search", qr);
            HRM_TimeSheet_ENTITY result = new HRM_TimeSheet_ENTITY();
            result = input;
            string html = ManagementController.ExportDatatableToHtml(dt);
            result.html = html;
            hRM_TimeSheet_ENTITies.Add(result);
            return hRM_TimeSheet_ENTITies;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Work_Shift_Actions([FromBody] HRM_TimeSheet_Work_Shift_ENTITY input)
        {
            List<HRM_TimeSheet_Work_Shift_Detail_ENTITY> Details = new List<HRM_TimeSheet_Work_Shift_Detail_ENTITY>();
            //if (input.monday == true) Details.Add(input.hRM_TimeSheet_Work_Shift_Details.Find(e=>e.name == "monday"));
            //if (input.tuesday == true) Details.Add(input.hRM_TimeSheet_Work_Shift_Details.Find(e=>e.name == "tuesday"));
            //if (input.wednesday == true) Details.Add(input.hRM_TimeSheet_Work_Shift_Details.Find(e=>e.name == "wednesday"));
            //if (input.thursday == true) Details.Add(input.hRM_TimeSheet_Work_Shift_Details.Find(e=>e.name == "thursday"));
            //if (input.friday == true) Details.Add(input.hRM_TimeSheet_Work_Shift_Details.Find(e=>e.name == "friday"));
            //if (input.saturday == true) Details.Add(input.hRM_TimeSheet_Work_Shift_Details.Find(e=>e.name == "saturday"));
            //if (input.sunday == true) Details.Add(input.hRM_TimeSheet_Work_Shift_Details.Find(e=>e.name == "sunday"));
            //input.hRM_TimeSheet_Work_Shift_Details = Details;
            if(input.hRM_TimeSheet_Work_Shift_Details != null)
            {
                foreach(var item in input.hRM_TimeSheet_Work_Shift_Details)
                {
                    if (item.start_relax != null && item.end_relax != null)
                        item.relax = (item.end_relax.Value.Hour + item.end_relax.Value.Minute / 60) - (item.start_relax.Value.Hour + item.start_relax.Value.Minute / 60);
                    else item.relax = 0;
                    item.total_time = (item.end_time.Value.Hour + item.end_time.Value.Minute / 60) - (item.start_time.Value.Hour + item.start_time.Value.Minute / 60)- item.relax;
                    switch (item.name)
                    {
                        case "monday":
                            input.monday = false;
                            break;
                        case "tuesday":
                            input.tuesday = false;
                            break;
                        case "wednesday":
                            input.wednesday = false;
                            break;
                        case "thursday":
                            input.thursday = false;
                            break;
                        case "friday":
                            input.friday = false;
                            break;
                        case "saturday":
                            input.saturday = false;
                            break;
                        case "sunday":
                            input.sunday = false;
                            break;
                    }
                    if (item.is_apply == true)
                    {
                        switch (item.name)
                        {
                            case "monday":
                                input.monday = true;
                                break;
                            case "tuesday":
                                input.tuesday = true;
                                break;
                            case "wednesday":
                                input.wednesday = true;
                                break;
                            case "thursday":
                                input.thursday = true;
                                break;
                            case "friday":
                                input.friday = true;
                                break;
                            case "saturday":
                                input.saturday = true;
                                break;
                            case "sunday":
                                input.sunday = true;
                                break;
                        }
                    }
                }
            }
            input.xml = input.hRM_TimeSheet_Work_Shift_Details.ToXmlFromList();
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Work_Shift_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Work_Shift_ENTITY>> HRM_TimeSheet_Work_Shift_Search([FromBody] HRM_TimeSheet_Work_Shift_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Work_Shift_Search(input);
            if (!string.IsNullOrEmpty(input.code))
            {
                HRM_TimeSheet_Work_Shift_Detail_ENTITY pr = new HRM_TimeSheet_Work_Shift_Detail_ENTITY();
                pr.work_shift_code = input.code;
                result[0].hRM_TimeSheet_Work_Shift_Details = await HRM_TimeSheetService.HRM_TimeSheet_Work_Shift_Detail_Search(pr);
            }
            return result;
        }
        [HttpPost]
        public async Task<Create_Request_Action_ENTITY> Create_Request_Action_Search([FromBody] Create_Request_Action_ENTITY input)
        {
            input.hRM_TimeSheet_Work_Shifts = await HRM_TimeSheetService.HRM_TimeSheet_Work_Shift_Search(new HRM_TimeSheet_Work_Shift_ENTITY { type="REQUEST",employee_code=input.employee_code});
            if(input.hRM_TimeSheet_Work_Shifts != null)
            {
                foreach(var ws in input.hRM_TimeSheet_Work_Shifts)
                {
                    ws.hRM_TimeSheet_Work_Shift_Details = await HRM_TimeSheetService.HRM_TimeSheet_Work_Shift_Detail_Search(new HRM_TimeSheet_Work_Shift_Detail_ENTITY { work_shift_code = ws.code });
                }
            }
            input.hRM_Employee_Log_Paid_Holiday = (await HRM_TimeSheetService.HRM_Employee_Log_Paid_Holiday_Search(new HRM_Employee_Log_Paid_Holiday_ENTITY { type = "REQUEST", employee_code = input.employee_code }))[0];
            return input;
        }

        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Work_Shift_Delete([FromBody] HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Work_Shift_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<HRM_TimeSheet_Employee_Work_Shift_ENTITY> HRM_TimeSheet_Employee_Work_Shift_Bycode([FromBody]HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Work_Shift_Bycode(input);
            if(result.Count > 0)
                result[0].HRM_TimeSheet_Employee_Work_Shift_Details = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Work_Shift_Detail_Bycode(input);
            return result[0];
        }

        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Work_Shift_Insert([FromBody] HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            List<HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY> wsDetails = new List<HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY>();
            foreach (var emps in input.hRM_Employees)//Danh sách nhan viên
            {
                foreach (var ws in emps.hRM_TimeSheet_Work_Shifts)//Danh sách ca trực theo nhân viên
                {
                    foreach (var today in ws.allDay)//Lịch trực của nhân viên trong tháng theo ca
                    {
                        if(today.day > 0)
                        {
                            HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY wsDetail = new HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY();
                            wsDetail.ID = -1;
                            wsDetail.master_code = input.code;
                            wsDetail.code = today.code_work_shift_detail;
                            wsDetail.work_date = today.date;
                            wsDetail.employee_code = emps.code;
                            wsDetail.overtime_code = today.overtime_code;
                            wsDetail.attendance_code = today.attendance_code;
                            wsDetail.soon_late_request_code = today.soon_late_request_code;
                            wsDetail.mission_allowance_code = today.mission_allowance_code;
                            if((bool)today.value) 
                                wsDetail.work_shift_code = ws.code;
                            else 
                                wsDetail.work_shift_code = null;
                            wsDetails.Add(wsDetail);
                        }
                    }
                }
            }
            input.xml = wsDetails.ToXmlFromList();
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Work_Shift_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Employee_Work_Shift_ENTITY>> HRM_TimeSheet_Employee_Work_Shift_Search([FromBody] HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Work_Shift_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Work_Shift_Update([FromBody] HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            List<HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY> wsDetails = input.HRM_TimeSheet_Employee_Work_Shift_Details;
            foreach (var emps in input.hRM_Employees)
            {//Danh sách nhan viên
                foreach (var ws in emps.hRM_TimeSheet_Work_Shifts)//Danh sách ca trực theo nhân viên
                {
                    foreach (var today in ws.allDay)//Lịch trực của nhân viên trong tháng theo ca
                    {
                        if (today.day > 0 && (bool)today.value)
                        {
                            HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY wsDetail = new HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY();
                            wsDetail.ID = -1;
                            wsDetail.master_code = input.code;
                            wsDetail.code = today.code_work_shift_detail;
                            wsDetail.work_date = today.date;
                            wsDetail.employee_code = emps.code;
                            wsDetail.overtime_code = today.overtime_code;
                            wsDetail.attendance_code = today.attendance_code;
                            wsDetail.soon_late_request_code = today.soon_late_request_code;
                            wsDetail.mission_allowance_code = today.mission_allowance_code;
                            wsDetail.work_shift_code = ws.code;
                            wsDetails.Add(wsDetail);
                        }
                    }
                }
            }
            input.xml = wsDetails.ToXmlFromList();
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Work_Shift_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Employee_Work_Shift_Detail_ENTITY>> HRM_TimeSheet_Employee_Work_Shift_Detail_All_Day_In_Month([FromBody] HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Work_Shift_Detail_All_Day_In_Month(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Work_Shift_Update_Name([FromBody] HRM_TimeSheet_Employee_Work_Shift_ENTITY input)
        {
            IDictionary<string, object> result = new Dictionary<string, object>();
            result.Add("status", 0);
            result.Add("message", "Cập nhật thành công");
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CheckInOut_FaceID_Setting([FromBody] HRM_TimeSheet_ENTITY input)
        {
            IDictionary<string, object> result = new Dictionary<string, object>();
            string docPath1 = FileManagerController.AppDirectory + "\\UploadFiles\\TimeKeeping\\" + input.company_code + "\\Faces\\" + input.employee_code;

            var docPath = docPath1 + "\\Training\\";
            if (!Directory.Exists(docPath))
                Directory.CreateDirectory(docPath);
            bool rs = FileManagerController.SaveBase64ToImage(input.base64.Replace("data:image/jpeg;base64,", ""), docPath, "temp.jpg");
            if (rs)
            {
                string docPath2 = FileManagerController.AppDirectory + "\\UploadFiles\\TimeKeeping\\" + input.company_code + "\\";
                if (!Directory.Exists(docPath2))
                    Directory.CreateDirectory(docPath2);

                using (StreamWriter outputFile = new StreamWriter(Path.Combine(docPath2, input.employee_code + "FaceIDSetting.txt")))
                {
                    outputFile.WriteLine(docPath1 + "," + input.company_code + "," + input.employee_code);
                }
            }
            Thread.Sleep(1 * 1000);

            string text = await DirAppend.ReadFile(docPath + "list-image.txt");

            if (text.Split(",").Length == 10)
            {
                result.Add("status", 0);
                result.Add("message", "Cài đặt thành công.");
            }
            else
            {
                float pasent = (text.Split(',').Length * 100) / 10;
                result.Add("status", 2);
                result.Add("message", "Di chuyển khuông mặt (" + pasent + "%)");
            }
            //_backgroundWorkerQueue.QueueBackgroundWorkItem(async token =>
            //{
            //    //Lưu dữ liệu sau khi check thành công
            //    await Task.Delay(1 * 1000);
            //});

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> CheckInOut([FromBody] HRM_TimeSheet_ENTITY input)
        {
            return await RenderCheckInOut(input);
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Insert([FromBody] HRM_TimeSheet_Attendance_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Insert(input);
            if (result["status"].ToString() == "0")
            {
                string to = input.checker_code, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), input.reason, input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Attendance_ENTITY>> HRM_TimeSheet_Attendance_Search([FromBody] HRM_TimeSheet_Attendance_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Approve([FromBody] HRM_TimeSheet_Attendance_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Approve(input);
            if (result["status"].ToString() == "0")
            {
                string to = input.request_account, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), result["message"].ToString(), input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Attendance_ENTITY>> HRM_TimeSheet_Attendance_Search_Detail([FromBody] string code)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Search_Detail( code );
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Status_Insert([FromBody] HRM_TimeSheet_Attendance_Status_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Status_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Attendance_Status_ENTITY>> HRM_TimeSheet_Attendance_Status_Search([FromBody] HRM_TimeSheet_Attendance_Status_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Status_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Attendance_Status_ENTITY>> HRM_TimeSheet_Attendance_Status_Search_Detail([FromBody] string code)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Status_Search_Detail(code );
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Status_Update([FromBody] HRM_TimeSheet_Attendance_Status_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Status_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Type_Off_Insert([FromBody] HRM_TimeSheet_Attendance_Type_Off_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Type_Off_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Attendance_Type_Off_ENTITY>> HRM_TimeSheet_Attendance_Type_Off_Search([FromBody] HRM_TimeSheet_Attendance_Type_Off_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Type_Off_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Attendance_Type_Off_ENTITY>> HRM_TimeSheet_Attendance_Type_Off_Search_Detail([FromBody] string code)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Type_Off_Search_Detail(code);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Type_Off_Update([FromBody] HRM_TimeSheet_Attendance_Type_Off_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Type_Off_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Attendance_Update([FromBody]HRM_TimeSheet_Attendance_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Attendance_Update(input);
            if (result["status"].ToString() == "0" && result["is_change_checker"].ToString() == "0")
            {
                string to = input.checker_code, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), input.reason, input.reason);
            }
            return result;
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<IDictionary<string, object>> RenderCheckInOut(HRM_TimeSheet_ENTITY input)
        {
            IDictionary<string, object> result = new Dictionary<string, object>();
            string docPath1 = FileManagerController.AppDirectory + "\\UploadFiles\\TimeKeeping\\" + input.company_code + "\\Faces\\" + input.employee_code;

            var docPath = docPath1 + "\\Check\\" + DateTime.Now.ToString("dd-MM-yyyyy") + "\\";
            if (!Directory.Exists(docPath))
                Directory.CreateDirectory(docPath);
            bool rs = FileManagerController.SaveBase64ToImage(input.base64.Replace("data:image/jpeg;base64,", ""), docPath, "image.jpg");
            if (rs)
            {
                string docPath2 = FileManagerController.AppDirectory + "\\UploadFiles\\TimeKeeping\\" + input.company_code + "\\";
                if (!Directory.Exists(docPath2))
                    Directory.CreateDirectory(docPath2);

                using (StreamWriter outputFile = new StreamWriter(Path.Combine(docPath2, input.employee_code + "onChange.txt")))
                {
                    outputFile.WriteLine(docPath1 + "," + input.company_code + "," + input.employee_code);
                }
            }
            Thread.Sleep(1 * 1000);
            string text = await DirAppend.ReadFile(docPath1 + "\\Check\\result.ts");
            if (string.IsNullOrEmpty(text) || text == "-1")
            {
                result.Add("status", 1);
                result.Add("message", "Di chuyển khuông mặt");
            }
            else
            {
                result.Add("status", 0);
                result.Add("message", "Chấm công thành công");
            }
            //_backgroundWorkerQueue.QueueBackgroundWorkItem(async token =>
            //{
            //    //Lưu dữ liệu sau khi check thành công
            //    await Task.Delay(1 * 1000);
            //});

            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Register_Insert([FromBody] HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Soon_Late_Register_Insert(input);
            if (result["status"].ToString() == "0")
            {
                string to = input.checker, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to,type,content,title, result["ref_notifi_code"].ToString(), input.reason,input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY>> HRM_TimeSheet_Employee_Soon_Late_Register_Search([FromBody] HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Soon_Late_Register_Search( input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY>> HRM_TimeSheet_Employee_Soon_Late_Register_Search_Detail(string code)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Soon_Late_Register_Search_Detail(code);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Register_Update([FromBody]HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Soon_Late_Register_Update(input);
            if (result["status"].ToString() == "0" && result["is_change_checker"].ToString() == "0")
            {
                string to = input.checker, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), input.reason, input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Register_Delete(string code)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Soon_Late_Register_Delete(code);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Employee_Soon_Late_Register_Status_ENTITY>> HRM_TimeSheet_Employee_Soon_Late_Register_Status_Search([FromBody]HRM_TimeSheet_Employee_Soon_Late_Register_Status_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Soon_Late_Register_Status_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Employee_Soon_Late_Register_Type_ENTITY>> HRM_TimeSheet_Employee_Soon_Late_Register_Type_Search([FromBody] HRM_TimeSheet_Employee_Soon_Late_Register_Type_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Soon_Late_Register_Type_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Register_Approve([FromBody] HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Soon_Late_Register_Approve(input);
            if (result["status"].ToString() == "0")
            {
                string to = input.request_account, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), result["message"].ToString(), input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Register_Moving([FromBody] HRM_TimeSheet_Employee_Soon_Late_Register_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Soon_Late_Register_Moving(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Mission_Allowance_Delete(string code, string user_login)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Mission_Allowance_Delete(code, user_login);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Mission_Allowance_Insert([FromBody] HRM_Timesheet_Employee_Mission_Allowance_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Mission_Allowance_Insert(input);
            if (result["status"].ToString() == "0")
            {
                string to = input.checker, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), input.reason, input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Timesheet_Employee_Mission_Allowance_ENTITY>> HRM_Timesheet_Employee_Mission_Allowance_Search([FromBody] HRM_Timesheet_Employee_Mission_Allowance_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Mission_Allowance_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Mission_Allowance_Update([FromBody] HRM_Timesheet_Employee_Mission_Allowance_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Mission_Allowance_Update(input);
            if (result["status"].ToString() == "0" && result["is_change_checker"].ToString() == "0")
            {
                string to = input.checker, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), input.reason, input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Mission_Allowance_Approve([FromBody] HRM_Timesheet_Employee_Mission_Allowance_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Mission_Allowance_Approve(input);
            if (result["status"].ToString() == "0")
            {
                string to = input.request_account, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), result["message"].ToString(), input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Timesheet_Employee_Overtime_ENTITY>> HRM_Timesheet_Employee_Overtime_Search([FromBody] HRM_Timesheet_Employee_Overtime_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Overtime_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Overtime_Update([FromBody] HRM_Timesheet_Employee_Overtime_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Overtime_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Overtime_Approve([FromBody] HRM_Timesheet_Employee_Overtime_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Overtime_Approve(input);
            if (result["status"].ToString() == "0")
            {
                string to = input.request_account, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), result["message"].ToString(), input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Overtime_Insert([FromBody] HRM_Timesheet_Employee_Overtime_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Overtime_Insert(input);
            if (result["status"].ToString() == "0")
            {
                string to = input.checker, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), input.reason, input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Timesheet_Employee_Update_Timkeeping_ENTITY>> HRM_Timesheet_Employee_Update_Timkeeping_Search([FromBody] HRM_Timesheet_Employee_Update_Timkeeping_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Update_Timkeeping_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Update_Timkeeping_Update([FromBody] HRM_Timesheet_Employee_Update_Timkeeping_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Update_Timkeeping_Update(input);
            if (result["status"].ToString() == "0" && result["is_change_checker"].ToString() == "0")
            {
                string to = input.checker, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), input.reason, input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Update_Timkeeping_Approve([FromBody] HRM_Timesheet_Employee_Update_Timkeeping_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Update_Timkeeping_Approve(input);
            if (result["status"].ToString() == "0")
            {
                string to = input.request_account, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), result["message"].ToString(), input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Update_Timkeeping_Insert([FromBody] HRM_Timesheet_Employee_Update_Timkeeping_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Update_Timkeeping_Insert(input);
            if (result["status"].ToString() == "0")
            {
                string to = input.checker, type = "single", content = "", title = "";
                NotificationController.SendNotificationFullAppFirebase(to, type, content, title, result["ref_notifi_code"].ToString(), input.reason, input.reason);
            }
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Holiday_ENTITY>> HRM_Holiday_Search([FromBody] HRM_Holiday_ENTITY input)
        {
            var result = await  HRM_TimeSheetService.HRM_Holiday_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Holiday_Actions([FromBody] HRM_Holiday_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Holiday_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<HRM_Report_Attendance_ENTITY> HRM_Report_Attendance_Search([FromBody] HRM_Report_Attendance_ENTITY input)
        {
            HRM_Report_Attendance_ENTITY result = new HRM_Report_Attendance_ENTITY();

            List<Tuple<string, string>> tuples = new List<Tuple<string, string>>();
            Tuple<string, string> filter = new Tuple<string, string>("p_from_date", input.from_date.Value.Year.ToString()+"-"+ input.from_date.Value.Month.ToString() + "-"+ input.from_date.Value.Day.ToString());
            Tuple<string, string> type = new Tuple<string, string>("p_to_date", input.to_date.Value.Year.ToString()+"-"+input.to_date.Value.Month.ToString() + "-" + input.to_date.Value.Day.ToString());
            Tuple<string, string> user_login = new Tuple<string, string>("p_user_login",input.user_login );
            tuples.Add(filter);
            tuples.Add(type);
            tuples.Add(user_login);
            DataSet dt = ManagementController.GetListTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Report_Attendance_Search", tuples);

            result.table_employees = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[0]).ToString();
            result.table_day = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[1]).ToString();
            result.table_attendance = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[2]).ToString();
            result.table_soon_late = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[3]).ToString();
            result.table_overtime = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[4]).ToString();
            result.mission_allowance = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[5]).ToString();
            result.table_update_timkeeping = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[6]).ToString();
            result.table_holiday = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[7]).ToString();
            result.table_checkin_out_soon_late = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[8]).ToString();

            return result;
        }
        [HttpPost]
        public async Task<HRM_Report_Attendance_ENTITY> HRM_Employee_Salary_By_Report_Attendance_Search([FromBody] HRM_Report_Attendance_ENTITY input)
        {
            HRM_Report_Attendance_ENTITY result = new HRM_Report_Attendance_ENTITY();

            List<Tuple<string, string>> tuples = new List<Tuple<string, string>>();
            Tuple<string, string> filter = new Tuple<string, string>("p_from_date", input.from_date.Value.Year.ToString() + "-" + input.from_date.Value.Month.ToString() + "-" + input.from_date.Value.Day.ToString());
            Tuple<string, string> type = new Tuple<string, string>("p_to_date", input.to_date.Value.Year.ToString() + "-" + input.to_date.Value.Month.ToString() + "-" + input.to_date.Value.Day.ToString());
            Tuple<string, string> user_login = new Tuple<string, string>("p_user_login", input.user_login);
            tuples.Add(filter);
            tuples.Add(type);
            tuples.Add(user_login);
            DataSet dt = ManagementController.GetListTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Employee_Salary_By_Report_Attendance_v2_Search", tuples);

            result.table_employees = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[0]).ToString();
            result.table_day = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[1]).ToString();
            result.table_attendance = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[2]).ToString();
            result.table_soon_late = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[3]).ToString();
            result.table_overtime = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[4]).ToString();
            result.mission_allowance = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[5]).ToString();
            result.table_update_timkeeping = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[6]).ToString();
            result.table_holiday = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[7]).ToString();
            result.table_checkin_out_soon_late = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[8]).ToString();
            result.labour_contract_salary = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[9]).ToString();
            result.employee_labour_contract_appendix = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[10]).ToString();
            result.table_check_in_out_soon_late_regulation = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[11]).ToString();
            result.table_check_in_out_soon_late_detail = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[12]).ToString();

            return result;
        }
        [HttpPost]
        public async Task<HRM_Report_Attendance_ENTITY> HRM_Employee_Salary_By_Report_Attendance_v2_Search([FromBody] HRM_Report_Attendance_ENTITY input)
        {
            HRM_Report_Attendance_ENTITY result = new HRM_Report_Attendance_ENTITY();

            List<Tuple<string, string>> tuples = new List<Tuple<string, string>>();
            Tuple<string, string> filter = new Tuple<string, string>("p_from_date", input.from_date.Value.Year.ToString() + "-" + string.Format("{0:00}", input.from_date.Value.Month) + "-" + string.Format("{0:00}", input.from_date.Value.Day));
            Tuple<string, string> type = new Tuple<string, string>("p_to_date", input.to_date.Value.Year.ToString() + "-" + string.Format("{0:00}", input.to_date.Value.Month) + "-" + string.Format("{0:00}", input.to_date.Value.Day));
            Tuple<string, string> user_login = new Tuple<string, string>("p_user_login", input.user_login);
            tuples.Add(filter);
            tuples.Add(type);
            tuples.Add(user_login);
            DataSet dt = ManagementController.GetListTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Employee_Salary_By_Report_Attendance_V2_Search", tuples);
            string p_from_date = input.from_date.Value.ToString("yyyy-MM-dd");
            string p_to_date = input.to_date.Value.ToString("yyyy-MM-dd");
            //Begin check in / out
            string qr0 = @"EXEC [dbo].[HRM_Employee_Check_In_Out_Report_Attendance_v2_Search] @p_from_date= '" + p_from_date + @"' ,@p_to_date= '" + p_to_date + @"'";

            DataTable DataCheckInOutAll =  ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Employee_Check_In_Out", qr0);
            
            List<Tuple<string, string>> tuplesRequest = new List<Tuple<string, string>>();
            Tuple<string, string> filterRequest = new Tuple<string, string>("p_from_date", input.from_date.Value.ToString("yyyy-MM-dd HH:mm:ss"));
            Tuple<string, string> typeRequest = new Tuple<string, string>("p_to_date", input.to_date.Value.ToString("yyyy-MM-dd HH:mm:ss"));
            tuplesRequest.Add(filterRequest);
            tuplesRequest.Add(typeRequest);
            DataSet dtRequest = ManagementController.GetListTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_TimeSheet_Request_Search", tuplesRequest);

            DataTable DataAttendanceAll = dtRequest.Tables[0];
            //    ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_TimeSheet_Attendance", @"
            //        SELECT A.request_account,A.start_datetime,A.end_datetime,is_salary
            //        FROM HRM_TimeSheet_Attendance A
            //        LEFT JOIN HRM_TimeSheet_Attendance_Type_Off B ON A.type_off = B.code
            //        WHERE A.approve_status = '1D8A876E-01F6-43E2-BFB0-1491B6BAD019' 
            //         AND A.start_datetime between '" + p_from_date + @"' AND '" + p_to_date + @"'
            //");
            DataTable DataSoonLateRequestAll = dtRequest.Tables[1];
            //    ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_TimeSheet_Employee_Soon_Late_Register", @"
            //            SELECT A.request_account,A.start_datetime,A.end_datetime,B.is_salary
            //            FROM HRM_TimeSheet_Employee_Soon_Late_Register A
            //            LEFT JOIN HRM_TimeSheet_Employee_Soon_Late_Register_Type B ON A.type_request = B.code
            //            WHERE 
            //         A.approve_status = '16D1477B-621F-4F3C-A76C-4416A64C6A95' 
            //         AND A.start_datetime between '" + p_from_date + @"' AND '" + p_to_date + @"'
            //");
            DataTable DataMissionAllowanceAll = dtRequest.Tables[2];
            //    ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Timesheet_Employee_Mission_Allowance", @"
            //            SELECT request_account,start_datetime,end_datetime
            //            FROM HRM_Timesheet_Employee_Mission_Allowance
            //            WHERE 
            //             approve_status = '89A02050-762E-4BB0-9FD8-AEAFE51344C1' 
            //         AND FORMAT(start_datetime,'yyyy-MM-dd') between '" + p_from_date + @"' AND '" + p_to_date + @"'
            //");
            DataTable DataUpdateTimkeepingAll = dtRequest.Tables[3];
            //    ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Timesheet_Employee_Update_Timkeeping", @"
            //            SELECT request_account,start_datetime,end_datetime
            //            FROM HRM_Timesheet_Employee_Update_Timkeeping
            //            WHERE 
            //             approve_status = 'B070F6BE-91C9-426F-A3C3-8798A923B268' 
            //         AND FORMAT(start_datetime,'yyyy-MM-dd') between '" + p_from_date + @"' AND '" + p_to_date + @"'
            //");
            DataTable DataWorkShiftAll =  ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_TimeSheet_Work_Shift", @"EXEC [dbo].[HRM_TimeSheet_Work_Shift_Search] @p_type = 'ALL'");
            //End check in / out

            foreach(DataRow rowEmployee in dt.Tables[0].Rows)
            {
                List<PointInOutModel> pointInOuts = new List<PointInOutModel>();
                string[] listWorkShift = rowEmployee["work_shifts"].ToString().Split(";");
                DataRow[] rowWorkShift = new DataRow[listWorkShift.Length];
                List<HRM_TimeSheet_Work_Shift_Detail_ENTITY> rowWorkShiftDetail = new List<HRM_TimeSheet_Work_Shift_Detail_ENTITY>();
                DateTime date_quit_company = DateTime.Now;
                try { 
                    if(rowEmployee["date_quit_company"] != null)
                        date_quit_company = DateTime.Parse(rowEmployee["date_quit_company"].ToString()); 
                } catch{ }
                for (int i = 0; i < listWorkShift.Length; i++)
                {
                    rowWorkShift[i] = DataWorkShiftAll.Select("code = '" + listWorkShift[i] + "'")[0];
                    var detail = await HRM_TimeSheetService.HRM_TimeSheet_Work_Shift_Detail_Search(new HRM_TimeSheet_Work_Shift_Detail_ENTITY { work_shift_code = listWorkShift[i] });
                    var concat = new List<HRM_TimeSheet_Work_Shift_Detail_ENTITY>(rowWorkShiftDetail.Count + detail.Count);
                    concat.AddRange(rowWorkShiftDetail);
                    concat.AddRange(detail);
                    rowWorkShiftDetail = concat;
                }
                pointInOuts = HRMController.GetPointLandByWorkShift(rowWorkShift, rowWorkShiftDetail);
                foreach(DataRow rowCheckInOut in dt.Tables[1].Rows)
                {
                    if (rowCheckInOut["account_id"].ToString() == rowEmployee["account_id"].ToString())
                    {
                        for(int i = 0;i< dt.Tables[1].Columns.Count; i++)
                        {
                            string colName = dt.Tables[1].Columns[i].ColumnName;
                            if(colName.Split('_').Length==3)
                            {
                                PointInOutModel point_input = new PointInOutModel();
                                try
                                {
                                    string date = colName.Split('_')[2] + "-" + colName.Split('_')[1] + "-" + colName.Split('_')[0];
                                    DateTime dateTime = DateTime.Parse(date);
                                    if (DateTime.Compare(dateTime, date_quit_company) < 0) //chưa nghỉ
                                    {
                                        DataRow currrnt_check_in = DataCheckInOutAll.Select("check_time = '" + date + "' and employee_code = '" + rowEmployee["code"].ToString() + "'")[0];
                                        point_input.in1 = new TimeSpan(int.Parse(currrnt_check_in["check_in"].ToString().Split(':')[0]), int.Parse(currrnt_check_in["check_in"].ToString().Split(':')[1]), 0);
                                        point_input.out1 = new TimeSpan(int.Parse(currrnt_check_in["check_out"].ToString().Split(':')[0]), int.Parse(currrnt_check_in["check_out"].ToString().Split(':')[1]), 0);
                                        point_input.in2 = point_input.out1;
                                        point_input.out2 = point_input.out1;
                                        rowCheckInOut[colName] = HRMController.GetDayWorkShift(pointInOuts, point_input);
                                    }
                                    else rowCheckInOut[colName] = 0;
                                }
                                catch
                                {
                                    rowCheckInOut[colName] = 0;
                                }
                            }    
                        }
                        break;
                    }
                }
                
                //Begin Attendance
                DataRow[] listAttendance = DataAttendanceAll.Select("request_account = '" + rowEmployee["code"].ToString() + "'");
                foreach (DataRow attendance in listAttendance)
                {
                    double attendance_is_salary_0 = 0;
                    double attendance_is_salary_1 = 0;
                    
                    string start_string = attendance["start_datetime"].ToString();
                    string end_string = attendance["end_datetime"].ToString();
                    DateTime start_datetime = DateTime.Parse(attendance["start_datetime"].ToString());
                    DateTime end_datetime = DateTime.Parse(attendance["end_datetime"].ToString());
                    PointInOutModel point_request = new PointInOutModel();
                    point_request.in1 = new TimeSpan(start_datetime.Hour, start_datetime.Minute, 0);
                    point_request.out1 = new TimeSpan(end_datetime.Hour, end_datetime.Minute, 0);
                    point_request.in2 = point_request.out1;
                    point_request.out2 = point_request.out1;

                    if (start_datetime.ToString("dd-MM-yyyy") == end_datetime.ToString("dd-MM-yyyy"))
                    {
                        //Begin get work day check in/out
                        double work_day_check_in_out = 0;
                        try
                        {
                            string colName = start_datetime.Day.ToString("00")+"_"+ start_datetime.Month.ToString("00") + "_"+ start_datetime.Year;
                            work_day_check_in_out = double.Parse(dt.Tables[1].Select("employee_code = '" + rowEmployee["code"].ToString() + "'")[0][colName].ToString());
                        }
                        catch { }
                        //Begin get work day check in/out
                        double wd = HRMController.GetDayWorkShift(pointInOuts, point_request);
                        if((work_day_check_in_out + wd) > 1) wd = 1 - work_day_check_in_out;
                        if (attendance["is_salary"].ToString() == "True")
                            attendance_is_salary_1 = wd;
                        else
                            attendance_is_salary_0 = wd;
                    }
                    else
                    {
                        double total_attendance = 0;
                        //Begin get work day check in/out
                        double work_day_check_in_out = 0;
                        //point_request.in1 = new TimeSpan(start_datetime.Hour, start_datetime.Minute, 0);
                        //point_request.out1 = new TimeSpan(23, 59, 59);
                        //point_request.in2 = point_request.out1;
                        //point_request.out2 = point_request.out1;
                        //total_attendance = HRMController.GetDayWorkShift(pointInOuts, point_request);

                        int day_diff = (end_datetime - start_datetime).Days;
                        DateTime startT = start_datetime;
                        for (int d = start_datetime.Day; d <= end_datetime.Day; d++)
                        {
                            point_request.in1 = new TimeSpan(0, 1, 0);
                            point_request.out1 = new TimeSpan(23, 59, 0);
                            point_request.in2 = point_request.out1;
                            point_request.out2 = point_request.out1;
                            work_day_check_in_out = 0;
                            try
                            {
                                string colName = startT.Day.ToString("00") + "_" + startT.Month.ToString("00") + "_" + startT.Year;
                                work_day_check_in_out = double.Parse(dt.Tables[1].Select("employee_code = '" + rowEmployee["code"].ToString() + "'")[0][colName].ToString());
                            }
                            catch { }
                            double wd = HRMController.GetDayWorkShift(pointInOuts, point_request);
                            if ((work_day_check_in_out + wd) > 1)
                                total_attendance += 1 - work_day_check_in_out;
                            else
                                total_attendance += HRMController.GetDayWorkShift(pointInOuts, point_request);
                            startT = startT.AddDays(1);
                        }

                        //point_request.in1 = new TimeSpan(0, 1, 0);
                        //point_request.out1 = new TimeSpan(end_datetime.Hour, end_datetime.Minute, 0);
                        //point_request.in2 = point_request.out1;
                        //point_request.out2 = point_request.out1;
                        //total_attendance += HRMController.GetDayWorkShift(pointInOuts, point_request);
                        if (attendance["is_salary"].ToString() == "True")
                            attendance_is_salary_1 = total_attendance;
                        else
                            attendance_is_salary_0 = total_attendance;
                    }
                    foreach (DataRow rowAttendance in dt.Tables[2].Rows)
                    {
                        if (rowAttendance["request_account"].ToString() == rowEmployee["code"].ToString())
                        {
                            rowAttendance["attendance_is_salary_0"] = (double)rowAttendance["attendance_is_salary_0"] + attendance_is_salary_0;
                            rowAttendance["attendance_is_salary_1"] = (double)rowAttendance["attendance_is_salary_1"] + attendance_is_salary_1;
                            break;
                        }
                    }
                }
                //End Attendance
                //Begin Soon late request
                DataRow[] listSoonLat = DataSoonLateRequestAll.Select("request_account = '" + rowEmployee["code"].ToString() + "'");
                double soon_late_is_salary_0 = 0;
                double soon_late_is_salary_1 = 0;
                foreach (DataRow soonlate in listSoonLat)
                {
                    string start_string = soonlate["start_datetime"].ToString();
                    string end_string = soonlate["end_datetime"].ToString();
                    DateTime start_datetime = DateTime.Parse(soonlate["start_datetime"].ToString());
                    DateTime end_datetime = DateTime.Parse(soonlate["end_datetime"].ToString());
                    PointInOutModel point_request = new PointInOutModel();
                    point_request.in1 = new TimeSpan(start_datetime.Hour, start_datetime.Minute, 0);
                    point_request.out1 = new TimeSpan(end_datetime.Hour, end_datetime.Minute, 0);
                    point_request.in2 = point_request.out1;
                    point_request.out2 = point_request.out1;

                    if (start_datetime.ToString("dd-MM-yyyy") == end_datetime.ToString("dd-MM-yyyy"))
                    {
                        //Begin get work day check in/out
                        double work_day_check_in_out = 0;
                        try
                        {
                            string colName = start_datetime.Day.ToString("00") + "_" + start_datetime.Month.ToString("00") + "_" + start_datetime.Year;
                            work_day_check_in_out = double.Parse(dt.Tables[1].Select("employee_code = '" + rowEmployee["code"].ToString() + "'")[0][colName].ToString());
                        }
                        catch { }
                        //Begin get work day check in/out
                        double wd = HRMController.GetDayWorkShift(pointInOuts, point_request);
                        if ((work_day_check_in_out + wd) > 1) wd = 1 - work_day_check_in_out;
                        if (soonlate["is_salary"].ToString() == "True")
                            soon_late_is_salary_1 += wd;
                        else
                            soon_late_is_salary_0 += wd;

                        //if (soonlate["is_salary"].ToString() == "True")
                        //    soon_late_is_salary_1 = HRMController.GetDayWorkShift(pointInOuts, point_request);
                        //else
                        //    soon_late_is_salary_0 = HRMController.GetDayWorkShift(pointInOuts, point_request);
                    }
                    else
                    {
                        double total_soon_late = 0;

                        point_request.in1 = new TimeSpan(start_datetime.Hour, start_datetime.Minute, 0);
                        point_request.out1 = new TimeSpan(23, 59, 59);
                        point_request.in2 = point_request.out1;
                        point_request.out2 = point_request.out1;
                        total_soon_late = HRMController.GetDayWorkShift(pointInOuts, point_request);

                        int day_diff = (end_datetime - start_datetime).Days;
                        if (day_diff > 1)
                        {
                            for (int d = 1; d < day_diff; d++)
                            {
                                point_request.in1 = new TimeSpan(0, 1, 0);
                                point_request.out1 = new TimeSpan(23, 59, 0);
                                point_request.in2 = point_request.out1;
                                point_request.out2 = point_request.out1;
                                total_soon_late += HRMController.GetDayWorkShift(pointInOuts, point_request);
                            }
                        }

                        point_request.in1 = new TimeSpan(0, 1, 0);
                        point_request.out1 = new TimeSpan(end_datetime.Hour, end_datetime.Minute, 0);
                        point_request.in2 = point_request.out1;
                        point_request.out2 = point_request.out1;
                        total_soon_late += HRMController.GetDayWorkShift(pointInOuts, point_request);
                        if (soonlate["is_salary"].ToString() == "True")
                            soon_late_is_salary_1 += total_soon_late;
                        else
                            soon_late_is_salary_0 += total_soon_late;
                    }
                }
                foreach (DataRow rowSoonLate in dt.Tables[3].Rows)
                {
                    if (rowSoonLate["request_account"].ToString() == rowEmployee["code"].ToString())
                    {
                        rowSoonLate["soon_late_is_salary_0"] = soon_late_is_salary_0;
                        rowSoonLate["soon_late_is_salary_1"] = soon_late_is_salary_1;
                        break;
                    }
                }
                //End Soon late request
                //Begin Mission Allowance
                DataRow[] listMissionAllowance = DataMissionAllowanceAll.Select("request_account = '" + rowEmployee["code"].ToString() + "'");
                double mission_allowance = 0;
                foreach (DataRow missionAllowance in listMissionAllowance)
                {
                    string start_string = missionAllowance["start_datetime"].ToString();
                    string end_string = missionAllowance["end_datetime"].ToString();
                    DateTime start_datetime = DateTime.Parse(missionAllowance["start_datetime"].ToString());
                    DateTime end_datetime = DateTime.Parse(missionAllowance["end_datetime"].ToString());
                    PointInOutModel point_request = new PointInOutModel();
                    point_request.in1 = new TimeSpan(start_datetime.Hour, start_datetime.Minute, 0);
                    point_request.out1 = new TimeSpan(end_datetime.Hour, end_datetime.Minute, 0);
                    point_request.in2 = point_request.out1;
                    point_request.out2 = point_request.out1;

                    if (start_datetime.ToString("dd-MM-yyyy") == end_datetime.ToString("dd-MM-yyyy"))
                    {
                        //Begin get work day check in/out
                        double work_day_check_in_out = 0;
                        try
                        {
                            string colName = string.Format("{0:00}", start_datetime.Day) + "_" + string.Format("{0:00}", start_datetime.Month) + "_" + start_datetime.Year;
                            work_day_check_in_out = double.Parse(dt.Tables[1].Select("employee_code = '" + rowEmployee["code"].ToString() + "'")[0][colName].ToString());
                        }
                        catch { }
                        //Begin get work day check in/out
                        double wd = HRMController.GetDayWorkShift(pointInOuts, point_request);
                        if ((work_day_check_in_out + wd) > 1) wd = 1 - work_day_check_in_out;
                        mission_allowance += wd;

                        //mission_allowance = HRMController.GetDayWorkShift(pointInOuts, point_request);
                    }
                    else
                    {
                        point_request.in1 = new TimeSpan(start_datetime.Hour, start_datetime.Minute, 0);
                        point_request.out1 = new TimeSpan(23, 59, 59);
                        point_request.in2 = point_request.out1;
                        point_request.out2 = point_request.out1;
                        mission_allowance = HRMController.GetDayWorkShift(pointInOuts, point_request);

                        int day_diff = (end_datetime - start_datetime).Days;
                        if (day_diff > 1)
                        {
                            for (int d = 1; d < day_diff; d++)
                            {
                                point_request.in1 = new TimeSpan(0, 1, 0);
                                point_request.out1 = new TimeSpan(23, 59, 0);
                                point_request.in2 = point_request.out1;
                                point_request.out2 = point_request.out1;
                                mission_allowance += HRMController.GetDayWorkShift(pointInOuts, point_request);
                            }
                        }

                        point_request.in1 = new TimeSpan(0, 1, 0);
                        point_request.out1 = new TimeSpan(end_datetime.Hour, end_datetime.Minute, 0);
                        point_request.in2 = point_request.out1;
                        point_request.out2 = point_request.out1;
                        mission_allowance += HRMController.GetDayWorkShift(pointInOuts, point_request);
                    }
                }
                foreach (DataRow rowMissionAllowance in dt.Tables[5].Rows)
                {
                    if (rowMissionAllowance["request_account"].ToString() == rowEmployee["code"].ToString())
                    {
                        rowMissionAllowance["mission_allowance"] = mission_allowance;
                        break;
                    }
                }
                //End Mission Allowance
                //Begin Update Timkeeping
                DataRow[] listUpdateTimkeeping = DataUpdateTimkeepingAll.Select("request_account = '" + rowEmployee["code"].ToString() + "'");
                double update_timkeeping_value = 0;
                foreach (DataRow updateTimkeeping in listUpdateTimkeeping)
                {
                    string start_string = updateTimkeeping["start_datetime"].ToString();
                    string end_string = updateTimkeeping["end_datetime"].ToString();
                    DateTime start_datetime = DateTime.Parse(updateTimkeeping["start_datetime"].ToString());
                    DateTime end_datetime = DateTime.Parse(updateTimkeeping["end_datetime"].ToString());
                    PointInOutModel point_request = new PointInOutModel();
                    point_request.in1 = new TimeSpan(start_datetime.Hour, start_datetime.Minute, 0);
                    point_request.out1 = new TimeSpan(end_datetime.Hour, end_datetime.Minute, 0);
                    point_request.in2 = point_request.out1;
                    point_request.out2 = point_request.out1;

                    if (start_datetime.ToString("dd-MM-yyyy") == end_datetime.ToString("dd-MM-yyyy"))
                    {
                        //Begin get work day check in/out
                        double work_day_check_in_out = 0;
                        try
                        {
                            string colName = start_datetime.Day.ToString("00") + "_" + start_datetime.Month.ToString("00") + "_" + start_datetime.Year;
                            work_day_check_in_out = double.Parse(dt.Tables[1].Select("employee_code = '" + rowEmployee["code"].ToString() + "'")[0][colName].ToString());
                        }
                        catch { }
                        //Begin get work day check in/out
                        double wd = HRMController.GetDayWorkShift(pointInOuts, point_request);
                        if ((work_day_check_in_out + wd) > 1) wd = 1 - work_day_check_in_out;
                        update_timkeeping_value += wd;
                        //update_timkeeping_value = HRMController.GetDayWorkShift(pointInOuts, point_request);
                    }
                    else
                    {
                        point_request.in1 = new TimeSpan(start_datetime.Hour, start_datetime.Minute, 0);
                        point_request.out1 = new TimeSpan(23, 59, 59);
                        point_request.in2 = point_request.out1;
                        point_request.out2 = point_request.out1;
                        update_timkeeping_value = HRMController.GetDayWorkShift(pointInOuts, point_request);

                        int day_diff = (end_datetime - start_datetime).Days;
                        if (day_diff > 1)
                        {
                            for (int d = 1; d < day_diff; d++)
                            {
                                point_request.in1 = new TimeSpan(0, 1, 0);
                                point_request.out1 = new TimeSpan(23, 59, 0);
                                point_request.in2 = point_request.out1;
                                point_request.out2 = point_request.out1;
                                update_timkeeping_value += HRMController.GetDayWorkShift(pointInOuts, point_request);
                            }
                        }

                        point_request.in1 = new TimeSpan(0, 1, 0);
                        point_request.out1 = new TimeSpan(end_datetime.Hour, end_datetime.Minute, 0);
                        point_request.in2 = point_request.out1;
                        point_request.out2 = point_request.out1;
                        update_timkeeping_value += HRMController.GetDayWorkShift(pointInOuts, point_request);
                    }
                }
                foreach (DataRow rowMissionAllowance in dt.Tables[6].Rows)
                {
                    if (rowMissionAllowance["request_account"].ToString() == rowEmployee["code"].ToString())
                    {
                        rowMissionAllowance["update_timkeeping_value"] = update_timkeeping_value + double.Parse(rowMissionAllowance["update_timkeeping_value"].ToString());
                        break;
                    }
                }
                //End Update Timkeeping
            }
            //Begin check regulation
            int regulation_residual = 0;
            foreach (DataRow rowViolate in dt.Tables[8].Rows)
            {
                List<RegulationModel> regulation_soon_lateAll = new List<RegulationModel>();
                foreach (DataRow regu in dt.Tables[11].Rows)
                {
                    regulation_soon_lateAll.Add(new RegulationModel
                    {
                        type = regu["type"].ToString(),
                        time = decimal.Parse(regu["minute"].ToString()),
                        times = int.Parse(regu["times"].ToString()),
                        work_day_minus = decimal.Parse(regu["work_day_minus"].ToString()),
                        count = 0
                    });
                }
                string request_account = rowViolate["request_account"].ToString();
                int soon = int.Parse(rowViolate["soon"].ToString());
                int late = int.Parse(rowViolate["late"].ToString());
                List<RegulationModel> regulation_late = regulation_soon_lateAll.FindAll(f => f.type == "late");
                List<RegulationModel> regulation_soon = regulation_soon_lateAll.FindAll(f => f.type == "soon");
                DataRow[] list_violate_soon = dt.Tables[12].Select("request_account = '" + request_account + "' and minute_soon > 0");
                DataRow[] attendances = DataAttendanceAll.Select("request_account = '" + request_account + "'"); ;
                DataRow[] listSoonLates = DataSoonLateRequestAll.Select("request_account = '" + request_account + "'");
                DataRow[] mission_allowances = DataMissionAllowanceAll.Select("request_account = '" + request_account + "'");
                //DataRow[] branch = DataMissionAllowanceAll.Select("request_account = '" + request_account + "'");
                //Soom
                if (soon > 0)
                {
                    foreach (DataRow rowViolateSoon in list_violate_soon)
                    {
                        DateTime soon_date = DateTime.Parse(((DateTime)rowViolateSoon["date_soon"]).ToString("yyyy-MM-dd HH:mm"));
                        DateTime late_date = DateTime.Parse(((DateTime)rowViolateSoon["date_soon"]).ToString("yyyy-MM-dd HH:mm"));
                        int minute = Convert.ToInt32(decimal.Parse(rowViolateSoon["minute_soon"].ToString()));
                        int minute_request = HRMController.FindAndReSetTimeSoonLate(attendances, listSoonLates, mission_allowances, soon_date, late_date, true, false);
                        decimal work_day = 0;
                        DataRow[] rows = dt.Tables[1].Select("employee_code = '" + request_account + "'");
                        if (rows.Length > 0) work_day = decimal.Parse(rows[0][late_date.ToString("dd_MM_yyyy")].ToString());
                        int minute_compare = minute - minute_request;
                        HRMController.FindAndSetRegulation(minute_request, soon_date, work_day, ref regulation_soon);
                    }
                }
                //Late
                if (late > 0)
                {
                    DataRow[] list_violate_late = dt.Tables[12].Select("request_account = '" + request_account + "' and minute_late > 0");
                    foreach (DataRow rowViolateLate in list_violate_late)
                    {
                        DateTime soon_date = DateTime.Parse(((DateTime)rowViolateLate["date_late"]).ToString("yyyy-MM-dd HH:mm"));
                        DateTime late_date = DateTime.Parse(((DateTime)rowViolateLate["date_late"]).ToString("yyyy-MM-dd HH:mm"));
                        int minute = Convert.ToInt32(decimal.Parse(rowViolateLate["minute_late"].ToString()));
                        int minute_request = HRMController.FindAndReSetTimeSoonLate(attendances, listSoonLates, mission_allowances, soon_date, late_date, false, true);
                        decimal work_day = 0;
                        DataRow[] rows = dt.Tables[1].Select("employee_code = '"+ request_account + "'");
                        if (rows.Length > 0) work_day = decimal.Parse(rows[0][late_date.ToString("dd_MM_yyyy")].ToString());
                        int minute_compare = minute - minute_request;
                        HRMController.FindAndSetRegulation(minute_request, late_date, work_day, ref regulation_late);
                    }
                }
                string tr_table_log = "";
                rowViolate["work_day_minus"] = HRMController.TotalWorkDayMinus(regulation_soon, regulation_late,ref tr_table_log);
                rowViolate["log_info"] = tr_table_log;
            }
            //End check regulation
            result.table_employees = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[0]).ToString();
            result.table_day = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[1]).ToString();
            result.table_attendance = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[2]).ToString();
            result.table_soon_late = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[3]).ToString();
            result.table_overtime = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[4]).ToString();
            result.mission_allowance = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[5]).ToString();
            result.table_update_timkeeping = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[6]).ToString();
            result.table_holiday = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[7]).ToString();
            result.table_checkin_out_soon_late = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[8]).ToString();
            result.labour_contract_salary = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[9]).ToString();
            result.employee_labour_contract_appendix = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[10]).ToString();
            result.table_check_in_out_soon_late_regulation = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[11]).ToString();
            result.table_check_in_out_soon_late_detail = ManagementController.DataTableToJSONWithStringBuilder(dt.Tables[12]).ToString();

            return result;
        }
        
        [HttpPost]
        public async Task<List<HRM_Timesheet_Employee_Overtime_Type_ENTITY>> HRM_Timesheet_Employee_Overtime_Type_Search()
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Overtime_Type_Search(new HRM_Timesheet_Employee_Overtime_Type_ENTITY());
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Timesheet_Employee_Overtime_Type_Actions([FromBody] HRM_Timesheet_Employee_Overtime_Type_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_Timesheet_Employee_Overtime_Type_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY>> HRM_TimeSheet_Employee_Soon_Late_Regulation_Search([FromBody] HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY input)
        {
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Soon_Late_Regulation_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_TimeSheet_Employee_Soon_Late_Regulation_Update([FromBody] List<HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY> input)
        {
            HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY param = new HRM_TimeSheet_Employee_Soon_Late_Regulation_ENTITY();
            param.xml = input.ToXmlFromList();
            var result = await HRM_TimeSheetService.HRM_TimeSheet_Employee_Soon_Late_Regulation_Update(param);
            return result;
        }
    }
}
