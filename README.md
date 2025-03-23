# Task Manager Application

A full-stack task management application built with Next.js, TypeScript, and Express.

## Features

- Create, read, update, and delete tasks
- Task status management (Pending, In Progress, Completed)
- Responsive design with Tailwind CSS
- Real-time updates with React Query
- RESTful API with Express and Prisma

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL or SQLite

## Project Structure

```
/mock-task-manager
  ├── backend/         # Express backend
  ├── frontend/        # Next.js frontend
  └── README.md
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your database configuration.

4. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit the `.env.local` file with your API URL.

4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:3000

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Technologies Used

### Backend
- Express.js
- TypeScript
- Prisma ORM
- SQLite/PostgreSQL

### Frontend
- Next.js
- TypeScript
- React Query
- Tailwind CSS
- Axios

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 