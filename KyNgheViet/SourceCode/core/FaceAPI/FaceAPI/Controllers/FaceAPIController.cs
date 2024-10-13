using Microsoft.AspNetCore.Mvc;

namespace FaceAPI.Controllers
{
    public class FaceAPIController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
