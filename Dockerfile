#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["WebSiteRoute/WebSiteRoute.csproj", "WebSiteRoute/"]
RUN dotnet restore "WebSiteRoute/WebSiteRoute.csproj"
COPY . .
WORKDIR "/src/WebSiteRoute"
RUN dotnet build "WebSiteRoute.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebSiteRoute.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "WebSiteRoute.dll"]
CMD ASPNETCORE_URLS=http://*:$PORT dotnet WebSiteRoute.dll