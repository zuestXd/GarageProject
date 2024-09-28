using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class GaragesController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public GaragesController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchGarages(string part)
    {

                    Console.WriteLine("Hello, 1!");

        // NocoDB API URL
        var nocodbUrl = "http://localhost:8080/api/v1/db/data/noco_db_name/garage_table";
        
        // Fetch data from NocoDB
        var response = await _httpClient.GetAsync($"{nocodbUrl}?filter=part,eq,{part}");
        if (!response.IsSuccessStatusCode)
        {
                                Console.WriteLine("Hello, 2!");

            return BadRequest("Error fetching garages");
        }

        var garages = await response.Content.ReadAsStringAsync();
                            Console.WriteLine("Hello, 3!");

        return Ok(garages);
    }
}
