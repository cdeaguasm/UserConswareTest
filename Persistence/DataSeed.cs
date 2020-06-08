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
                    var user = new User("Carlos", "De Aguas Manga", DateTime.Now.AddDays(-1500), "cdeaguasm");
                    user.SetIsAdmin(true);
                    user.SetAvatar("no-img.jpg");

                    var lastUser = new User("Lina", "Santiago", DateTime.Now.AddDays(-1500), "lsantiago");
                    lastUser.SetAvatar("no-img.jpg");

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