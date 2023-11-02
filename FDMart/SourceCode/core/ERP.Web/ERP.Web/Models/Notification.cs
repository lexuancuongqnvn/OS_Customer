using System.ComponentModel.DataAnnotations.Schema;

namespace ERP.Web.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string TranType { get; set; }
        public string title { get; set; }
        public string body { get; set; }
        public string to { get; set; }
        public string image_url { get; set; }
        public string module { get; set; }
        public string code_in_form { get; set; }
    }
}
