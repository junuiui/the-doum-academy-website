# Backend - The Doum Academy

This is the backend service for The Doum Academy Website, providing API endpoints for the frontend application.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose)
- **Email**: Nodemailer

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

## Running the Server

### Development Mode

Runs the server with `nodemon` for auto-reloading:

```bash
npm run dev
```

### Production Build

Build and start the server:

```bash
npm run build
npm start
```

## API Endpoints

### Inquiries

- **POST /inquiries**
  - Creates a new inquiry.
  - Body: `{ name, email, message }`
  
- **GET /inquiries**
  - Retrieves a list of all inquiries (Admin usage).

## Status & Todo

- [x] Basic Express setup with CORS
- [x] Database connection (MongoDB)
- [x] Inquiry API (Create & List)
- [ ] Request Validation (Input sanitization)
- [ ] Centralized Error Handling
- [ ] Google Review API Integration
- [ ] Integration with main Academy Server
