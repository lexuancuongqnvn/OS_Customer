using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POS.Intfs.Product.Dto
{
    public class POS_Product_Group_ENTITY
    {
        public int ID { get; set; } 
        public string code { get; set; }
        public string name { get; set; }
        public string code_master { get; set; }
        public string notes { get; set; }
        public string type { get; set; }

    }
}
