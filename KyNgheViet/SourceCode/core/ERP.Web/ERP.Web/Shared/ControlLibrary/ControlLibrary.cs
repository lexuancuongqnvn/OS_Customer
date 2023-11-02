using System.IO;

namespace ERP.Web.Shared.ControlLibrary
{
    public class ControlLibrary
    {
        public static bool IsExistFile(string filePath)
        {
            if (File.Exists(filePath))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
