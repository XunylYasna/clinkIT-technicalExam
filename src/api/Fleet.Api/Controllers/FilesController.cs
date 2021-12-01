using Fleet.Vehicles.Requests;
using Fleet.Vehicles.Responses;
using Fleet.Vehicles.Services;
using Microsoft.AspNetCore.Mvc;

namespace Fleet.Api.Controllers
{
    [ApiController]
    [Route("api/files")]
    public class FilesController : Controller
    {
        private readonly IFileService _fileService;

        public FilesController(IFileService fileService)
        {
            _fileService = fileService;
        }

        /// <summary>
        /// Get a list of files optionally filtered by file ID
        /// </summary>
        /// <param name="request">The optional file ID</param>
        /// <returns>A list of vehicles</returns>
        [Route("")]
        [HttpGet]
        public Task<GetFilesResponse> GetFilesAsync([FromQuery] GetFilesRequest request) => _fileService.GetFilesAsync(request);

        /// <summary>
        /// Posts a new File
        /// </summary>
        /// <param name="request">The File Contents</param>
        /// <returns>An empty response</returns>
        [Route("submit")]
        [HttpPost]
        public Task<PostFileResponse> PostFileAsync([FromBody] PostFileRequest request) => _fileService.PostFileAsync(request);
    }
}
