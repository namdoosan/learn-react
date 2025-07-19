# React Admin Panel Dashboard

Hi, I'm Clarisca 👋  
This repository contains a simple Admin Panel built using **React + Vite** and **Tailwind CSS**.  
The goal of this project is to learn how to build a clean, modular, and responsive dashboard with role-based access.

I've focused on writing clean code and following best practices throughout the project.  
Feel free to explore the features, and if you have any questions or feedback, don’t hesitate to reach out.

---

## 🧩 Tech Stack

This project is built with:

- ⚛️ **React (Vite)**
- 🎨 **Tailwind CSS**
- 🔁 **React Router DOM**
- 📦 **Axios**
- 📝 **React Hook Form**

---

## 🚀 Features

- ✅ **Authentication with Role-Based Access**
  - Admin and Manager have different access levels
  - Only Manager can access the "Manage User" page
- 🧭 **Protected Routing**
- 🧱 **Consistent Layout: Sidebar + Navbar**
- ♻️ **Reusable Components**
  - Input, Dropdown, Button, Modal, etc.
- 💵 **Currency formatting in USD**
- 🔍 **Search, sort, and filter products**
- 🧹 **Clean and modular file structure**

---

## 🛠️ Getting Started

Make sure you have [`npm`](https://www.npmjs.com/) installed and are connected to GitHub.

```bash
# Clone this repository
git clone https://github.com/namdoosan/learn-react.git

# Navigate into the project folder
cd learn-react

# Install dependencies
npm install

# Start the development server
npm run dev

#Dummy data users
You can use the following credentials to log in:

{
  "username": "Admin",     // Has limited access
  "password": "admin123"
}

{
  "username": "Manager",   // Has full access
  "password": "manager123"
}

