using Microsoft.AspNetCore.Mvc;
using System.IO;
using Newtonsoft.Json;

namespace CarPartsFinder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "carMakesAndModels.json");

        [HttpGet("makes")]
        public IActionResult GetMakes()
        {
             Console.WriteLine("Hello makes, 1!");

            var jsonData = System.IO.File.ReadAllText(_filePath);
            var carData = JsonConvert.DeserializeObject<CarMakesModels>(jsonData);
            return Ok(carData.Makes.Select(m => m.Make));
        }

        [HttpGet("models/{make}")]
        public IActionResult GetModels(string make)
        {
            Console.WriteLine("Hello makes, 2!");

            var jsonData = System.IO.File.ReadAllText(_filePath);
            var carData = JsonConvert.DeserializeObject<CarMakesModels>(jsonData);
            var selectedMake = carData.Makes.FirstOrDefault(m => m.Make.Equals(make, StringComparison.OrdinalIgnoreCase));

            if (selectedMake == null)
            {
                return NotFound("Make not found");
            }

            return Ok(selectedMake.Models);
        }
    }

    public class CarMakesModels
    {
        public List<MakeModel> Makes { get; set; }
    }

    public class MakeModel
    {
        public string Make { get; set; }
        public List<string> Models { get; set; }
    }
}
