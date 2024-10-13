using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using ERP.Common.Controllers;
using HRMS.Intfs.TimeSheet.Dto;
using HRMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRMS.Controllers
{
    public class HRMController : Controller
    {
        public static List<PointInOutModel> GetPointLandByWorkShift(DataRow[] list_code_workshift, List<HRM_TimeSheet_Work_Shift_Detail_ENTITY> rowWorkShiftDetail)
        {
            List<PointInOutModel> points = new List<PointInOutModel>();

            //string qr = @"EXEC [dbo].[HRM_TimeSheet_Work_Shift_Search] @p_code = '" + list_code_workshift + @"'";
            //DataTable ListWorkShift = ManagementController.GetDataTable(ConnectController.GetConnectStringByKey("HRM"), "HRM_TimeSheet_Work_Shift_Search", qr);
            foreach (DataRow row in list_code_workshift)
            {
                PointInOutModel point = new PointInOutModel();
                DateTime start_time = DateTime.Parse(row["start_time"].ToString());
                DateTime end_time = DateTime.Parse(row["end_time"].ToString());
                var detail = rowWorkShiftDetail.Find(ws => ws.name.ToLower() == start_time.DayOfWeek.ToString().ToLower());
                if (detail != null && string.IsNullOrEmpty(detail.start_relax.ToString()) || string.IsNullOrEmpty(detail.end_relax.ToString()))
                {
                    point.in1 = new TimeSpan(start_time.Hour, start_time.Minute, 0);
                    point.out1 = new TimeSpan(end_time.Hour, end_time.Minute, 0);
                    point.in2 = point.out1;
                    point.out2 = point.out1;
                }
                else
                {
                    DateTime start_relax = (DateTime)detail.start_relax;
                    DateTime end_relax = (DateTime)detail.end_relax;
                    point.in1 = new TimeSpan(start_time.Hour, start_time.Minute, 0);
                    point.out1 = new TimeSpan(start_relax.Hour, start_relax.Minute, 0);
                    point.in2 = new TimeSpan(end_relax.Hour, end_relax.Minute, 0);
                    point.out2 = new TimeSpan(end_time.Hour, end_time.Minute, 0);
                }
                points.Add(point);
            }

            return points;
        }
        public static double GetDayWorkShift(List<PointInOutModel> points, PointInOutModel point_input)
        {
            double result = 0;

            foreach(PointInOutModel point in points)
            {
                double day_work_shift = 0;
                if(TimeSpan.Compare((TimeSpan)point.in2,(TimeSpan)point.out1) == 0) //work shift not relax
                {
                    day_work_shift = (point.out1 - point.in1).Value.TotalMinutes / 60;
                    TimeSpan tsDiff = DiffTimeSpan((TimeSpan)point.in1, (TimeSpan)point.out1, (TimeSpan)point_input.in1, (TimeSpan)point_input.out1);
                    if (tsDiff.TotalMinutes > 0) result += ((tsDiff.TotalMinutes / 60) / day_work_shift);
                }
                else//work shift has relax
                {
                    double totalMinutes = 0;
                    //Tính tổng công bao gồm giờ giải lao
                    TimeSpan tsDiff = DiffTimeSpan((TimeSpan)point.in1, (TimeSpan)point.out2, (TimeSpan)point_input.in1, (TimeSpan)point_input.out1);
                    if(tsDiff.TotalMinutes > 0) totalMinutes += tsDiff.TotalMinutes;
                    //tsDiff = DiffTimeSpan((TimeSpan)point.in2, (TimeSpan)point.out2, (TimeSpan)point_input.in1, (TimeSpan)point_input.out1);
                    //if (tsDiff.TotalMinutes > 0) totalMinutes += tsDiff.TotalMinutes;
                    
                    //Tính giờ giải lao
                    TimeSpan relex =(TimeSpan)(point.in2 - point.out1);
                    double minuteRelax = 0;

                    int cpIn1 = TimeSpan.Compare((TimeSpan)point.out1, (TimeSpan)point_input.in1);
                    int cpOut1 = TimeSpan.Compare((TimeSpan)point.out1, (TimeSpan)point_input.out1);
                    int cpIn2 = TimeSpan.Compare((TimeSpan)point.in2, (TimeSpan)point_input.in1);
                    int cpOut2 = TimeSpan.Compare((TimeSpan)point.in2, (TimeSpan)point_input.out1);

                    if ((cpIn1 == 1 && cpOut1 == -1) && (cpIn2 == 1 && cpOut2 == 1)) minuteRelax = ((TimeSpan)(point_input.out1 - point.out1)).TotalMinutes;
                    else if ((cpIn1 == 0 && cpOut1 == -1) && (cpIn2 == 1 && cpOut2 == 1)) minuteRelax = ((TimeSpan)(point_input.out1 - point.out1)).TotalMinutes;
                    else if ((cpIn1 == 0 && cpOut1 == -1) && (cpIn2 == 1 && cpOut2 == 0)) minuteRelax = ((TimeSpan)(point.in2 - point.out1)).TotalMinutes;
                    else if ((cpIn1 == -1 && cpOut1 == -1) && (cpIn2 == 1 && cpOut2 == 0)) minuteRelax = ((TimeSpan)(point.in2 - point_input.in1)).TotalMinutes;
                    else if ((cpIn1 == -1 && cpOut1 == -1) && (cpIn2 == 1 && cpOut2 == -1)) minuteRelax = ((TimeSpan)(point.in2 - point_input.in1)).TotalMinutes;
                    else if ((cpIn1 == 1 && cpOut1 == -1) && (cpIn2 == 1 && cpOut2 == -1)) minuteRelax = relex.TotalMinutes;

                    //=> trừ giờ giải lao
                    totalMinutes = totalMinutes - minuteRelax;

                    day_work_shift = (((TimeSpan)point.out2 - (TimeSpan)point.in1).TotalMinutes - ((TimeSpan)point.in2 - (TimeSpan)point.out1).TotalMinutes)/60;
                    result += ((totalMinutes / 60) / day_work_shift);
                }
            }
            return result;
        }
        public static TimeSpan DiffTimeSpan(TimeSpan tsIn1, TimeSpan tsOut1,TimeSpan tsIn2, TimeSpan tsOut2)
        {
            int cpIn1 = TimeSpan.Compare(tsIn1, tsIn2);
            int cpOut1 = TimeSpan.Compare(tsOut1, tsOut2);

            if (cpIn1 == 1 && cpOut1 == 1)//1:1
            {
                return (tsOut2 - tsIn1);
            }
            else if(cpIn1 == -1 && cpOut1 == -1)//-1:-1
            {
                return (tsOut1 - tsIn2);
            }
            else if (cpIn1 == -1 && cpOut1 == 1)//-1:1
            {
                return (tsOut2 - tsIn2);
            }
            else if (cpIn1 == 1 && cpOut1 == -1)//1:-1
            {
                return (tsOut1 - tsIn1);
            }
            else if (cpIn1 == 0 && cpOut1 == 0)//0:0
            {
                return (tsOut1 - tsIn1);
            }
            else if (cpIn1 == 0 && cpOut1 == 1)//0:1
            {
                return (tsOut2 - tsIn1);
            }
            else if (cpIn1 == -1 && cpOut1 == 0)//-1:0
            {
                return (tsOut1 - tsIn2);
            }
            else if (cpIn1 == 0 && cpOut1 == -1)//0:-1
            {
                return (tsOut1 - tsIn1);
            }
            else if (cpIn1 == 1 && cpOut1 == 0)//1:0
            {
                return (tsOut1 - tsIn1);
            }
            return new TimeSpan(0,0,0);
        }
        public static TimeSpan DiffTimeSpanv2(TimeSpan tsIn1, TimeSpan tsOut1, TimeSpan tsIn2, TimeSpan tsOut2)
        {
            int cpIn1 = TimeSpan.Compare(tsIn1, tsIn2);
            int cpOut1 = TimeSpan.Compare(tsOut1, tsOut2);

            if (cpIn1 == 1 && cpOut1 == 1)//1:1
            {
                return (tsOut2 - tsIn1);
            }
            else if (cpIn1 == -1 && cpOut1 == -1)//-1:-1
            {
                return (tsOut1 - tsIn2);
            }
            else if (cpIn1 == -1 && cpOut1 == 1)//-1:1
            {
                return (tsOut2 - tsIn2);
            }
            else if (cpIn1 == 1 && cpOut1 == -1)//1:-1
            {
                //version 2 updated
                return (tsOut1 - tsIn2);
            }
            else if (cpIn1 == 0 && cpOut1 == 0)//0:0
            {
                return (tsOut1 - tsIn1);
            }
            else if (cpIn1 == 0 && cpOut1 == 1)//0:1
            {
                return (tsOut2 - tsIn1);
            }
            else if (cpIn1 == -1 && cpOut1 == 0)//-1:0
            {
                return (tsOut1 - tsIn2);
            }
            else if (cpIn1 == 0 && cpOut1 == -1)//0:-1
            {
                return (tsOut1 - tsIn1);
            }
            else if (cpIn1 == 1 && cpOut1 == 0)//1:0
            {
                //version 2 updated
                return (tsOut1 - tsIn1);
            }
            return new TimeSpan(0, 0, 0);
        }

        public static void FindAndSetRegulation(int minute, DateTime date,decimal work_day, ref List<RegulationModel> regulations)
        {
            for (int i = 1; i < regulations.Count; i++)
            {
                if (regulations[i - 1].time < minute && minute <= regulations[i].time)
                {
                    if(regulations[i - 1].time == 0) regulations[i].log = " 1 đến "+ Convert.ToInt32(regulations[i].time) +" phút";
                    else regulations[i].log = Convert.ToInt32(regulations[i - 1].time)+" đến " + Convert.ToInt32(regulations[i].time)+" phút";
                    regulations[i].count += 1;
                    if (regulations[i].list_date_soon_lates == null) regulations[i].list_date_soon_lates = new List<ListDateSoonLate>();
                    regulations[i].list_date_soon_lates.Add(new ListDateSoonLate
                    {
                        date=date,
                        work_day=work_day,
                        minute_request = minute
                    });
                } 
            }
        }
        public static int FindAndReSetTimeSoonLate(DataRow[] attendances, DataRow[] listSoonLates, DataRow[] mission_allowances,DateTime soon_date,DateTime late_date, bool is_soon = false, bool is_late = false)
        {
            int result = 0;
            DateTime start_datetime;
            DateTime end_datetime;
            if (is_soon)
            {
                start_datetime = soon_date;
                end_datetime = new DateTime(soon_date.Year, soon_date.Month, soon_date.Day, 18, 30, 0);
                foreach (DataRow attendance in attendances)
                {
                    DateTime start_datetime_1 = ClearSecond(DateTime.Parse(attendance["start_datetime"].ToString()));
                    DateTime end_datetime_1 = ClearSecond(DateTime.Parse(attendance["end_datetime"].ToString()));
                    if (start_datetime.CompareTo(start_datetime_1) >= 0 && start_datetime.CompareTo(end_datetime_1) <= 0){
                        start_datetime = end_datetime_1;
                    }
                }
                foreach (DataRow listSoonLate in listSoonLates)
                {
                    DateTime start_datetime_1 = ClearSecond(DateTime.Parse(listSoonLate["start_datetime"].ToString()));
                    DateTime end_datetime_1 = ClearSecond(DateTime.Parse(listSoonLate["end_datetime"].ToString()));
                    if (start_datetime.CompareTo(start_datetime_1) >= 0 && start_datetime.CompareTo(end_datetime_1) <= 0)
                    {
                        start_datetime = end_datetime_1;
                    }
                }
                foreach (DataRow mission_allowance in mission_allowances)
                {
                    DateTime start_datetime_1 = ClearSecond(DateTime.Parse(mission_allowance["start_datetime"].ToString()));
                    DateTime end_datetime_1 = ClearSecond(DateTime.Parse(mission_allowance["end_datetime"].ToString()));
                    if (start_datetime.CompareTo(start_datetime_1) >= 0 && start_datetime.CompareTo(end_datetime_1) <= 0)
                    {
                        start_datetime = end_datetime_1;
                    }
                }
                if (start_datetime.CompareTo(end_datetime) < 0)
                    result = (end_datetime - start_datetime).Minutes;
            }
            if (is_late)
            {
                start_datetime = new DateTime(late_date.Year, late_date.Month, late_date.Day, 8, 30, 0);
                end_datetime = late_date;
                foreach (DataRow attendance in attendances)
                {
                    DateTime start_datetime_1 = ClearSecond(DateTime.Parse(attendance["start_datetime"].ToString()));
                    DateTime end_datetime_1 = ClearSecond(DateTime.Parse(attendance["end_datetime"].ToString()));
                    if (end_datetime.CompareTo(start_datetime_1) >= 0 && end_datetime.CompareTo(end_datetime_1) <= 0)
                    {
                        end_datetime = start_datetime_1;
                    }
                }
                foreach (DataRow listSoonLate in listSoonLates)
                {
                    DateTime start_datetime_1 = ClearSecond(DateTime.Parse(listSoonLate["start_datetime"].ToString()));
                    DateTime end_datetime_1 = ClearSecond(DateTime.Parse(listSoonLate["end_datetime"].ToString()));
                    if (end_datetime.CompareTo(start_datetime_1) >= 0 && end_datetime.CompareTo(end_datetime_1) <= 0)
                    {
                        end_datetime = start_datetime_1;
                    }
                }
                foreach (DataRow mission_allowance in mission_allowances)
                {
                    DateTime start_datetime_1 = ClearSecond(DateTime.Parse(mission_allowance["start_datetime"].ToString()));
                    DateTime end_datetime_1 = ClearSecond(DateTime.Parse(mission_allowance["end_datetime"].ToString()));
                    if (end_datetime.CompareTo(start_datetime_1) >= 0 && end_datetime.CompareTo(end_datetime_1) <= 0)
                    {
                        end_datetime = start_datetime_1;
                    }
                }
                if (start_datetime.CompareTo(end_datetime) < 0)
                    result = (end_datetime - start_datetime).Minutes;
            }
            return result;
        }
        public static DateTime ClearSecond(DateTime datetime)
        {
            return new DateTime(datetime.Year, datetime.Month, datetime.Day, datetime.Hour, datetime.Minute,0,0);
        }
        public static double TotalWorkDayMinus(List<RegulationModel> soon, List<RegulationModel> late,ref string tr_table_log)
        {
            double sum = 0;
            List<ListDateSoonLate> ListDateSoonLate = new List<ListDateSoonLate>();
            for (int i = soon.Count-1; i >= 0; i--)
            {
                int count = soon[i].count;
                int surplus = 0;
                if (count >= soon[i].times)
                {
                    surplus = count % soon[i].times;
                    int v = Convert.ToInt32(count / soon[i].times);
                    double v2 = Convert.ToDouble(soon[i].work_day_minus * v);
                    sum += v2;
                    if (late[i].list_date_soon_lates != null && late[i].list_date_soon_lates.Count > 0)
                    {
                        foreach (ListDateSoonLate item in late[i].list_date_soon_lates)
                            ListDateSoonLate.Add(item);
                    }
                    tr_table_log += @"<tr><td>Về sớm " + late[i].log + @"</td><td>" + v+@"</td><td>"+ String.Format("{0:0.00}", v2) + @"</td></tr>";
                }
                if(surplus > 0 && i > 0)
                {
                    soon[i-1].count += surplus;
                }
            }
            for (int i = late.Count - 1; i >= 0; i--)
            {
                int count = late[i].count;
                int surplus = 0;
                if (count >= late[i].times)
                {
                    surplus = count % late[i].times;
                    int v = Convert.ToInt32(count / late[i].times);
                    double v2 = Convert.ToDouble(late[i].work_day_minus * v);
                    if(late[i].list_date_soon_lates != null && late[i].list_date_soon_lates.Count > 0)
                    {
                        foreach(ListDateSoonLate item in late[i].list_date_soon_lates)
                            ListDateSoonLate.Add(item);
                    }
                    sum += v2;
                    tr_table_log += @"<tr><td>Đi trễ "+ late[i] .log+ @"</td><td>" + v + @"</td><td>" + String.Format("{0:0.00}", v2) + @"</td></tr>";
                }
                if (surplus > 0 && i > 0)
                {
                    late[i - 1].count += surplus;
                }
            }
            double total_work_day = 0;
            foreach (ListDateSoonLate item in ListDateSoonLate)
            {
                total_work_day += (1- Convert.ToDouble(item.work_day));//Tổng công đã trừ ngoài bảng công tháng
                ListDateSoonLate = ListDateSoonLate.FindAll(f => f.date != item.date);
            }
            sum = sum - total_work_day;
            return Math.Abs(sum);
        }
    }
}
