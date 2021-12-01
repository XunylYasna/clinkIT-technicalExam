using Fleet.Vehicles.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Fleet.Vehicles.Repositories
{
    public class EfCoreFileRepository : IFileRepository
    {
        private readonly VehicleDbContext _database;

        public EfCoreFileRepository(VehicleDbContext database)
        {
            _database = database;
        }

        public async Task UploadFile(File file)
        {
            _database.Files.Add(file);
            await _database.SaveChangesAsync();
        }

        public async Task<File> GetAsync(string id)
        {
            return await _database.Files
                .Where(v => v.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<File>> GetAsync()
        {
            return await _database.Files
                .ToListAsync();
        }
    }
}
