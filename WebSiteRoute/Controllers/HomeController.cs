using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebSiteRoute.Models;
using WebSiteRoute.Services;

namespace WebSiteRoute.Controllers;

public class HomeController(ILogger<HomeController> logger) : Controller
{
    public async Task<IActionResult> Index([FromServices] InfluxDbService influxDbService)
    {
        var results = await influxDbService.QueryAsync(async query =>
        {
            var flux = "from(bucket:\"test-bucket\") |> range(start: 0)";
            var tables = await query.QueryAsync(flux, "organization");

            return tables.SelectMany(table => table.Records.Select(
                record => new AltitudeModel
                {
                    Time = record.GetTime().ToString(),
                    Altitude = int.Parse(record.GetValue().ToString()!)
                }));
        });

        var messageProvider = new PassengerFlightStatusMessages();
        var sampleAltitude = results.FirstOrDefault()?.Altitude ?? 0;
        ViewData["FlightStatusMessage"] = messageProvider.GetStatusMessage(sampleAltitude);

        logger.LogInformation("Rendered flight status message for altitude {Altitude}", sampleAltitude);

        return View(results);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
