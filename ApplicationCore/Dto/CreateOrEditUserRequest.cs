using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace ApplicationCore.Dto
{
    public class CreateOrEditUserRequest
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(100)]
        public string LastName { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        public IFormFile Avatar { get; set; }

        [Required]
        [StringLength(50)]
        public string UserName { get; set; }
    }
}
