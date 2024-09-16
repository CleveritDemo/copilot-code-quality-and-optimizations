💻Activity

Using GitHub Copilot for Code Optimization and Uniformity:  Linter and Prettier Configuration, and Code Improvement 

## 🎯General Objective

To demonstrate how GitHub Copilot can assist in maintaining uniform code by configuring linters and formatters, optimizing code by identifying redundancies and suggesting improvements to reduce complexity.


## Specific Objectives
- **Configure linters and formatters with GitHub Copilot Chat**:
    - Install and configure **ESLint** and **Prettier** using GitHub Copilot to ensure consistent code formatting.
    - Customize linting and formatting rules based on the project’s needs.
- **Detect and eliminate duplicated or redundant code with GitHub Copilot**:
    - Use GitHub Copilot to identify repeated code snippets and suggest ways to consolidate them.
    - Implement automatic suggestions to improve code clarity and avoid duplication.
- **Propose improvements and optimizations to reduce code complexity**:
    - Utilize **Copilot Chat** to receive suggestions for refactoring and code optimization.
    - Apply simplification and optimization techniques to improve code performance and readability.

## ℹ️ Requirements

- VS Code
- GitHub Copilot License
- GitHub Copilot Extension
- Eslint and Prettier Extensions
- Error Lens Extension (Optional)
- Node JS
- PostgreSQL 
- Docker

## Step 1: Ask to Copilot About the Project

To begin the hands-on, ask GitHub Copilot for an overview of your project using the Workspace agent. This will help you understand the project structure and identify any initial setup issues. For example, you can prompt Copilot with questions about folder organization, existing configurations, or suggest improvements to your codebase.

👤Prompt: 
```
@workspace Can you please tell me about this project? like key components, main features, scripts and dependencies.
```


We can ask about the available routes in this project.

👤Prompt: 
```
@workspace What are the available routes in the project?
```


## Step 2: Ask to Copilot How to Run the Project

In this step, you'll ask GitHub Copilot for instructions on how to run the project. This is crucial for ensuring your environment is set up correctly and that all dependencies and configurations are in place. By asking Copilot for the necessary steps, you'll get detailed guidance on tasks like installing dependencies, configuring the database, and starting the server. This will help ensure that your project runs smoothly, especially when using Docker, PostgreSQL, and TypeORM.

👤 Prompt: 
```
@workspace How do I run this Node.js and TypeScript project with Docker, PostgreSQL, and TypeORM? Please provide steps to install dependencies, set up the database, and start the server.
```

## Step 3: Ask to Copilot to Configure Eslint and Prettier

In this step we are going to ask to Copilot how we can configure Eslint and Prettier 

**Eslint**: A popular JavaScript and TypeScript linting tool that analyzes your code for errors, potential bugs, and style issues. It helps enforce coding standards and best practices by flagging problems like unused variables, inconsistent formatting, or non-adherence to specified coding conventions.

**Prettier**: A code formatter that automatically enforces consistent style in your code. It handles things like indentation, spacing, and line breaks, ensuring a uniform look across your project. Prettier helps improve readability and removes the need for manual formatting.

👤 Prompt: 

```
@workspace Can you provide detailed instructions on how to configure ESLint and Prettier for this project? Please include steps for setting up configuration files and integrating them with each other to ensure consistent code style and quality. Please use eslint version prior to 9
```


🤖 Copilot Answer:

Certainly! Here are the detailed steps to configure ESLint and Prettier for your project:

Step 1: Install ESLint and Prettier
First, install ESLint, Prettier, and their necessary plugins and configurations:

```bash
npm install eslint@^8.0.0 prettier @typescript-eslint/eslint-plugin@latest eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-node eslint-plugin-promise --save-dev
```

Step 2: Create ESLint Configuration File
Create a .eslintrc.json file in the root of your project with the following content:

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "no-console": "error",
    "no-var": "error",
    "camelcase": "error",
    "no-unused-vars": "error",
    "import/no-unresolved": "off"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}


```

Step 3: Create Prettier Configuration File
Create a .prettierrc file in the root of your project with the following content:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "es5",
  "endOfLine": "auto"
}
```

Step 4: Create ESLint Ignore File
Create a .eslintignore file in the root of your project to ignore certain files and directories:

```
node_modules
dist
build
```

Step 5: Create Prettier Ignore File
Create a .prettierignore file in the root of your project to ignore certain files and directories:

```
node_modules
dist
build
```


Step 6: Update package.json Scripts
Update the scripts section in your package.json to include linting and formatting commands:

```json
  "scripts": {
    "start": "ts-node src/index.ts",
    "build": "tsc",
    "dev": "nodemon --watch src --exec ts-node src/index.ts",
    "lint": "eslint \"src/**/*.{js,ts}\"",
    "lint:fix": "eslint --fix \"src/**/*.{js,ts}\"",
    "format": "prettier --write 'src/**/*.{js,ts}'"
  },

```
Step 7: Integrate ESLint and Prettier with VSCode
To integrate ESLint and Prettier with Visual Studio Code, install the following extensions:

ESLint
Prettier - Code formatter
Then, create a .vscode directory in the root of your project and add a settings.json file with the following content:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "typescript"
  ],
  "prettier.requireConfig": true
}
```



Now we want to add new rules to our ESLint Configuration

👤Prompt: 
```
@workspace Can you help me configure ESLint to enforce the following rules: no console logs, no use of `var`, camelCase for function names and variables, no unused variables. Also, provide guidance on integrating these rules with Prettier for consistent code formatting
```

## Step 4: Detecting Redundant Code


Common examples of redundant code include:

1. **Duplicated logic**: Repeating the same logic or functionality in multiple parts of the code instead of reusing it via functions, methods, or classes.
2. **Unnecessary variables**: Declaring variables that are never used, or assigning values to variables that never change.
3. **Superfluous conditions**: Including conditions in control structures that will never be met or are already implied.
4. **Unused dependencies**: Importing modules, libraries, or packages that are not actually used in the code.
5. **"Dead" code**: Code fragments that never execute, such as functions that are never called or sections within conditionals that are always false.


Issues with redundant code:

1. **Harder maintenance**: If a functionality is repeated in several places, making changes becomes more difficult and prone to errors.
2. **Increased complexity**: More lines of code make the program harder to read and understand.
3. **Performance impact**: In some cases, redundant code can consume more resources than necessary, affecting the application's performance.

👤 Prompt: 

```
@workspace Can you help detect redundant or duplicate code in this project? I'm specifically looking for code that may be repeated across different functions or areas, or any code that could be simplified or refactored for better performance and maintainability. Please suggest improvements or refactoring options where applicable.

```

🤖 Copilot Answer:

```
I understand your request. Please provide the files you want me to check for redundant or duplicate code, and I will help you identify areas for improvement and suggest refactoring options.
```

👤 Prompt: 

```
@workspace the first file to check is this #file:userService.ts
```

👤 Prompt: 
```
now can you check this file for redundant or duplicate code ? #file:taskService.ts
```

Copilot will give you the improved code, you can test the app to check if everything is working.

## Step 5: Optimize complex code

Optimizing complex code involves simplifying functions by breaking them into smaller, more focused tasks, each with a clear responsibility. Reducing deep nesting, avoiding redundant logic, and keeping code DRY (Don't Repeat Yourself) helps streamline the workflow


👤 Prompt: 

```
@workspace Can you help optimize complex code in this project? I'm looking to simplify large functions by breaking them into smaller, more focused tasks, reduce deep nesting, and eliminate any redundant logic. Please let me know if you understand my request and I will let you know which file to check
```

🤖 Copilot Answer:

```
I understand your request. Please let me know which file you would like me to check for optimization, and I will help simplify the code by breaking down large functions, reducing deep nesting, and eliminating redundant logic.
```

👤 Prompt: 

```
This file #file:taskController.ts has a lot of responsabilities, can you help me to simplify it following the project strcuture with route, controller and service
```

🤖 Copilot Answer:

```
Sure, let's refactor the taskController.ts file to follow a more structured approach by separating concerns into routes, controllers, and services.

### Step-by-Step Plan:

Create a taskRoutes.ts file: Define the routes for task-related operations.

Refactor taskController.ts: Move the logic for handling requests into the controller.

Ensure taskService.ts: Contains the business logic for tasks.
```

Copilot will give us the refactored code. Test the app to check if everything is working.

We also can tell to copilot to check the security and optimize our data source file.
