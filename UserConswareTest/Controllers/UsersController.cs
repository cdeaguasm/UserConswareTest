using ApplicationCore.Dto;
using ApplicationCore.Entities;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Threading.Tasks;

namespace UserConswareTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly long _fileSizeLimit;

        public UsersController(IUserService userService, IConfiguration config)
        {
            _userService = userService;
            _fileSizeLimit = config.GetValue<long>("FileSizeLimit");
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsers(string filter = null)
        {
            return Ok(await _userService.Get(filter));
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        private async Task UploadAvatar(CreateOrEditUserRequest modelRequest)
        {
            if(modelRequest.Avatar == null)
            {
                return;
            }

            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", modelRequest.Avatar.FileName);

            using (var stream = System.IO.File.Create(path))
            {
                await modelRequest.Avatar.CopyToAsync(stream);
            }
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, [FromForm] CreateOrEditUserRequest modelRequest)
        {
            if(modelRequest.Avatar != null && modelRequest.Avatar.Length > _fileSizeLimit)
            {
                return BadRequest("El tamaño del archivo debe ser menor a 2MB");
            }
            
            var user = await _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            await UploadAvatar(modelRequest);

            user.UpdateEntity(
                modelRequest.Id, modelRequest.FirstName, modelRequest.LastName,
                modelRequest.BirthDate, modelRequest.UserName
                );

            if (modelRequest.Avatar != null)
            {
                user.SetAvatar(modelRequest.Avatar.FileName);
            }

            await _userService.Update(user);
            return NoContent();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> PostUser([FromForm] CreateOrEditUserRequest modelRequest)
        {
            if (modelRequest.Avatar != null && modelRequest.Avatar.Length > _fileSizeLimit)
            {
                return BadRequest("El tamaño del archivo debe ser menor a 2MB");
            }

            await UploadAvatar(modelRequest);

            var user = new User(
                modelRequest.FirstName, modelRequest.LastName,
                modelRequest.BirthDate, modelRequest.UserName
                );

            if(modelRequest.Avatar != null)
            {
                user.SetAvatar(modelRequest.Avatar.FileName);
            }

            await _userService.Create(user);
            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            await _userService.Delete(user);
            return NoContent();
        }

        // PUT: api/Users/5/Password
        [HttpPut("{id}/Password")]
        public async Task<IActionResult> ChangePassword(int id, [FromBody] UpdatePasswordRequest modelRequest)
        {
            var user = await _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            user.SetPassword(modelRequest.Password);

            await _userService.Update(user);
            return NoContent();
        }
    }
}
