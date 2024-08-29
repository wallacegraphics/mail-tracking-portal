I need to create a website for my company, Wallace Graphics. The site will list items from an order that have been shipped via USPS market mail and it will display the scan data events for that piece of mail.

It will be build with NestJS, React, and a Postgres database. I'm open to suggestion when it comes to the UI library or CSS library that's used.

---

Local Setup Status

# Harware Setup

- Using a 16" Macbook Pro with an Apple M3 chip

# Softtware

- Node installed via NVM
- Docker
- ZSH shell with oh-my-zsh
- @nestjs/cli installed globally

#Installed Tools

- VSCode IDE
- Postman for testing API requests
- iTerm2
- Terraform

---

#Project Status
Certainly! Here's a summary of what you're trying to accomplish and the steps we've completed so far:

Project Goal:
You're building a USPS Marketing Mail Tracking Portal with a NestJS backend and React frontend. The project is designed to be developed locally and easily deployable to AWS, with the ability to transition from a personal AWS account to a company account in the future.

Steps Completed:

1. Environment Setup:

   - Installed Node.js and npm
   - Installed Terraform

2. Project Initialization:

   - Created a project directory (usps-tracking-portal)
   - Initialized a Git repository
   - Created a .gitignore file

3. Backend Setup:

   - Installed NestJS CLI globally
   - Created a new NestJS project in the 'backend' directory
   - Installed additional dependencies (@nestjs/config)

4. Frontend Setup:

   - Created a new React app in the 'frontend' directory using Create React App
   - Installed additional dependencies (axios, react-router-dom, @mui/material, @emotion/react, @emotion/styled)

5. Automation:
   - Created a shell script (setup_project.sh) to automate the project setup process, including both backend and frontend initialization

Next Steps:
The project structure is now set up, and you're ready to start developing the specific features of your USPS Marketing Mail Tracking Portal. This includes implementing the backend API with NestJS, creating the frontend user interface with React, and setting up the AWS infrastructure using Terraform.
