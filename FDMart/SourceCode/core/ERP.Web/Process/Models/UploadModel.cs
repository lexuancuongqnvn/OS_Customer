using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Process.Models
{
    public class UploadModel
    {
        public float size { get; set; }
        public string path { get; set; }
        [Required]
        public string tbName { get; set; }
        [Required]
        public string colName { get; set; }
        [Required]
        public IFormFile files { get; set; }
    }
}
