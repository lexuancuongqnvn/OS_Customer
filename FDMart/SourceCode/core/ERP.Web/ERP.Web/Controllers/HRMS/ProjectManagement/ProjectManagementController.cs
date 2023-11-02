using Common.Utils;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.System.Intfs.Department.Dto;
using ERP.Web.Controllers.System;
using HRMS.Intfs.ProjectManagement;
using HRMS.Intfs.ProjectManagement.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.Text;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.HRMS.ProjectManagement
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class ProjectManagementController : ControllerBase
    {
        private readonly IProjectManagementService projectManagementService;

        public ProjectManagementController(IProjectManagementService projectManagementService)
        {
            this.projectManagementService = projectManagementService;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Delete([FromBody] HRM_Project_Management_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Insert([FromBody] HRM_Project_Management_ENTITY input)
        {
            input.XML = input.Project_Management_Tasks.ToXmlFromList();
            var result = await projectManagementService.HRM_Project_Management_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Project_Management_ENTITY>> HRM_Project_Management_Search([FromBody] HRM_Project_Management_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Search(input);
            DataTable HRM_Project_Management_Task = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Project_Management_Task", @"SELECT code,name,project_code FROM HRM_Project_Management_Task WHERE in_task is null or in_task = ''");
            foreach(HRM_Project_Management_ENTITY item in result)
            {
                DataRow[] list_topic = HRM_Project_Management_Task.Select("project_code='"+ item .code+ "'");
                if(list_topic.Length > 0)
                {
                    foreach(DataRow row in list_topic)
                    {
                        HRM_Project_Management_Task_ENTITY t = new HRM_Project_Management_Task_ENTITY();
                        t.topic_code = row["code"].ToString();
                        t.topic_name = row["name"].ToString();
                        if(item.Project_Management_Tasks == null) item.Project_Management_Tasks = new List<HRM_Project_Management_Task_ENTITY>();
                        item.Project_Management_Tasks.Add(t);
                    }
                }    
            }
            return result;
        }
        [HttpPost]
        public async Task<HRM_Project_Management_Dashboard_Workflow_ENTITY> HRM_Project_Management_Dashboard_Workflow_Search([FromBody] HRM_Project_Management_Dashboard_Workflow_ENTITY input)
        {
            HRM_Project_Management_ENTITY pr_proj = new HRM_Project_Management_ENTITY();
            pr_proj.account_code = input.account_code;
            input.list_projects = await projectManagementService.HRM_Project_Management_Search(pr_proj);
            input.total_project = input.list_projects.Count;

            HRM_Project_Management_Task_ENTITY pr_task = new HRM_Project_Management_Task_ENTITY();
            pr_proj.account_code = input.account_code;
            List<HRM_Project_Management_Task_ENTITY> list_task = await projectManagementService.HRM_Project_Management_Task_Search(pr_task);
            input.total_task = list_task.Count;
            input.total_task_inprogress = list_task.FindAll(e=>e.percent_done > 0 && e.percent_done < 100).Count;
            input.total_task_expiry_task = list_task.FindAll(e=>e.is_expiry_task == true).Count;

            input.task_month = new HRM_Project_Management_Task_Month_ENTITY();
            try {
                DateTime jan_b = new DateTime(DateTime.Now.Year, 1, 1, 0, 0, 0);
                DateTime jan_e = new DateTime(DateTime.Now.Year, 1, DateTime.DaysInMonth(DateTime.Now.Year, 1), 0, 0, 0);
                input.task_month.jan = list_task.FindAll(e => DateTime.Compare(jan_b, e.date_add) <= 0 && DateTime.Compare(jan_e, e.date_add) >= 0).Count;

                DateTime feb_b = new DateTime(DateTime.Now.Year, 2, 1, 0, 0, 0);
                DateTime feb_e = new DateTime(DateTime.Now.Year, 2, DateTime.DaysInMonth(DateTime.Now.Year, 2), 0, 0, 0);
                input.task_month.feb = list_task.FindAll(e => DateTime.Compare(feb_b, e.date_add) <= 0 && DateTime.Compare(feb_e, e.date_add) >= 0).Count;

                DateTime mar_b = new DateTime(DateTime.Now.Year, 3, 1, 0, 0, 0);
                DateTime mar_e = new DateTime(DateTime.Now.Year, 3, DateTime.DaysInMonth(DateTime.Now.Year, 3), 0, 0, 0);
                input.task_month.mar = list_task.FindAll(e => DateTime.Compare(mar_b, e.date_add) <= 0 && DateTime.Compare(mar_e, e.date_add) >= 0).Count;

                DateTime apr_b = new DateTime(DateTime.Now.Year, 4, 1, 0, 0, 0);
                DateTime apr_e = new DateTime(DateTime.Now.Year, 4, DateTime.DaysInMonth(DateTime.Now.Year, 4), 0, 0, 0);
                input.task_month.apr = list_task.FindAll(e => DateTime.Compare(apr_b, e.date_add) <= 0 && DateTime.Compare(apr_e, e.date_add) >= 0).Count;

                DateTime mai_b = new DateTime(DateTime.Now.Year, 5, 1, 0, 0, 0);
                DateTime mai_e = new DateTime(DateTime.Now.Year, 5, DateTime.DaysInMonth(DateTime.Now.Year, 5), 0, 0, 0);
                input.task_month.mai = list_task.FindAll(e => DateTime.Compare(mai_b, e.date_add) <= 0 && DateTime.Compare(mai_e, e.date_add) >= 0).Count;

                DateTime jun_b = new DateTime(DateTime.Now.Year, 6, 1, 0, 0, 0);
                DateTime jun_e = new DateTime(DateTime.Now.Year, 6, DateTime.DaysInMonth(DateTime.Now.Year, 6), 0, 0, 0);
                input.task_month.jun = list_task.FindAll(e => DateTime.Compare(jun_b, e.date_add) <= 0 && DateTime.Compare(jun_e, e.date_add) >= 0).Count;

                DateTime jul_b = new DateTime(DateTime.Now.Year, 7, 1, 0, 0, 0);
                DateTime jul_e = new DateTime(DateTime.Now.Year, 7, DateTime.DaysInMonth(DateTime.Now.Year, 7), 0, 0, 0);
                input.task_month.jul = list_task.FindAll(e => DateTime.Compare(jul_b, e.date_add) <= 0 && DateTime.Compare(jul_e, e.date_add) >= 0).Count;

                DateTime aug_b = new DateTime(DateTime.Now.Year, 8, 1, 0, 0, 0);
                DateTime aug_e = new DateTime(DateTime.Now.Year, 8, DateTime.DaysInMonth(DateTime.Now.Year, 8), 0, 0, 0);
                input.task_month.aug = list_task.FindAll(e => DateTime.Compare(aug_b, e.date_add) <= 0 && DateTime.Compare(aug_e, e.date_add) >= 0).Count;

                DateTime sep_b = new DateTime(DateTime.Now.Year, 9, 1, 0, 0, 0);
                DateTime sep_e = new DateTime(DateTime.Now.Year, 9, DateTime.DaysInMonth(DateTime.Now.Year, 9), 0, 0, 0);
                input.task_month.sep = list_task.FindAll(e => DateTime.Compare(sep_b, e.date_add) <= 0 && DateTime.Compare(sep_e, e.date_add) >= 0).Count;

                DateTime oct_b = new DateTime(DateTime.Now.Year, 10, 1, 0, 0, 0);
                DateTime oct_e = new DateTime(DateTime.Now.Year, 10, DateTime.DaysInMonth(DateTime.Now.Year, 10), 0, 0, 0);
                input.task_month.oct = list_task.FindAll(e => DateTime.Compare(oct_b, e.date_add) <= 0 && DateTime.Compare(oct_e, e.date_add) >= 0).Count;

                DateTime nov_b = new DateTime(DateTime.Now.Year, 11, 1, 0, 0, 0);
                DateTime nov_e = new DateTime(DateTime.Now.Year, 11, DateTime.DaysInMonth(DateTime.Now.Year, 11), 0, 0, 0);
                input.task_month.nov = list_task.FindAll(e => DateTime.Compare(nov_b, e.date_add) <= 0 && DateTime.Compare(nov_e, e.date_add) >= 0).Count;

                DateTime dec_b = new DateTime(DateTime.Now.Year, 12, 1, 0, 0, 0);
                DateTime dec_e = new DateTime(DateTime.Now.Year, 12, DateTime.DaysInMonth(DateTime.Now.Year, 12), 0, 0, 0);
                input.task_month.dec = list_task.FindAll(e => DateTime.Compare(dec_b, e.date_add) <= 0 && DateTime.Compare(dec_e, e.date_add) >= 0).Count;


            } catch { }
            input.task_week = new HRM_Project_Management_Task_Week_ENTITY();
            try
            {
                CultureInfo myCI = new CultureInfo("en-US");
                Calendar myCal = myCI.Calendar;
                CalendarWeekRule myCWR = myCI.DateTimeFormat.CalendarWeekRule;
                DayOfWeek myFirstDOW = myCI.DateTimeFormat.FirstDayOfWeek;

                int no = 0;
                switch (myFirstDOW.ToString())
                {
                    case "Sunday":
                        no = 6;
                        break;
                    case "Monday":
                        no = 0;
                        break;
                    case "Tuesday":
                        no = 1;
                        break;
                    case "Wednesday":
                        no = 2;
                        break;
                    case "Thursday":
                        no = 3;
                        break;
                    case "Friday":
                        no = 4;
                        break;
                    case "Saturday":
                        no = 5;
                        break;
                }
                DateTime week_b = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - no, 0, 0, 0);

                input.task_week.mo = list_task.FindAll(e => week_b.Year == e.date_add.Year && week_b.Month == e.date_add.Month && week_b.Day == e.date_add.Day).Count;

                week_b = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - no + 1, 0, 0, 0);
                input.task_week.tu = list_task.FindAll(e => week_b.Year == e.date_add.Year && week_b.Month == e.date_add.Month && week_b.Day == e.date_add.Day).Count;

                week_b = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - no + 2, 0, 0, 0);
                input.task_week.we = list_task.FindAll(e => week_b.Year == e.date_add.Year && week_b.Month == e.date_add.Month && week_b.Day == e.date_add.Day).Count;

                week_b = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - no + 3, 0, 0, 0);
                input.task_week.th = list_task.FindAll(e => week_b.Year == e.date_add.Year && week_b.Month == e.date_add.Month && week_b.Day == e.date_add.Day).Count;

                week_b = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - no + 4, 0, 0, 0);
                input.task_week.fr = list_task.FindAll(e => week_b.Year == e.date_add.Year && week_b.Month == e.date_add.Month && week_b.Day == e.date_add.Day).Count;

                week_b = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - no + 5, 0, 0, 0);
                input.task_week.sa = list_task.FindAll(e => week_b.Year == e.date_add.Year && week_b.Month == e.date_add.Month && week_b.Day == e.date_add.Day).Count;

                week_b = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - no + 6, 0, 0, 0);
                input.task_week.su = list_task.FindAll(e => week_b.Year == e.date_add.Year && week_b.Month == e.date_add.Month && week_b.Day == e.date_add.Day).Count;

            }
            catch { }

            try
            {
                input.task_day = new HRM_Project_Management_Task_Day_ENTITY();
                input.task_day.labels = new List<string>();
                input.task_day.series = new List<int>();
                for(int i = 0; i < 23; i++)
                {
                    DateTime today_b = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, i, 0, 0);
                    DateTime today_e = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, i+1, 0, 0);
                    int count = list_task.FindAll(e => DateTime.Compare(today_b, e.date_add) <= 0 && DateTime.Compare(today_e, e.date_add) >= 0).Count;
                    if(count > 0)
                    {
                        input.task_day.labels.Add((i + 1).ToString()+"h");
                        input.task_day.series.Add(count);
                    }    
                }
            }
            catch { }


            DataTable Departments = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "tb", @"SELECT B.* FROM (
            SELECT [department_code] FROM HRM_Project_Management_Task
            where department_code is not null and department_code <> '' and project_code is not null and project_code <> ''
            group by [department_code]
            ) AS TB
            LEFT JOIN Department B ON TB.[department_code] = B.code WHERE ID IS NOT NULL");
            input.task_department = new HRM_Project_Management_Task_Department_ENTITY();
            input.task_department.labels = new List<string>();
            input.task_department.series = new ArrayList();

            for(int i = 1; i <=12; i++)
            {
                DateTime month_b = DateTime.Now.AddMonths(i-12);
                DateTime month_e = DateTime.Now.AddMonths(i - 11);
                input.task_department.labels.Add("T"+ month_b.Month.ToString()+"/"+ month_b.Year.ToString()); 
            }
            input.task_department.list_name = new List<string>();
            input.task_department_pie = new HRM_Project_Management_Task_Department_Pie_ENTITY();
            input.task_department_pie.labels = new List<string>();
            input.task_department_pie.series = new List<float>();
            foreach (DataRow item in Departments.Rows)
            {
                input.task_department.list_name.Add(item["name"].ToString());   
                ArrayList newDepartMent = new ArrayList();
                for (int i = 1; i <= 12; i++)
                {
                    DateTime month_b = DateTime.Now.AddMonths(i - 12);
                    DateTime month_e = DateTime.Now.AddMonths(i - 11);
                    int count = list_task.FindAll(e => DateTime.Compare(month_b, e.date_add) <= 0 && DateTime.Compare(month_e, e.date_add) >= 0 && e.department_code == item["code"].ToString()).Count;
                    newDepartMent.Add(count);
                }
                input.task_department.series.Add(newDepartMent); 

                float pr =0;
                try
                {
                    pr = (float)list_task.FindAll(e => string.IsNullOrEmpty(e.department_code) && e.department_code.Trim() == item["code"].ToString()).Count * 100 / list_task.Count;
                }
                catch { }
                input.task_department_pie.labels.Add(pr.ToString("##.##") + "%");
                input.task_department_pie.series.Add(pr);
            }

            return input;
        }
        [HttpPost]
        public async Task<HRM_Project_Management_Report_Project_Percent_ENTITY> HRM_Project_Management_Report_Project_Percent_Search([FromBody] HRM_Project_Management_Report_Project_Percent_ENTITY input)
        {
            HRM_Project_Management_Report_Project_Percent_ENTITY result = new HRM_Project_Management_Report_Project_Percent_ENTITY();
            HRM_Project_Management_ENTITY hRM_Project_Management_ENTITY = new HRM_Project_Management_ENTITY();
            hRM_Project_Management_ENTITY.account_code = input.account_code;
            result.hRM_Project_Managements = await projectManagementService.HRM_Project_Management_Report_Project_Percent_Search(hRM_Project_Management_ENTITY);
            DataTable Departments = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"),"tb", @"SELECT B.* FROM (
            SELECT [department_code] FROM HRM_Project_Management_Task
            where department_code is not null and department_code <> '' and project_code is not null and project_code <> ''
            group by [department_code]
            ) AS TB
            LEFT JOIN Department B ON TB.[department_code] = B.code");         
            DataTable ListTask = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Project_Management_Task", @"SELECT right('0000000'+convert(varchar(20),A.id),7) as id_reference,A.code,A.department_code,A.project_code,A.percent_done,A.name,B.FIRST_NAME + ' ' + B.LAST_NAME excutor FROM HRM_Project_Management_Task A
                LEFT JOIN SYS_Account_Infomation B ON A.executor = B.code
                where A.department_code is not null and A.department_code <> '' and A.project_code is not null and A.project_code <> '' and A.in_task is not null and A.in_task <> ''");
            DataTable ListProgressInWeek = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_Project_Management_Task_WorkTime_Report_Progress_In_Week", @"EXEC [dbo].[HRM_Project_Management_Task_WorkTime_Report_Progress_In_Week]
		        @p_start_date = NULL,
		        @p_end_date = NULL,
		        @p_department = NULL");

            var JSONSDepartmentString = new StringBuilder();
            var arlist1 = new ArrayList();
            arlist1.Add("''");
            for (int j = 0; j < Departments.Rows.Count; j++)
            {
                DataRow item = Departments.Rows[j];
                arlist1.Add(item["name"]);
            }
            result.arr_data_department_by_project = new ArrayList();
            result.arr_data_department_type = new ArrayList();
            result.arr_data_table_department_type = new ArrayList();
            result.arr_data_progress_in_week = new ArrayList();
            result.arr_data_department_by_project.Add(arlist1);
            result.arr_data_department_type.Add(arlist1);
            var arrlistT = new ArrayList();
                arrlistT.Add("year");  
                arrlistT.Add("Mới");  
                arrlistT.Add("Đang hoàn thành");  
                arrlistT.Add("Đã hoàn thành");
            result.arr_data_progress_in_week.Add(arrlistT);
            foreach (DataRow row in ListProgressInWeek.Rows)
            {
                arrlistT = new ArrayList();
                arrlistT.Add(DateTime.Parse(row["_day"].ToString()).ToString("dd/MM/yyyy"));  
                arrlistT.Add(row["_new"]);  
                arrlistT.Add(row["_inprogress"]);  
                arrlistT.Add(row["_done"]);  
                result.arr_data_progress_in_week.Add(arrlistT);
            }
            try
            {
                for (int i = 0; i < result.hRM_Project_Managements.Count; i++)
                {
                    HRM_Project_Management_ENTITY prj = result.hRM_Project_Managements[i];
                    if (prj.total_i > 0)
                    {
                        arlist1 = new ArrayList();
                        var arlisttype = new ArrayList();
                        var arlisttypeTable = new ArrayList();
                        JSONSDepartmentString.Append("[");
                        arlist1.Add(prj.name);
                        arlisttype.Add(prj.name);
                        arlisttypeTable.Add(prj.name);
                        for (int j = 0; j < Departments.Rows.Count; j++)
                        {
                            DataRow item = Departments.Rows[j];
                            DataRow[] dataRows = ListTask.Select("project_code = '" + prj.code + "' and department_code='" + item["code"] + "'");

                            arlist1.Add(dataRows.Length);
                            var arlisttype2 = new ArrayList();
                            var arlisttypeTable2 = new ArrayList();

                            var arlisttype3 = new ArrayList();
                            var arlisttypeTable3 = new ArrayList();
                            arlisttype3.Add("");
                            arlisttype3.Add("");
                            arlisttype2.Add(arlisttype3);

                            arlisttype3 = new ArrayList(); string strlisttype = ""; arlisttypeTable3 = new ArrayList();
                            DataRow[] dataRow_success = ListTask.Select("project_code = '" + prj.code + "' and department_code='" + item["code"] + "' and percent_done = 100");
                            arlisttype3.Add("Đã hoàn thành");
                            arlisttype3.Add(dataRow_success.Length);
                            arlisttype2.Add(arlisttype3);
                            for (int k = 0; k < dataRow_success.Length; k++)
                                strlisttype += @"<tr><td><span class=""status-type-done"">satus</span></td>
                                <td class=""text"" title =""" + dataRow_success[k]["name"] + @"""><a href=""/task-manage-list;id=" + dataRow_success[k]["id_reference"] + @""" target=""_blank"">" + dataRow_success[k]["name"] + @"</a></td>
                                <td title=""" + dataRow_success[k]["excutor"] + @""" >" + dataRow_success[k]["excutor"] + @"</td>
                            </tr>";
                            arlisttypeTable2.Add(strlisttype);

                            arlisttype3 = new ArrayList(); strlisttype = ""; arlisttypeTable3 = new ArrayList();
                            DataRow[] dataRow_inprogress = ListTask.Select("project_code = '" + prj.code + "' and department_code='" + item["code"] + "' and percent_done > 0 and percent_done < 100");
                            arlisttype3.Add("Đang hoàn thành");
                            arlisttype3.Add(dataRow_inprogress.Length);
                            arlisttype2.Add(arlisttype3);
                            for (int k = 0; k < dataRow_inprogress.Length; k++)
                                strlisttype += @"<tr><td><span class=""status-type-inprogress"">satus</span></td>
                                <td class=""text"" title =""" + dataRow_inprogress[k]["name"] + @"""><a href=""/task-manage-list;id=" + dataRow_inprogress[k]["id_reference"] + @"""  target=""_blank"">" + dataRow_inprogress[k]["name"] + @"</a></td>
                                <td title=""" + dataRow_inprogress[k]["excutor"] + @""" >" + dataRow_inprogress[k]["excutor"] + @"</td>
                            </tr>";
                            arlisttypeTable2.Add(strlisttype);

                            arlisttype3 = new ArrayList(); strlisttype = ""; arlisttypeTable3 = new ArrayList();
                            DataRow[] dataRow_new = ListTask.Select("project_code = '" + prj.code + "' and department_code='" + item["code"] + "' and percent_done = 0");
                            arlisttype3.Add("Mới");
                            arlisttype3.Add(dataRow_new.Length);
                            arlisttype2.Add(arlisttype3);
                            for (int k = 0; k < dataRow_new.Length; k++)
                                strlisttype += @"<tr><td><span class=""status-type-new"">satus</span></td>
                                <td class=""text"" title =""" + dataRow_new[k]["name"] + @"""><a href=""/task-manage-list;id=" + dataRow_new[k]["id_reference"] + @"""  target=""_blank"">" + dataRow_new[k]["name"] + @"</a></td>
                                <td title=""" + dataRow_new[k]["excutor"] + @""" >" + dataRow_new[k]["excutor"] + @"</td>
                            </tr>";
                            arlisttypeTable2.Add(strlisttype);

                            arlisttype.Add(arlisttype2);
                            arlisttypeTable.Add(arlisttypeTable2);
                        }
                        result.arr_data_department_by_project.Add(arlist1);
                        result.arr_data_department_type.Add(arlisttype);
                        result.arr_data_table_department_type.Add(arlisttypeTable);
                    }
                }
            }
            catch (Exception ex) {
            }
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Pin(string task_code,bool is_pin,string account_code)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Pin(task_code,is_pin, account_code);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Delete([FromBody] HRM_Project_Management_Task_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Delete(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Insert([FromBody] HRM_Project_Management_Task_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Project_Management_Task_ENTITY>> HRM_Project_Management_Task_Search([FromBody] HRM_Project_Management_Task_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Search(input);
            if (input.type != "BYPROJECT" && result != null)
            {
                try
                {
                    result[0].hRM_Project_Management_Task_Levels = await projectManagementService.HRM_Project_Management_Task_Search_Menu(result[0].code);

                    result[0].hRM_Project_Management_Task_Historys = await projectManagementService.HRM_Project_Management_Task_Historys_Search(result[0].code);
                }catch (Exception ex) { }
            }
            return result; 
        }
        [HttpPost]
        public async Task<List<HRM_Project_Management_ENTITY>> HRM_Project_Management_Search_ByCode(string code)
        {
            List<HRM_Project_Management_ENTITY> result = await projectManagementService.HRM_Project_Management_Search_ByCode(code);

            HRM_Project_Management_Task_ENTITY input = new HRM_Project_Management_Task_ENTITY();
            input.type = "BYPROJECT";
            input.project_code = code;
            var listTask = await projectManagementService.HRM_Project_Management_Task_Search(input);
            if(result != null)
            {
                foreach (HRM_Project_Management_ENTITY item in result)
                {
                    item.Project_Management_Tasks = listTask;
                }
            }
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Project_Management_Task_Status_ENTITY>> HRM_Project_Management_Task_Status_Search()
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Status_Search();
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Update([FromBody] HRM_Project_Management_Task_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Update([FromBody] HRM_Project_Management_ENTITY input)
        {
            input.XML = input.Project_Management_Tasks.ToXmlFromList();
            var result = await projectManagementService.HRM_Project_Management_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Project_Management_Task_Comment_ENTITY>> HRM_Project_Management_Task_Comment_Insert([FromBody] HRM_Project_Management_Task_Comment_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Comment_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Project_Management_Task_Comment_ENTITY>> HRM_Project_Management_Task_Comment_Search([FromBody] HRM_Project_Management_Task_Comment_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Comment_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Project_Management_Task_Type_ENTITY>> HRM_Project_Management_Task_Type_Search([FromBody] HRM_Project_Management_Task_Type_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Type_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Type_Actions([FromBody]HRM_Project_Management_Task_Type_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Type_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Project_Management_Task_Proprity_Level_ENTITY>> HRM_Project_Management_Task_Proprity_Level_Search([FromBody] HRM_Project_Management_Task_Proprity_Level_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Proprity_Level_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Proprity_Level_Actions([FromBody]HRM_Project_Management_Task_Proprity_Level_ENTITY input)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Proprity_Level_Actions(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Project_Management_Task_Notification_Update(string code, string type,string user_login, string to_user)
        {
            var result = await projectManagementService.HRM_Project_Management_Task_Notification_Update(code, type, user_login, to_user);
            return result;
        }
        [HttpGet]
        public async Task<List<HRM_Project_Management_Task_Level_ENTITY>> HRM_Project_Management_Task_Search_Menu(string level_task)
        {
            
            var result = await projectManagementService.HRM_Project_Management_Task_Search_Menu(level_task);
            return result;
        }
    }
}
