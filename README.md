To-Do List Web Application
A simple and interactive To-Do List application built with HTML, CSS, and JavaScript for managing tasks efficiently. This project uses a RESTful API to handle task data stored on a server, allowing users to add, view, and delete tasks. It includes user authentication, making it possible for each user to have a personalized task list.

Features
User Registration & Login: Users can create accounts and log in to manage their tasks.
Add Tasks: Users can add new tasks to their to-do list.
View Tasks: Displays tasks in a tabular format with task names, statuses (Completed/Incomplete), and actions.
Delete Tasks: Users can delete tasks, and the interface updates dynamically.
Task Status: Displays each task's completion status, with "Incomplete" and "Completed" labels.
Logout: Allows users to securely log out, clearing session data.
Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: ASP.NET Web API, hosted on MonsterASP.net
Database: SQL Server
API Endpoints
The project uses a RESTful API to manage tasks. Here are the main endpoints:

User Registration: POST /api/User/AddNewUser - Registers a new user.
Get All Tasks: GET /api/List/AllTask?UserID={userID} - Retrieves all tasks for the authenticated user.
Add New Task: POST /api/List/AddNewTask - Adds a new task.
Delete Task: DELETE /api/List/DeleteTask?id={taskId} - Deletes a specified task.
Setup
Clone this repository.
Update the API endpoint URLs in the JavaScript code if necessary.
Host the frontend on GitHub Pages (or any other preferred hosting service).
Ensure the backend API is accessible from the frontend hosting environment.
Future Enhancements
Task Editing: Allow users to update existing tasks.
Task Filtering: Filter tasks by completion status (e.g., show only completed or incomplete tasks).
Due Dates & Reminders: Add options for due dates and task reminders.
