using ApplicationCore.Entities;
using System;

namespace ApplicationCore.Dto
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Avatar { get; set; }
        public string UserName { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime CreatedAt { get; set; }

        public static UserResponse Map(User user)
        {
            return new UserResponse
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                BirthDate = user.BirthDate,
                Avatar = user.Avatar,
                UserName = user.UserName,
                IsAdmin = user.IsAdmin,
                CreatedAt = user.CreatedAt
            };
        }
    }
}
