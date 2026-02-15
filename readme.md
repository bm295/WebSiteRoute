# WebSiteRoute (.NET 10 / C# 14 Demo)

This project has been updated to target **.NET 10** and use **C# 14**.

## Prerequisites

- .NET 10 SDK
- (Optional) Docker, if you want to run in a container

## Run locally

From the repository root:

```bash
dotnet restore WebSiteRoute.sln
dotnet run --project WebSiteRoute/WebSiteRoute.csproj
```

Then open the URL shown in the terminal (for example `https://localhost:xxxx`).

## Virtual / override demonstration

The class `FlightStatusMessages` defines a **virtual** method:

- `GetStatusMessage(int altitude)`

The class `PassengerFlightStatusMessages` **overrides** that method with passenger-flight specific behavior.

The `HomeController` uses `PassengerFlightStatusMessages` and displays the resulting message on the home page.

## Run with Docker

```bash
docker build -t websiteroute .
docker run --rm -p 8080:80 -e PORT=80 websiteroute
```

Then browse to `http://localhost:8080`.
