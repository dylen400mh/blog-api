# Blog API

This project is the backend for a personal blog application. It provides an API for managing blog posts and comments, allowing for flexible separation between the backend and multiple frontend applications. The API is designed to handle CRUD operations for posts and comments, with JWT authentication for route protection.

## Features
- RESTful API for managing posts and comments
- JWT-based authentication and route protection
- Published and unpublished post management
- Comment management (CRUD operations)
- Express and Prisma for backend framework and database management

## API Endpoints
Some endpoints are public for all users; however, some are protected for use only by authenticated users, and others are restricted to Admin use only. Any endpoints listed as "Protected" the Admin has access to also. 

### Posts
- `GET /posts` - Get all published/unpublished posts (Admin Only). Use `GET /posts/published` to get published posts.
- `GET /posts/published` - Get all published posts
- `GET /posts/:id` - Get a specifc post by id. This endpoint only returns a post if it's published.
- `POST /posts` - Create a new post (Admin Only)
- `PUT /posts/:id` - Update a post, including publishing/unpublishing (Admin Only)
- `DELETE /posts/:id` - Delete a post (Admin Only)

### Comments
- `GET /posts/:id/comments` - Get all comments for a specific post
- `POST /posts/:id/comments` - Add a comment to a post (Protected)
- `PUT /comments/:id` - Update a comment (Protected)
- `DELETE /comments/:id` - Delete a comment (Protected)

### Users
- `POST /login` - Log in and receive a JWT
- `POST /register` - Register a new user
- `GET /users` - Get all users registered on the site
- `GET /current-user` - Get the currently logged-in user by decoding the JWT
- `GET/PUT/DELETE /profile` - Get a specific profile (NOT YET IMPLEMENTED)

## Technology Stack
- Node.js
- Express.js
- Prisma (PostgreSQL)
- Passport.js with JWT strategy
- JSON Web Token (JWT)

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog-api.git
2. Install dependencies:
   ```bash
   npm install
3. Setup environment variables (create a .env file):
   ```plaintext
   DATABASE_URL=your_postgresql_database_url
   secret=your_jwt_secret
   ADMIN_USER=your_admin_username
4. Run prisma migrations:
   ```bash
   npx prisma migrate deploy
5. Start the development server
   ```bash
   npm run dev

### Testing
You can use Postman or any API testing tool to interact with the API. Attach your JWT to protected routes using the ```Authorization: Bearer <token>``` header.

### Demo
The following is a demo video of the API being used on the Blog Admin Frontend page: 
[Demo](https://www.youtube.com/watch?v=4OSidLXTCLw)
   
