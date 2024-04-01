## mega-webstore

### development
- final solution is using postgresql as database, make sure appsettings.json is configured correctly
- if you have no postgresql installed, you can use docker to run a postgresql container:
  - `docker run --name ecommerce-postgres-db -e POSTGRES_USER=appuser -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:latest`
  - appsettings.Development.json has to have this connection string: `Server=localhost;Port=5432;User Id=appuser;Password=secret;Database=store`
  - when the server is running in docker check `Server` value in the connection string to `host.docker.internal`, final value should be: `Server=host.docker.internal;Port=5432;User Id=appuser;Password=secret;Database=store`

### docker
- Docker file is included in the project, API directory, navigate there and run:
  - `docker build -t <username>/megastore .`
- If building the image on new Mac M1, you might need to build the image with the following command:
  - `docker build --no-cache --platform linux/amd64 -t <username>/megastore .`
- To run the container:
  - `docker run --rm -it -p 8080:80 <username>/megastore`

#### setting up the solution with dotnet cli
- create sln with dotnet cli command: `dotnet new sln`
- create webapi package: `dotnet new webapi -o API`
- add API to the solution: `dotnet sln add API`