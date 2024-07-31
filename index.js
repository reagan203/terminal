#!/usr/bin/env node

// Import necessary modules
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';


// Load to-dos from the file
const loadTodos = () => {
  if (!fs.existsSync(todoFile)) {
    return [];
  }
  const data = fs.readFileSync(todoFile, 'utf-8');
  return JSON.parse(data);
};

// Save to-dos to the file
const saveTodos = (todos) => {
  fs.writeFileSync(todoFile, JSON.stringify(todos, null, 2));
};

// List all to-dos
const listTodos = () => {
  const todos = loadTodos();
  console.log(chalk.blue('Your to-dos:'));
  if (todos.length === 0) {
    console.log(chalk.red('No tasks found.'));
  } else {
    todos.forEach((todo, index) => {
      console.log(chalk.green(`${index + 1}. ${todo}`));
    });
  }
};

// Add a new to-do
const addTodo = async () => {
  const answer = await inquirer.prompt({
    type: 'input',
    name: 'task',
    message: 'Enter a new task:'
  });

  const todos = loadTodos();
  todos.push(answer.task);
  saveTodos(todos);
  console.log(chalk.yellow(`Added: ${answer.task}`));
};

// Remove an existing to-do
const removeTodo = async () => {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log(chalk.red('No tasks to remove.'));
    return;
  }
  const choices = todos.map((todo, index) => ({ name: todo, value: index }));

  const answer = await inquirer.prompt({
    type: 'list',
    name: 'taskIndex',
    message: 'Select a task to remove:',
    choices
  });

  const removedTask = todos.splice(answer.taskIndex, 1);
  saveTodos(todos);
  console.log(chalk.red(`Removed: ${removedTask}`));
};

// Display welcome message with animation
const welcome = async () => {
  const rainbowTitle = chalkAnimation.rainbow('Welcome to To-Do List Manager');
  await sleep(2000);
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('How to use:')}
    ${chalk.bgGreen('1. List tasks')}
    ${chalk.bgYellow('2. Add a task')}
    ${chalk.bgRed('3. Remove a task')}
    ${chalk.bgMagenta('4. Exit')}
  `);
};

// Main function to handle user interaction
const main = async () => {
  await welcome();

  const answer = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      { name: 'List tasks', value: 'list' },
      { name: 'Add a task', value: 'add' },
      { name: 'Remove a task', value: 'remove' },
      { name: 'Exit', value: 'exit' }
    ]
  });

  const spinner = createSpinner('Processing...').start();
  await sleep(1000);
  spinner.stop();

  switch (answer.action) {
    case 'list':
      listTodos();
      break;
    case 'add':
      await addTodo();
      break;
    case 'remove':
      await removeTodo();
      break;
    case 'exit':
      console.log(gradient.rainbow('Goodbye!'));
      process.exit(0);
  }

  // Recursively call main to allow continuous interaction
  main();
};

// Helper function to introduce delay
const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

// Start the application
main();
