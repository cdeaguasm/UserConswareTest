using System;

namespace ApplicationCore.Exceptions
{
    public class UserExistsException : Exception
    {
        public UserExistsException(string userName) : base($"El usuario {userName} se encuentra registrado.")
        {
        }
    }
}
