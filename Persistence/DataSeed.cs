using ApplicationCore.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Persistence
{
    public class DataSeed
    {
        public static async Task SeedAsync(AppDbContext appDbContext, int? retry = 0)
        {
            int retryForAvailability = retry.Value;

            try
            {
                // Initial test users are created

                if (!appDbContext.Users.Any())
                {
                    var user = new User("Carlos", "De Aguas Manga", DateTime.Now.AddDays(-1500), "default.jpg", "cdeaguasm");
                    user.SetIsAdmin(true);

                    var lastUser = new User("Vanessa", "Perez", DateTime.Now.AddDays(-1500), "default.jpg", "vanessap");

                    appDbContext.Users.AddRange(
                        user,
                        lastUser
                    );

                    await appDbContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                if (retryForAvailability < 10)
                {
                    retryForAvailability++;
                    await SeedAsync(appDbContext, retryForAvailability);
                }

                throw;
            }
        }
    }
}