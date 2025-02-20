Expense Tracker README

Table of Contents
-----------------

1. Introduction
2. Prerequisites
3. Setup and Installation
4. Running the Application
5. Troubleshooting

Introduction
---------------

Welcome to the Expense Tracker application! This is a full-stack application built with React, Node.js, and MongoDB. The application allows users to track their expenses, income, and net balance.

Prerequisites
----------------

* Node.js (version 14 or higher)
* MongoDB (version 4 or higher)
* npm (version 6 or higher)
* A code editor or IDE of your choice

Setup and Installation
-------------------------

Frontend Setup

1. Clone the repository: git clone https://github.com/your-username/expense-tracker.git
2. Navigate to the frontend directory: cd expense-tracker/client
3. Install dependencies: npm install
4. Start the frontend development server: npm start

Backend Setup

1. Navigate to the backend directory: cd expense-tracker/server
2. Install dependencies: npm install
3. Create a new file called .env in the root of the backend directory and add the following variables:
	* MONGO_URI=mongodb://localhost:27017/expense-tracker
	* JWT_SECRET=your-secret-key
	* EMAIL_USER=your-email-user
	* EMAIL_PASS=your-email-pass
4. Start the backend development server: npm start

Running the Application
---------------------------

1. Start the frontend development server: npm start (in the frontend directory)
2. Start the backend development server: npm start (in the backend directory)
3. Open your web browser and navigate to http://localhost:5173
4. You should see the Expense Tracker application running.

Troubleshooting
-------------------

* If you encounter any issues during setup or installation, please check the console logs for error messages.
* If you encounter any issues with the application, please check the browser console logs for error messages.
* If you are still having trouble, please feel free to open an issue on the GitHub repository.

