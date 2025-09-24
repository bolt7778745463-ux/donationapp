# Donation Website - زوائد الخير

A donation management system with user donation form and admin dashboard.

## Features

- User donation form with validation
- Admin login and dashboard
- Donation status management
- Statistics and filtering
- Arabic language support
- Dark mode support

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL database

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a MySQL database named `donation_db`
   - Run the SQL script in `backend/database_setup.sql` to create tables and insert default admin user

4. Configure environment variables:
   - Update `backend/.env` with your database credentials and JWT secret

5. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:5173

### Default Admin Credentials

- Username: admin
- Password: admin123

### Usage

1. Visit the website and fill out the donation form
2. Access admin login at http://localhost:5173/login
3. Use admin credentials to log in
4. Manage donations in the admin dashboard at http://localhost:5173/admin

## API Endpoints

- POST /api/auth/login - Admin login
- GET /api/donations - Get all donations (protected)
- POST /api/donations - Create new donation
- PUT /api/donations/:id/status - Update donation status (protected)
- GET /api/donations/stats - Get donation statistics (protected)

## Technologies Used

- Frontend: React, TypeScript, Tailwind CSS, React Router
- Backend: Node.js, Express.js
- Database: MySQL
- Authentication: JWT
