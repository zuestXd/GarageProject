using Microsoft.AspNetCore.Mvc;
using CarPartsFinder.Models;  // This imports the model

[ApiController]
[Route("api/[controller]")]
public class QatarNumberController : ControllerBase
{
    // This action should handle POST requests to /api/QatarNumber
    [HttpPost("QatarNumber")] // This will now handle POST requests
    public IActionResult QatarNumber([FromBody] QatarNumberModel model)
    {
        if (string.IsNullOrWhiteSpace(model.QatarNumber))
        {
            return BadRequest(new { message = "Qatar number cannot be empty." });
        }

        if (model.QatarNumber.Length != 8 || !long.TryParse(model.QatarNumber, out _))
        {
            return BadRequest(new { message = "Invalid Qatar number. It must be 8 digits." });
        }

        return Ok(new { message = "Qatar number is valid." });
    }
}
