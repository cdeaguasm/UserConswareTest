using ApplicationCore.Dto;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace UserConswareTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUserService _userService;

        public LoginController(IUserService userService)
        {
            _userService = userService;
        }

        // POST: api/Login
        [HttpPost]
        public async Task<IActionResult> ValidateLogin(LoginRequest modelRequest)
        {
            var user = await _userService.ValidateLogin(modelRequest.UserName, modelRequest.Password);

            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(new { fullName = $"{user.FirstName} {user.LastName}" });
        }
    }
}