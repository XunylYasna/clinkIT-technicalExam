using Fleet.Vehicles.ViewModels;
using System.Collections.Generic;

namespace Fleet.Vehicles.Responses
{
    public class GetFilesResponse
    {
        public IEnumerable<FileViewModel> Files { get; set; }
    }
}