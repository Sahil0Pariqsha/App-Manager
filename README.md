## Task Manager Application

Welcome to the Task Manager application project. This is simple yet effective task management web app, in which you can manage your tasks based on their priorities.
- To test it either you have to create your own account or you can use test user createntials  

- <b>Test User Credentials : <br></b>
`email` : test123@gmail.com <br>
`password` : Test@123

## Table of Contents
- [Project Images](#project-images)
- [Features](#features)
- [Getting Started](#getting-started)

## Project Images :
<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">

  <div style="flex: 0 50%;">
    <img src="public/images/Screenshot (86).png" alt="Image 1" style="width: 100%;">
  </div>

  <div style="flex: 0 50%;">
    <img src="public/images/Screenshot (83).png" alt="Image 2" style="width: 100%;">
  </div>

  <div style="flex: 0 50%;">
    <img src="public/images/Screenshot (84).png" alt="Image 3" style="width: 100%;">
  </div>

 <div style="flex: 0 50%;">
    <img src="public/images/Screenshot (82).png" alt="Image 4" style="width: 100%;">
  </div>

</div>

## Features
- **User Authentication**: Secure login and registration using JWT.
- **Task Management**: Create, read, update, and delete tasks.
- **Task Categories**: Organize your tasks with importance priorities.
- **Responsive Design**: Mobile-friendly layout.
- **Personalized Profile**: Add your own profile avatar and user name.

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

Ensure you have the following installed:
- Node.js (version 14 or higher)
- npm (or yarn)
- MongoDB (if you are using MongoDB as your database)

### Step 1: Clone the Repository

```bash
git clone https://github.com/SahilLamba0008/App-Manager-nextjs
cd App-Manager-nextjs
```

### Step 2: Install Dependencies
Navigate to the project root and install the necessary dependencies:
```bash
npm install
```

### Step 3: Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following environment variables:
```bash
NEXT_PUBLIC_HOST=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Step 4: Run the Development Server
Start the development server:
```bash
npm run dev
```