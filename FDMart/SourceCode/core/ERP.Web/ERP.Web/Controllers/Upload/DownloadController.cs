using ERP.Common.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace ERP.Web.Controllers.Upload
{
    public class DownloadController : Controller
    {
        public IActionResult Index(string filename)
        {
            return View();
        }
        public FileStreamResult DownloadDocument(string filePath)
        {
            try
            {
                string de_path = ManagementController.DecryptString(filePath);
                string filename = de_path.Split('\\')[de_path.Split('\\').Length - 1];
                string filepath = string.Concat(Directory.GetCurrentDirectory(), "\\wwwroot", de_path.Replace("\\" + filename, ""));
                string fullName = Path.Combine(filepath, filename);
                return File(new FileStream(fullName, FileMode.Open), "application/pdf", filename);
            }catch (Exception ex)
            {
                return null;
            }
        }
        public FileStreamResult DownloadOctetStream(string filename)
        {
            try
            {
                string filepath = string.Concat(Directory.GetCurrentDirectory(), "\\wwwroot\\", filename);
                return File(new FileStream(filepath, FileMode.Open), "application/octet-stream", filename);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public async Task<IActionResult> DownloadAsync(string filePath)
        {
            if (filePath == null)
                return Content("filename not present");

            var path = string.Concat(Directory.GetCurrentDirectory(), "\\wwwroot", filePath);

            var memory = new MemoryStream();
            try
            {
                using (var stream = new FileStream(path, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
            }catch (Exception ex)
            {

            }  
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }
        [ApiExplorerSettings(IgnoreApi = true)]
        private Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".xlsx", "application/vnd.openxmlformats  officedocument.spreadsheetml.sheet"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }

        private string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

    }
}
