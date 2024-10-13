using Process.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Process.Controllers
{
    public class UploadController : Controller
    {
        [HttpPost]
        public ActionResult UploadFiles(HttpPostedFileBase[] files, string tbName, string colName)
        {
            string listpath = "";
            if (ModelState.IsValid)
            {
                foreach (HttpPostedFileBase file in files)
                {
                    if (file != null)
                    {
                        var InputFileName = Path.GetFileName(file.FileName);
                        string folderLocation = Path.Combine(Server.MapPath("/UploadFiles/") + tbName + "\\" + colName);
                        var ServerSavePath = Path.Combine(Server.MapPath("/UploadFiles/") + tbName + "\\" + colName + "\\" + InputFileName);
                        bool exists = System.IO.File.Exists(ServerSavePath);
                        if (exists)
                        {
                            DateTime now = DateTime.Now;
                            string code = now.Day.ToString() + now.Month.ToString() + now.Year.ToString() + now.Hour.ToString() + now.Minute.ToString() + now.Second.ToString() + now.Millisecond.ToString();
                            ServerSavePath = Path.Combine(Server.MapPath("/UploadFiles/") + tbName + "\\" + colName + "\\" + code + InputFileName);
                        }
                        exists = System.IO.Directory.Exists(folderLocation);
                        if (!exists)
                        {
                            System.IO.Directory.CreateDirectory(folderLocation);
                        }
                        file.SaveAs(ServerSavePath);
                        if (listpath != "")
                            listpath += ";";
                        listpath += "/UploadFiles/" + tbName + "/" + colName + "/" + InputFileName + "ContentLength" + file.ContentLength;
                    }
                }
            }
            return Json(listpath);
        }
        public UploadModel SaveFile(HttpPostedFileBase file,string fileName, string tbName, string colName)
        {
            string listpath = "";
            var InputFileName = Path.GetFileName(fileName);
            string folderLocation = Path.Combine(Server.MapPath("/UploadFiles/") + tbName + "\\" + colName);
            var ServerSavePath = Path.Combine(Server.MapPath("/UploadFiles/") + tbName + "\\" + colName + "\\" + InputFileName);
            bool exists = System.IO.File.Exists(ServerSavePath);
            if (exists)
            {
                DateTime now = DateTime.Now;
                string code = now.Day.ToString() + now.Month.ToString() + now.Year.ToString() + now.Hour.ToString() + now.Minute.ToString() + now.Second.ToString() + now.Millisecond.ToString();
                ServerSavePath = Path.Combine(Server.MapPath("/UploadFiles/") + tbName + "\\" + colName + "\\" + code + InputFileName);
            }
            exists = System.IO.Directory.Exists(folderLocation);
            if (!exists)
            {
                System.IO.Directory.CreateDirectory(folderLocation);
            }

            file.SaveAs(ServerSavePath);
            if (listpath != "")
                listpath += ";";
            //listpath += "/UploadFiles/" + tbName + "/" + colName + "/" + InputFileName + "ContentLength" + file.ContentLength;
            UploadModel result = new UploadModel();
            result.path = ServerSavePath;
            return result;
        }
    }
}