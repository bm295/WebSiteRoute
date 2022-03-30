using InfluxDB.Client;

namespace WebSiteRoute.Services
{
    public class InfluxDbService
    {
        private readonly string _token;

        public InfluxDbService(IConfiguration configuration)
        {
            _token = configuration.GetValue<string>("InfluxDb:Token");
        }

        public void Write(Action<WriteApi> action)
        { 
            using var client = InfluxDBClientFactory.Create("https://51h585.stackhero-network.com", _token);
            using var write = client.GetWriteApi();
            action(write);
        }

        public async Task<T> QueryAsync<T>(Func<QueryApi, Task<T>> action)
        {
            using var client = InfluxDBClientFactory.Create("https://51h585.stackhero-network.com", _token);
            var query = client.GetQueryApi();
            return await action(query);
        }
    }
}
