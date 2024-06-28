# Rumos' Blog Project Frontend

The Rumos' blog project frontend is developed using React, leveraging the Create React App for bootstrapping the application. It interacts with the backend application developed in Java, Spring Boot, and SQL to provide a seamless user experience for both Admin and Common Users.

The frontend application allows users to view, create, edit, and delete blog posts. It supports user authentication and authorization, providing different levels of access and functionality based on the user role. The application is styled with CSS and utilizes React Router for navigation.

---

## Running the Frontend Application

### Requirements
- Node.js
- npm

### Steps to Run the Application

### Option 1: Using the Shell Script

A shell script is provided in the root directory of the project to automate the process of cloning the repositories and starting the projects. To use the script:

### Requirements
- docker-compose
- Java 17
- Maven
- git
- docker
- npm

1. Download the [`start-project.sh`](https://github.com/ribeirovillar/rumos-blog-react/blob/master/start-project.sh)  script to your desired directory.
2. Open a terminal in the directory where the script was downloaded.
3. Run the following command to give execution permissions to the script:
```bash
chmod +x start-project.sh
```
4. Run the script with the following command:
```bash
./start-project.sh
```

### Option 2: Manual Setup

1. Clone the repository
2. Open a terminal in the root directory of the frontend project.
2. Install the dependencies by running:
```bash
npm install
```
3. Start the application:
```bash
npm start
```

---

## User Application Credentials

| Role  | Email           | Password  |
|-------|-----------------|-----------|
| Admin | admin@fake.com  | password  |
| User  | user@fake.com   | Senha@00  |

---

## Additional Tools and Libraries

- React Router for navigation
- Axios for HTTP requests
- JWT for authentication

---

## Getting Started with the Frontend Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.


