# Firebase Task Manager

A modern task management application built with Next.js, Firebase Authentication, and Firestore. Features secure user authentication and full CRUD operations for tasks.

## Features

- **User Authentication** - Secure login/register with Firebase Auth
- **Task Management** - Create, read, update, and delete tasks
- **Priority System** - Organize tasks by Low, Medium, or High priority
- **Real-time Updates** - Live synchronization with Firestore
- **Protected Routes** - Automatic redirect for unauthenticated users
- **Responsive Design** - Works on all devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase Auth & Firestore
- **Deployment**: Vercel

4. **Firebase Setup**
   - Enable Email/Password authentication in Firebase Console
   - Create a Firestore database
   - Set up security rules (see below)


## Demo Credentials

For testing purposes:
- **Email**: testuser@gmail.com
- **Password**: test1234

## 🎯 Usage

1. **Register** a new account or **login** with demo credentials
2. **Create tasks** with title, description, and priority
3. **Mark tasks** as complete/incomplete
4. **Edit or delete** tasks as needed
5. **View dashboard** for task statistics

Live demo : https://firebase-crud-to-do.vercel.app/