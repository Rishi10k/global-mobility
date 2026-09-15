FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["GlobalMobility.Api.csproj", "./"]
RUN dotnet restore "GlobalMobility.Api.csproj"

COPY . .
RUN dotnet publish "GlobalMobility.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "GlobalMobility.Api.dll"]