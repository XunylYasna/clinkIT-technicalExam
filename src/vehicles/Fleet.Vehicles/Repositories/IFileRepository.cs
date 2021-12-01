using Fleet.Vehicles.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Fleet.Vehicles.Repositories
{
    public interface IFileRepository
    {
        Task UploadFile(Models.File file);
        Task<Models.File> GetAsync(string id);
        Task<IEnumerable<Models.File>> GetAsync();
    }
}
