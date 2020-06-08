using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T> Get(int id);
        Task<IReadOnlyList<T>> Get();
        Task<T> Create(T entity);
        Task Update(T entity);
        Task Delete(T entity);
    }
}
