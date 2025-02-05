# Project Management API

A RESTful API built with Express.js, PostgreSQL, and Prisma for managing projects, tasks, and users.

## Features

- 🔐 JWT Authentication
- 👥 User Management
- 📊 Project Management
- ✅ Task Management
- 🔍 Filtering and Search capabilities
- 🛡️ Role-based permissions
- 🎯 Task assignment and status tracking

## Tech Stack

- Node.js & Express.js
- PostgreSQL
- Prisma ORM
- JSON Web Tokens (JWT)
- bcrypt.js for password hashing

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/rajanmoliya/project-management.git
   ```

   ```bash
   cd project-management
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/project_management"
   JWT_SECRET="your-secret-key"
   PORT=3000
   ```

4. **Database Setup**

   1. Create the database in PostgreSQL

   ```bash
   CREATE DATABASE project_management;
   ```

   2. Run Prisma migrations

   ```bash
   npx prisma migrate dev
   ```

5. **Start the server**

   - Development mode

   ```bash
   npm run dev
   ```

   - Production mode

   ```bash
   npm start
   ```

## API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Project Endpoints

#### Create Project

```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "E-commerce Website",
  "description": "Building an online store"
}
```

#### Get All Projects

```http
GET /api/projects
Authorization: Bearer <token>
```

#### Update a Project

```http
PUT /api/projects/{PROJECT_ID}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Project",
  "status": "ONGOING"
}
```

#### Delete a Project

```http
DELETE /api/projects/{PROJECT_ID}
Authorization: Bearer <token>
```

### Task Endpoints

#### Create Task

```http
POST /api/projects/:projectId/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Design Database Schema",
  "description": "Create ERD and implement database models",
  "assignedUserId": "user-uuid"
}
```

#### Get Project Tasks

```http
GET /api/projects/:projectId/tasks
Authorization: Bearer <token>
```

#### Update a Task

```http
PUT /api/tasks/{TASK_ID}
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

#### Delete a Task

```http
DELETE /api/tasks/{TASK_ID}
Authorization: Bearer <token>
```

#### Filter Tasks

```http
GET /api/tasks?status=IN_PROGRESS&assignedUserId=user-uuid
Authorization: Bearer <token>
```

## Testing Guide

For testing the API endpoints, you can use tools like:

- Postman
- Thunder Client (VS Code Extension)
- curl commands

### Testing Flow:

1. **Register a user**
2. **Login to get JWT token**
3. **Create a project**
4. **Create tasks in the project**
5. **Test task assignments**
6. **Update task statuses**
7. **Test filters and searches**

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
