# Backend - The Doum Academy

This is the backend service for The Doum Academy Website, providing stabilized API endpoints and refactored business logic.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose)
- **Controller Pattern**: Clean separation of routes and business logic.

## Architecture & Refactoring

Recent updates focused on moving business logic from route definitions into dedicated controller files. This ensures:
- **Scalability**: Easier to add new features or endpoints.
- **Testability**: Logic is isolated from HTTP handling.
- **Maintainability**: Clearer structure for managing complex operations like Inquiry processing.

## API Endpoints

### Inquiries
- **POST /inquiries**: Creates a new inquiry. (Validated and stored in MongoDB).
- **GET /inquiries**: Retrieves a list of all inquiries (Admin usage).

### Achievements, Services & Locations
- **GET /achievements**: Fetch localized student success records.
- **GET /services**: Fetch academy program details.
- **GET /locations**: Fetch campus information.

## Status
- [x] Express & TypeScript setup with CORS
- [x] Database connection (MongoDB)
- [x] Refactored to Controller architecture
- [x] Inquiry API (Create & List)
- [x] Localized Data Endpoints
- [x] Security: Input sanitization and error handling
