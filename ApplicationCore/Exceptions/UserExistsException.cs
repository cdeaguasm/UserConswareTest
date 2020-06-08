using System;

namespace ApplicationCore.Exceptions
{
    public class UserExistsException : Exception
    {
        public UserExistsException(string userName) : base($"The user {userName} exists in the database")
        {
        }
    }
}
