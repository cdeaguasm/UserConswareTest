using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace ApplicationCore.Dto
{
    public class CreateOrEditUserRequest
    {
        [Required]
        public int Id { get; private set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; private set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; private set; }

        [Required]
        public DateTime BirthDate { get; private set; }

        [Required]
        public IFormFile Avatar { get; private set; }

        [Required]
        [StringLength(50)]
        public string UserName { get; private set; }
    }
}
