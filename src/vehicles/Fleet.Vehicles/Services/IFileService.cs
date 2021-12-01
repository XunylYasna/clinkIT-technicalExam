using Fleet.Vehicles.Requests;
using Fleet.Vehicles.Responses;
using System.Threading.Tasks;

namespace Fleet.Vehicles.Services
{
    public interface IFileService
    {
        Task<GetFilesResponse> GetFilesAsync(GetFilesRequest request);
        Task<PostFileResponse> PostFileAsync(PostFileRequest request);
    }
}