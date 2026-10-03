# Architecture & Angular Rules (v21)
*   **Standalone Components:** Exclusively use standalone components, directives, and pipes. Do not generate modules (`NgModules`).
*   **Control Flow:** Use Angular's modern control flow syntax (`@if`, `@for`, `@switch`) in HTML templates instead of classic structural directives (`*ngIf`, `*ngFor`).
*   **Signals:** Implement Signals (`signal`, `computed`, `effect`) for reactive local state management in components, minimizing RxJS usage to HTTP calls or complex asynchronous event streams.
*   **Forms:** Exclusively use `ReactiveFormsModule` with strictly typed forms (`FormGroup`, `FormControl`).
*   **Dependency Injection:** Use the `inject()` function instead of injecting dependencies through the constructor.

# Strict UI/UX Requirements
*   **Navigation:** Implement a clear and permanently accessible main menu or navigation buttons directing to independent pages for: Students, Teachers, and Grades.
*   **Entity Views:** Each page (Students, Teachers, Grades) must obligatorily contain a data table (Data Grid) displaying current records.
*   **CRUD Actions:** Each table must include direct "Edit" and "Delete" options/buttons per record, plus a primary "Create" button for new records.
*   **Interactions:** Handle loading states and display visual alerts or notifications to the user upon success or failure of API CRUD operations.


