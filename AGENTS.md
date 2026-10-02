# Audisoft-School-App - Agent Instructions

## Project Overview
.NET 9 Web API for school management (Estudiantes, Profesores, Notas) - Technical test for Audisoft.
Follows Clean Architecture with EF Core 9 (Code-First) and SQL Server.

## Solution Structure
```
Audisoft-School-App/
├── Audisoft-School-App.slnx
├── src/
│   ├── Audisoft.Core/           # Domain: Entities, Interfaces, DTOs, Services
│   ├── Audisoft.Infrastructure/ # EF Core: DbContext, Configurations, Repositories
│   └── Audisoft.API/            # Web API: Controllers, Middleware, DI
├── database/                    # SQL scripts (generated from migrations)
└── frontend/                    # Angular (future)
```

## Essential Commands

```bash
# Build entire solution
dotnet build Audisoft-School-App.slnx

# Run API
dotnet run --project src/Audisoft.API

# EF Core Migrations (run from solution root)
dotnet ef migrations add <Name> --project src/Audisoft.Infrastructure --startup-project src/Audisoft.API
dotnet ef database update --project src/Audisoft.Infrastructure --startup-project src/Audisoft.API
dotnet ef migrations script -o database/script.sql --project src/Audisoft.Infrastructure --startup-project src/Audisoft.API
```

## Architecture Rules
- **Core**: Pure domain, no external dependencies
- **Infrastructure**: EF Core, SQL Server, implements Core interfaces
- **API**: Controllers, middleware, DI registration, depends on Core + Infrastructure

## Key Conventions
- Entity IDs: `int`
- JSON: `camelCase` (configured in Program.cs)
- API Response envelope: `{ success, data, message, errors[] }`
- FK cascade: `DeleteBehavior.Restrict` on `Nota → Profesor/Estudiante`
- DTOs: Separate Request/Response, never expose entities
- Global exception handling: `CustomExceptionMiddleware`

## Connection String (Development)
`Server=(localdb)\MSSQLLocalDB;Database=AudisoftSchool;Trusted_Connection=True;TrustServerCertificate=True`

## Detailed Specification
See `src/Audisoft.Core/../AGENTS.md` (original spec in `Audisoft-test/AGENTS.md`) for full requirements.