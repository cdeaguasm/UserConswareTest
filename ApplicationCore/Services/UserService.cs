using ApplicationCore.Dto;
using ApplicationCore.Entities;
using ApplicationCore.Exceptions;
using ApplicationCore.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApplicationCore.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _userRepository;

        public UserService(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> Get(int id)
        {
            return await _userRepository.Get(id);
        }

        public async Task<IReadOnlyList<UserResponse>> Get(string filter = null)
        {
            var users = (await _userRepository.Get())
                .Select(x => UserResponse.Map(x))
                .OrderByDescending(x => x.CreatedAt)
                .ToList();

            if (!string.IsNullOrEmpty(filter))
            {
                filter = filter.ToLower();

                users = users.Where(u => 
                    u.FirstName.ToLower().Contains(filter)
                    || u.LastName.ToLower().Contains(filter)
                    || u.UserName.ToLower().Contains(filter)).ToList();
            }

            return users;
        }

        public async Task<User> Create(User user)
        {
            await ValidateIfUserExists(user);
            return await _userRepository.Create(user);
        }

        public async Task Update(User user)
        {
            await ValidateIfUserExists(user);
            await _userRepository.Update(user);
        }

        public async Task Delete(User user)
        {
            await _userRepository.Delete(user);
        }

        private async Task ValidateIfUserExists(User user)
        {
            var users = await Get();
            var result = users.Any(u => u.UserName == user.UserName && u.Id != user.Id);

            if (result)
            {
                throw new UserExistsException(user.UserName);
            }
        }

        public async Task<UserResponse> ValidateLogin(string userName, string password)
        {
            var users = await _userRepository.Get();
            var user = users.FirstOrDefault(u => u.UserName == userName && u.Password == password);

            if (user == null)
                return null;

            return UserResponse.Map(user);
        }
    }
}
