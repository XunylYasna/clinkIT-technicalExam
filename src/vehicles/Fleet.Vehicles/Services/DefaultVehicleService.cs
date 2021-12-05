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
    public class DefaultVehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;
        private readonly IVehicleLogItemRepository _vehicleLogItemRepository;
        private readonly IFileRepository _fileRepository;

        public DefaultVehicleService(IVehicleRepository vehicleRepository,
            IVehicleLogItemRepository vehicleLogItemRepository,
            IFileRepository fileRepository)
        {
            _vehicleRepository = vehicleRepository;
            _vehicleLogItemRepository = vehicleLogItemRepository;
            _fileRepository = fileRepository;
        }

        public async Task<GetVehiclesResponse> GetVehiclesAsync(GetVehiclesRequest request)
        {
            if (request.FleetId.HasValue)
            {
                // Get by fleet
                return await GetVehiclesByFleetId(request.FleetId);
            }

            else if(!string.IsNullOrEmpty(request.FileId))
            {
                // Get by file
                return await GetVehiclesByFileId(request.FileId);
            }

            var vehicles = await _vehicleRepository.GetAsync();
            var viewModels = vehicles.Select(v => new VehicleViewModel
            {
                Id = v.Id,
                Name = v.Name,
                Type = v.Type,
                LastKnownLocation = v.Log?.LastOrDefault()?.Location
            });

            var response = new GetVehiclesResponse
            {
                Vehicles = viewModels
            };

            return response;
        }

        public async Task<UpdateVehicleLogsResponse> UpdateVehicleLogsAsync(UpdateVehicleLogsRequest request)
        {
            var vehicles = new Dictionary<int, Vehicle>();

            foreach (var update in request.Updates)
            {
                Vehicle vehicle;
                if (update.VehicleId.HasValue)
                {
                    if (!vehicles.ContainsKey(update.VehicleId.Value))
                    {
                        vehicle = await _vehicleRepository.GetAsync(update.VehicleId.Value);
                        vehicles.Add(update.VehicleId.Value, vehicle);
                    }
                    else
                    {
                        vehicle = vehicles[update.VehicleId.Value];
                    }
                }
                else if (!string.IsNullOrEmpty(update.Name) && update.Type.HasValue)
                {
                    vehicle = new Vehicle
                    {
                        Name = update.Name,
                        Type = update.Type.Value,
                        Log = new List<VehicleLogItem>(),
                        VehicleFleets = new List<VehicleFleet>()
                    };

                    await _vehicleRepository.CreateAsync(vehicle);
                }
                else
                {
                    // No vehicle ID, and no name and type, so we just skip since we don't know what this is
                    continue;
                }

                var vehicleLogItem = new VehicleLogItem
                {
                    Vehicle = vehicle,
                    Location = update.Location
                };

                await _vehicleLogItemRepository.CreateAsync(vehicleLogItem);
            }

            var response = new UpdateVehicleLogsResponse
            {

            };

            return response;
        }

        private async Task<GetVehiclesResponse> GetVehiclesByFleetId(int? fleetId)
        {
            var vehicles = await _vehicleRepository.GetAsync(v => v.VehicleFleets.Any(vf => vf.FleetId == fleetId));
            var viewModels = vehicles.Select(v => new VehicleViewModel
            {
                Id = v.Id,
                Name = v.Name,
                Type = v.Type,
                LastKnownLocation = v.Log?.LastOrDefault()?.Location
            });

            var response = new GetVehiclesResponse
            {
                Vehicles = viewModels
            };

            return response;
        }

        private async Task<GetVehiclesResponse> GetVehiclesByFileId(string? fileId)
        {
            File file = await _fileRepository.GetAsync(fileId);
            string[] fileContent = file.Content.Split(',');
            
            var vehicles = await _vehicleRepository.GetAsync(v => fileContent.Contains(v.Id.ToString())); //vf => fileContent.Contains(vf.VehicleId.ToString())
            var viewModels = vehicles.Select(v => new VehicleViewModel
            {
                Id = v.Id,
                Name = v.Name,
                Type = v.Type,
                LastKnownLocation = v.Log?.LastOrDefault()?.Location
            });

            var response = new GetVehiclesResponse
            {
                Vehicles = viewModels
            };

            return response;
        }
    }
}
