using Coravel.Invocable;
using InfluxDB.Client.Api.Domain;
using InfluxDB.Client.Writes;
using WebSiteRoute.Services;

namespace WebSiteRoute.Invocables
{
    public class RandomPlaneAltitudeWriter : IInvocable
    {
        private readonly InfluxDbService _influxDbService;
        private static readonly Random _random = new Random();

        public RandomPlaneAltitudeWriter(InfluxDbService influxDbService)
        {
            _influxDbService = influxDbService;
        }
        public Task Invoke()
        {
            _influxDbService.Write(writer => {
                var point = PointData.Measurement("altitude")
                    .Tag("plane", "test-plane")
                    .Field("value", _random.Next(1000, 5000))
                    .Timestamp(DateTime.UtcNow, WritePrecision.Ns);

                writer.WritePoint(point, "test-bucket", "organization");
            });
            return Task.CompletedTask;
        }
    }
}
