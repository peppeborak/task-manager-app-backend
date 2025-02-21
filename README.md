# Task Manager API

A simple and efficient API for managing tasks, built with Node.js, TypeScript, and MySQL.

## 📌 Features
- User authentication with JWT
- Secure password hashing with bcrypt
- CRUD operations for tasks
- Task categorization and priority levels
- Search functionality for tasks

## 📦 Tech Stack & Libraries  
The project is built using the following technologies:
- **Node.js** – JavaScript runtime for building the API
- **Express.js** – Web framework for handling API requests
- **MySQL** – Relational database for storing tasks
- **jsonwebtoken** – Authentication via JWT
- **bcrypt** – Secure password hashing
- **TypeScript** – Superset of JavaScript that adds static types

### Utilities
- **dotenv** – Manages environment variables  
- **body-parser** – Parses request bodies  
- **cors** – Enables Cross-Origin Resource Sharing  
- **@types/express** – Type definitions for Express.js  
- **@types/jsonwebtoken** – Type definitions for JWT  
- **@types/bcrypt** – Type definitions for bcrypt  
- **@types/cors** – Type definitions for CORS

## Prerequisites
Before setting up the project, ensure you have:
- Node.js installed (Latest LTS recommended)
- MySQL installed and running

# 🚀 Setup Instructions

Clone the repository & navigate to the project folder:

git clone <repository_url>
cd project

Install dependencies:
npm install

Set up environment variables:
Create a .env file by copying the example:
cp .env.example .env
Open .env and configure your database credentials and JWT secret.

Initialize the database:
Run the SQL script in your MySQL database:
mysql -u your_user -p your_database < mysql-init.sql
Replace your_user and your_database with your actual MySQL credentials.

##  🏃 Running the Server
Start the API server with:
npm start

By default, the server runs on http://localhost:3000.

