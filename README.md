# Investment Management Website

This repository contains the code for a comprehensive investment management system, designed to track and manage stocks, cryptocurrencies, and cash investments. The project is structured as a monorepo and includes both frontend and backend components.

## Technology Stack

### Frontend
- **Framework**: React (with TypeScript)
- **Libraries**:
  - Material-UI for UI components with built-in light and dark themes
  - Recharts for interactive and responsive charts
- **Testing**:
  - Cypress: For end-to-end testing, ensuring that the application functions correctly from a user's perspective. It supports both unit and integration tests for the frontend.    

### Backend
- **Framework**: Express (Node.js)
- **ORM**: Prisma
- **Language**: TypeScript
- **Database**: PostgreSQL (primary), Redis (for session management and caching)
- **Testing**:
  - Jest: Ideal for backend testing due to its simplicity and support for testing Node.js applications. It can handle both unit and integration tests effectively.

### Additional Tools
- **GraphQL**: For efficient data fetching
- **Docker**: Description: Used for containerizing the application, ensuring consistency across various development and production environments.
- **CI/CD**: GitHub Actions for automated testing and deployment

## Project Structure

The monorepo is structured into several directories:

- `/frontend`: Contains the React application.
- `/backend`: Contains the Express server and API.
- `/common`: Shared utilities and types used by both frontend and backend.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn
- Docker (optional, for containerization)
- PostgreSQL and Redis

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/beltranbulbarella/personal-finance-app.git
   cd personal-finance-app
   ```

2. **Set up the frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Set up the backend**:
   ```bash
   cd backend
   npm install
   npx prisma migrate dev
   npm run dev
   ```

3. **Environment Variables**:
Ensure all necessary environment variables are set for development, such as database connection strings and any third-party API keys

