using System;
using System.Collections.Generic;
using System.Text;

namespace HRMS.Models
{
    public class PointInOutModel
    {
        public TimeSpan? in1 { get; set; }
        public TimeSpan? out1 { get; set; }
        public TimeSpan? in2 { get; set; }
        public TimeSpan? out2 { get; set; }
    }
    public class ListPointInOutModel
    {
        public List<PointInOutModel> listPointInOutModels { get; set; }
    }
}
