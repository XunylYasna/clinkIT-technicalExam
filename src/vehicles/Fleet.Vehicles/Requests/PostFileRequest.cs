using Fleet.Vehicles.ViewModels;

using System.Collections.Generic;

namespace Fleet.Vehicles.Requests
{
    public class PostFileRequest
    {
        public string Name { get; set; }
        public string Content { get; set; }
    }
}