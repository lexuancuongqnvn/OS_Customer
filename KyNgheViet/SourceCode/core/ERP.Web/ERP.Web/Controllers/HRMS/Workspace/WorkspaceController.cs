using Common.Utils;
using ERP.Common.Content.Helper;
using ERP.Common.Controllers;
using ERP.Common.Filters;
using ERP.System.Intfs.Upload.Dto;
using ERP.Web.Controllers.Upload;
using HRMS.Intfs.TimeSheet.Dto;
using HRMS.Intfs.Workspace;
using HRMS.Intfs.Workspace.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SignalR.Intfs.HubClient.Dto;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.HRMS.Workspace
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [TokenAuthenticationFilter]
    public class WorkspaceController : ControllerBase
    {
        private readonly IHRM_WorkspaceService HRM_WorkspaceService;

        public WorkspaceController(IHRM_WorkspaceService HRM_WorkspaceService)
        {
            this.HRM_WorkspaceService = HRM_WorkspaceService;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Workspace_Comment_ByCode_Calendar(string code)
        {
            var result = await HRM_WorkspaceService.HRM_Workspace_Comment_ByCode_Calendar(code);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Workspace_Delete(string listID)
        {
            var result = await HRM_WorkspaceService.HRM_Workspace_Delete(listID);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Workspace_Insert([FromBody] HRM_Workspace_Master_ENTITY input)
        {
            input.XML_Workspace = input.hRM_Workspace.ToXmlFromList();
            foreach (var item in input.hRM_Workspace)
            {
                item.xml_comment = item.hrm_workspace_comment.ToXmlFromList();
                //foreach (var _item in item.hrm_workspace_comment)
                //    _item.xml_image = _item.hrm_workspace_comment_images.ToXmlFromList();
            }

            var result = await HRM_WorkspaceService.HRM_Workspace_Insert(input);
            return result;
        }
        [HttpPost]
        public async Task<List<HRM_Workspace_ENTITY>> HRM_Workspace_Search([FromBody] HRM_Workspace_ENTITY input)
        {
            var result = await HRM_WorkspaceService.HRM_Workspace_Search(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Workspace_Search_ByID(int id)
        {
            var result = await HRM_WorkspaceService.HRM_Workspace_Search_ByID(id);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Workspace_Update([FromBody] HRM_Workspace_Master_ENTITY input)
        {
            try
            {
                if (input.hRM_Workspace != null)
                    foreach (var item in input.hRM_Workspace)
                    {
                        if (item.hrm_workspace_comment == null) item.hrm_workspace_comment = new List<HRM_Workspace_Comment_ENTITY>();
                        if (item.hRM_TimeSheet_ENTITY == null) item.hRM_TimeSheet_ENTITY = new HRM_TimeSheet_ENTITY();
                        //item.xml_comment = item.hrm_workspace_comment.ToXmlFromList();
                        //if (item.hrm_workspace_comment != null)
                        //    foreach (var _item in item.hrm_workspace_comment)
                        //        _item.xml_image = _item.hrm_workspace_comment_images.ToXmlFromList();
                    }
                input.XML_Workspace = input.hRM_Workspace.ToXmlFromList();
                var result = await HRM_WorkspaceService.HRM_Workspace_Update(input);

                return result;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Workspace_Comment_Update([FromBody] HRM_Workspace_Comment_ENTITY input)
        {
            input.xml_image = input.hrm_workspace_comment_images.ToXmlFromList();
            var result = await HRM_WorkspaceService.HRM_Workspace_Comment_Update(input);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Workspace_Comment_Insert([FromBody] HRM_Workspace_Comment_ENTITY input)
        {
            //if(input.hrm_workspace_comment_images == null) input.hrm_workspace_comment_images = new List<HRM_Workspace_Comment_Image_ENTITY>();
            input.xml_image = input.hrm_workspace_comment_images.ToXmlFromList();
            var result = await HRM_WorkspaceService.HRM_Workspace_Comment_Insert(input);
            return result;
        }

        [HttpPost]
        public async Task<List<HRM_Workspace_Master_ENTITY>> HRM_Workspace_Master_Search([FromBody] HRM_Workspace_Master_ENTITY input)
        {
            var result = await HRM_WorkspaceService.HRM_Workspace_Master_Search(input);
            HRM_Workspace_ENTITY param = new HRM_Workspace_ENTITY();
            param.master_id = input.code;
            param.ACCOUNT_ID = input.ACCOUNT_ID;
            result[0].hRM_Workspace = await HRM_WorkspaceService.HRM_Workspace_Search(param);
            return result;
        }
        [HttpPost]
        public async Task<IDictionary<string, object>> HRM_Workspace_Update_Timesheet([FromBody] HRM_Workspace_ENTITY input)
        {
            var result = await HRM_WorkspaceService.HRM_Workspace_Update_Timesheet(input);
            return result;
        }
        
        [HttpGet]
        public async Task<IDictionary<string, object>> HRM_Workspace_Timesheet_Search_By_IDCalendar(string code_master,string idCalendar, int top)
        {
            List<Tuple<string, string>> param = new List<Tuple<string, string>>();
            param.Add(new Tuple<string, string>("p_idCalendar", idCalendar));
            param.Add(new Tuple<string, string>("p_code_master", code_master));
            param.Add(new Tuple<string, string>("p_top", top.ToString()));

            DataSet dataSet = ManagementController.GetListTable("HRM_Workspace_Timesheet_Comment_Search_By_IDCalendar", param);
            
            DataTable dataTable_group = dataSet.Tables[0];
            DataTable dataTable_img = dataSet.Tables[1];
            DataTable dataTable_files = dataSet.Tables[2];
            string total_hide = dataSet.Tables[3].Rows[0]["total_hide"].ToString();
            string li_cmt = "";
            foreach (DataRow item_group in dataTable_group.Rows)
            {
                string img = "",file="";
                foreach (DataRow item in dataTable_img.Rows)
                {
                    if(item["comment_code"].ToString() == item_group["comment_code"].ToString())
                    {
                        if (!string.IsNullOrEmpty(item["image_base64"].ToString()))
                        {
                            string img_name = item["img_name"].ToString();
                            img += @"<tr>
	                                    <td class='text-center'><span class='material-icons'>image</span></td>
	                                    <td>" + img_name + @"</td>
	                                    <td class='td-actions text-right'>
                                        <a href='javascript:download_img_by_base64(`" + img_name + @"`,`" + item["image_base64"].ToString() + @"`)'>
		                                <button type='button' rel='tooltip' class='btn btn-info' data-original-title='' title='" + img_name + @"'>
                                        " + SizeSuffix(Int64.Parse(item["img_size"].ToString())) + @"
		                                    <i class='material-icons'>download</i>
		                                </button>
                                        </a>
		                                <button type='button' rel='tooltip' class='btn btn-success' data-original-title='' title=''>
		                                    <i class='material-icons'>visibility</i>
		                                </button>
		                                <button type='button' rel='tooltip' class='btn btn-danger' data-original-title='' title=''>
		                                    <i class='material-icons'>close</i>
		                                </button>
	                                    </td>
	                                </tr>";
                        }
                    }    
                }
                foreach (DataRow item in dataTable_files.Rows)
                {
                    if (item["comment_code"].ToString() == item_group["comment_code"].ToString())
                    {
                        string en_path = ManagementController.EncryptString(item["files_path"].ToString());
                        string en_path_t = ManagementController.DecryptString(en_path);
                        if (!string.IsNullOrEmpty(item["files_path"].ToString()))
                            file += @"<tr>
	                                  <td class='text-center'><span class='material-icons'>attach_file</span></td>
	                                  <td>" + item["files_name"] + @"</td>
	                                  <td class='td-actions text-right'>
                                        <a href='javascript:download_byUrl(`" + en_path + @"`);'>
		                                <button type='button' rel='tooltip' class='btn btn-info' data-original-title='' title='" + item["files_name"] + @"'>
                                          " + SizeSuffix(Int64.Parse(item["files_size"].ToString())) + @"
		                                  <i class='material-icons'>download</i>
		                                </button>
                                        </a>
		                                <button type='button' rel='tooltip' class='btn btn-success' data-original-title='' title=''>
		                                  <i class='material-icons'>visibility</i>
		                                </button>
		                                <button type='button' rel='tooltip' class='btn btn-danger' data-original-title='' title=''>
		                                  <i class='material-icons'>close</i>
		                                </button>
	                                  </td>
	                                </tr>";
                    }
                }
                li_cmt += @"<li class='timeline-inverted'>
	                        <div class='timeline-badge danger'>
		                        <div class='timeline-badge danger'>
			                        <div class='card-avatar' style='max-width: 100px;max-height: 100px;border-radius: 50%;margin-top: -5px;'>
				                        <a href='#pablo'>
				                        <img class='img' src='" + item_group["avarta"] + @"' style='width: 100%;height: auto;border-radius: 50%;'>
				                        </a>
			                        </div>
		                        </div>
	                        </div>
	                        <div class='timeline-panel'>
		                        <div class='timeline-heading'>
			                        <span class='badge badge-pill badge-danger'>" + item_group["full_name"] + @"</span>
		                        </div>
		                        <div class='timeline-body'>
			                        <p>" + item_group["cmt_content"] + @"</p>
                                    <table class='table'>
                                      <tbody>
	                                    " + img+file + @"
                                      </tbody>
                                    </table>
		                        </div>
		                        <h6 style=' float: left; color: blue;'>
			                        <i class='ti-time'></i> " + DateTime.Parse(item_group["cmt_date"].ToString()).ToString("dd/MM/yyyy HH:mm") + @"
		                        </h6>
	                        </div>
                        </li>";
            }
            var result = await HRM_WorkspaceService.HRM_Workspace_Timesheet_Search_By_IDCalendar(code_master, idCalendar,top);
            result["html_comment"] = result["html_comment"].ToString().Replace("[timeline_inverted]", li_cmt).Replace("[total_hide]", total_hide);
            return result;
        }
        static readonly string[] SizeSuffixes =
                  { "bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" };

        static string SizeSuffix(Int64 value, int decimalPlaces = 1)
        {
            if (value < 0) { return "-" + SizeSuffix(-value, decimalPlaces); }

            int i = 0;
            decimal dValue = (decimal)value;
            while (Math.Round(dValue, decimalPlaces) >= 1000)
            {
                dValue /= 1024;
                i++;
            }

            return string.Format("{0:n" + decimalPlaces + "} {1}", dValue, SizeSuffixes[i]);
        }
    }
}
