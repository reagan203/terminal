# terminal
To-Do List Manager
Welcome to the To-Do List Manager! This is a terminal-based application that helps you manage your daily tasks efficiently. With this tool, you can list your tasks, add new ones, and remove completed or unnecessary tasks, all from the command line.

Features
List Tasks: View all your current tasks.
Add Task: Add a new task to your to-do list.
Remove Task: Remove a task from your to-do list.
Exit: Exit the application.
Requirements
Node.js (v14 or later)
npm (Node Package Manager)
Installation
Clone the repository:


cd todo-list-manager
Install the dependencies:

sh
Copy code
npm install
Make the script executable (on Unix-based systems):

sh
Copy code
chmod +x index.js
Usage
You can start the To-Do List Manager using the following command:

sh
Copy code
npm start
Or, if you have made the script executable, you can run it directly:

sh
Copy code
./index.js
Commands
List Tasks:

Displays all your current tasks.
If there are no tasks, it will show a message indicating that no tasks are found.
Add Task:

Prompts you to enter a new task.
The new task is added to your to-do list and saved to a file.
Remove Task:

Prompts you to select a task to remove.
The selected task is removed from your to-do list and the changes are saved.
Exit:

Exits the application with a friendly goodbye message.
Code Explanation
Main Components
File Handling:

loadTodos(): Loads tasks from a JSON file.
saveTodos(todos): Saves tasks to a JSON file.
Task Management:

listTodos(): Lists all current tasks.
addTodo(): Adds a new task to the list.
removeTodo(): Removes a selected task from the list.
User Interaction:

Uses inquirer for interactive command-line prompts.
Uses chalk, gradient-string, chalkAnimation, and figlet for enhanced command-line interface and animations.
Main Function:

main(): Handles the main logic for user interaction and task management.
welcome(): Displays a welcome message with animations.
