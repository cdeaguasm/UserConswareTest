using ApplicationCore.Dto;
using ApplicationCore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces
{
    public interface IUserService
    {
        Task<User> Get(int id);
        Task<IReadOnlyList<UserResponse>> Get(string filter = null);
        Task<User> Create(User user);
        Task Update(User user);
        Task Delete(User user);
        Task<UserResponse> ValidateLogin(string userName, string password);
    }
}
