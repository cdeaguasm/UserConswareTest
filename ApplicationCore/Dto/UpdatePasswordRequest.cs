using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Dto
{
    public class UpdatePasswordRequest
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(30)]
        public string Password { get; set; }

        [Required]
        [StringLength(30)]
        [DataType(DataType.Password)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }
    }
}
