# Full Stack Project Task Tracker

Task Tracker is a full stack application that aims to improve people's lives by allowing them to keep track of their day to day tasks.

## Features

- Task Management: Create, update, and delete tasks.
- Task Tracking: View and filter tasks based on completion status.
- CRUD Operations: Fully functional Create, Read, Update, Delete operations for tasks.

## Technologies Used

- Front-end: ReactJs, MUI5.
- Back-end: C#, .net core.
- Database: MySQL.

## Installation

1. Clone the repository: `git clone https://github.com/Benjamin0-1/todo`
2. Cd into client `cd client`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Cd into api `cd api`
6. install dependencies `dotnet restore`
7. set up your MySQL database in appsettings.json
8. create your database `CREATE DATABASE todo; `
9. Apply migrations running `dotnet ef migrations add InitialCreate` and `dotnet ef database update` 
10. Start the server `dotnet run`
11. your server you have started in http://localhost:5155

## Usage

1. Open your web browser and navigate to http://localhost:5173
2. Here you will arrive at the landing page, you can then go to home page and see all of your tasks, edit and delete them.
3. You can also go to Create task to create a new task of your liking.


GET /api/task this route will return all of the tasks you have created so far.
POST /api/task this route will let you create a new task.
PUT /api/task/{taskId} this route will let you update an existing task, you must also pass this same id in the body of the request (this is done intentionally).
DELETE /api/task/{taskId} this route will let you delete an existing task by its id.