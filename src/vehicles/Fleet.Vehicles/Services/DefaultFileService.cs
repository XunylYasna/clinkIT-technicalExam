using Fleet.Vehicles.Models;
using Fleet.Vehicles.Repositories;
using Fleet.Vehicles.Requests;
using Fleet.Vehicles.Responses;
using Fleet.Vehicles.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace Fleet.Vehicles.Services
{
    public class DefaultFileService : IFileService
    {
        private readonly IFileRepository _fileRepository;

        public DefaultFileService(IFileRepository fileRepository)
        {
            _fileRepository = fileRepository;
        }

        public async Task<GetFilesResponse> GetFilesAsync(GetFilesRequest request)
        {
            if (!string.IsNullOrEmpty(request.FileId))
            {
                // Get by fleet
                return await GetFilesByFileId(request.FileId);
            }

            var files = await _fileRepository.GetAsync();
            var viewModels = files.Select(f => new FileViewModel
            {
                Id = f.Id,
                Name = f.Name,
                Content = f.Content,
            });

            var response = new GetFilesResponse
            {
                Files = viewModels
            };

            return response;
        }

        public async Task<PostFileResponse> PostFileAsync(PostFileRequest request)
        {
            var file = new File();
            await _fileRepository.UploadFile(file);
            var response = new PostFileResponse
            {

            };

            return response;
        }

        private async Task<GetFilesResponse> GetFilesByFileId(string? fileID)
        {
            var file = await _fileRepository.GetAsync(fileID);

            var viewModels = new FileViewModel[]
            {
                new FileViewModel{
                    Id = file.Id,
                    Name = file.Name,
                    Content = file.Content,
                }
            };

            var response = new GetFilesResponse
            {
                Files = viewModels
            };

            return response;
        }
    }
}
