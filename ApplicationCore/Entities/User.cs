using System;

namespace ApplicationCore.Entities
{
    public class User
    {
        public int Id { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }
        public DateTime BirthDate { get; private set; }
        public string Avatar { get; private set; }
        public string UserName { get; private set; }
        public string Password { get; private set; }
        public bool IsAdmin { get; private set; }
        public DateTime CreatedAt { get; private set; }
        public DateTime? UpdatedAt { get; private set; }

        public User(string firstName, string lastName, DateTime birthDate, string userName)
        {
            FirstName = firstName;
            LastName = lastName;
            BirthDate = birthDate;
            UserName = userName;
            Password = "123456";
            IsAdmin = false;
            Avatar = "no-img.jpg";
            CreatedAt = DateTime.Now;
        }

        public void UpdateEntity(int id, string firstName, string lastName, DateTime birthDate, string userName)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            BirthDate = birthDate;
            UserName = userName;
            UpdatedAt = DateTime.Now;
        }

        public void SetAvatar(string avatar)
        {
            Avatar = avatar;
        }

        public void SetPassword(string password)
        {
            Password = password;
        }

        public void SetIsAdmin(bool isAdmin)
        {
            IsAdmin = isAdmin;
        }
    }
}
