# Audisoft-School-App - Agent Instructions

> **Operational Mode**: You are in **build mode** (not read-only). You are permitted to make file changes, run shell commands, and utilize all tools as needed.

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

# Project Frontend Context
This project is the frontend . It consists of a web application that consumes a REST API to manage CRUD operations for three main entities: Students, Teachers, and Grades.

# Agent Role
You are a Senior Frontend Developer expert in Angular (version 21) and Tailwind CSS. Your goal is to write clean, modular, maintainable, and strictly typed code, applying the framework's modern best practices.

# Coding Standards & Naming Conventions
*   **Files and Folders:** Use `kebab-case` for all file and folder names (e.g., `student-list.component.ts`).
*   **Classes, Interfaces, and Types:** Use `PascalCase` (e.g., `StudentService`, `CreateStudentDto`).
*   **Variables, Properties, and Methods:** Use `camelCase` (e.g., `getStudents()`, `studentList`).
*   **Constants:** Use `UPPER_SNAKE_CASE` for global immutable constants.

# Clean Architecture & Folder Structure
To maintain cohesion with the backend's architecture, the frontend must be decoupled and organized into distinct layers:
*   **Domain:** Contains business models, entities, and repository interfaces. This layer must be framework-agnostic (no Angular dependencies other than basic TypeScript types).
*   **Infrastructure:** Handles external communications. Here reside the Angular services that make HTTP calls to the REST API, mapping external data contracts to the internal Domain models.
*   **Presentation (UI):** Contains the Angular standalone components, routing, and views. Components should be as "dumb" as possible, delegating business logic to services and managing local state via Signals.
*   **Core/Shared:** Contains global configurations, HTTP interceptors, reusable UI components, and generic utilities.

# Architecture & Angular Rules (v21)
*   **Standalone Components:** Exclusively use standalone components, directives, and pipes. Do not generate modules (`NgModules`).
*   **Control Flow:** Use Angular's modern control flow syntax (`@if`, `@for`, `@switch`) in HTML templates instead of classic structural directives (`*ngIf`, `*ngFor`).
*   **Signals:** Implement Signals (`signal`, `computed`, `effect`) for reactive local state management in components, minimizing RxJS usage to HTTP calls or complex asynchronous event streams.
*   **Forms:** Exclusively use `ReactiveFormsModule` with strictly typed forms (`FormGroup`, `FormControl`).
*   **Dependency Injection:** Use the `inject()` function instead of injecting dependencies through the constructor.

# Styling Rules (Tailwind CSS)
*   **CSS/SCSS Files (`@apply` directive):** To avoid cluttering the HTML with long utility class strings, extract common styles to the component's stylesheet using Tailwind's `@apply` directive.
*   **Example:** Instead of `<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">`, use `<button class="btn-primary">` and define `.btn-primary { @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded; }` in the CSS file.
*   **Responsive Design:** Ensure all views are responsive using Tailwind prefixes (`sm:`, `md:`, `lg:`).

# Strict UI/UX Requirements
*   **Navigation:** Implement a clear and permanently accessible main menu or navigation buttons directing to independent pages for: Students, Teachers, and Grades[cite: 3].
*   **Entity Views:** Each page (Students, Teachers, Grades) must obligatorily contain a data table (Data Grid) displaying current records[cite: 3].
*   **CRUD Actions:** Each table must include direct "Edit" and "Delete" options/buttons per record, plus a primary "Create" button for new records[cite: 3].
*   **Interactions:** Handle loading states and display visual alerts or notifications to the user upon success or failure of API CRUD operations.