# 🧺 Laundry Order Management System

A simple full-stack application to manage laundry orders, built with an AI-first approach.
This system allows store owners to create orders, track status, calculate billing, and view basic analytics.

## 🚀 Live Demo

* Frontend: https://laundry-order-management-system-zeta.vercel.app/
* Backend API: https://laundry-order-management-system-l2y1.onrender.com/

## 🛠 Tech Stack

* Frontend: React (Vite) + Tailwind CSS
* Backend: Node.js + Express
* Database: MongoDB (Mongoose)
* Deployment: Vercel (frontend), Render (backend)

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/kurocodes/laundry-order-management-system.git
cd laundry-order-management-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```
VITE_APP_BACKEND_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

## ✨ Features Implemented

### Core Features

* Create Order with:

  * Customer details
  * Multiple garments
  * Dynamic total calculation

* Order Status Management:

  * RECEIVED → PROCESSING → READY → DELIVERED

* View Orders:

  * List all orders
  * Filter by status
  * Search by customer name or phone

* Dashboard:

  * Total orders
  * Total revenue
  * Orders per status

### Bonus Features Implemented

* Fully functional frontend UI
* MongoDB database integration
* Search by garment type
* Estimated delivery date
* Deployment (frontend + backend)


## 🤖 AI Usage Report

### Tools Used

* ChatGPT
* Antigravity
* Google Stitch (for UI design)

### How I Used AI

AI was used primarily for:

* Generating initial backend API structure (Express + MongoDB)
* Creating frontend components and layout
* Designing UI using Google Stitch
* Speeding up boilerplate and repetitive code

I followed an iterative approach:
→ Generate → Review → Fix → Improve

### Sample Prompts (Representative)

**UI Design Prompt (Google Stitch):**
```
Design a clean and minimal web dashboard UI for a "Laundry Order Management System".

The UI should be simple, practical, and focused on functionality rather than visual complexity. Avoid fancy animations, gradients, or overly modern design trends. The goal is clarity and usability.

Layout:
A simple top navbar with:
App name: "Laundry Manager"
Optional right-side user/avatar placeholder
...
```

**Backend Generation Prompt:**
```
You are a senior backend engineer. Build a clean, simple, and production-quality REST API for a "Laundry Order Management System".

Tech Stack:

Node.js
Express.js
MongoDB with Mongoose

Important Constraints:

Keep the implementation simple and practical (no over-engineering)
Use clear folder structure
Write readable, maintainable code
Add basic validation and error handling
No unnecessary abstractions or complex patterns
...
```

**Frontend Generation Prompt:**
```
You are a senior frontend engineer. Build a clean and simple frontend for a "Laundry Order Management System".

There are two folders in this project:
Frontend and Backend

Tech Stack:

* React (Vite)
* Tailwind CSS (latest version, no tailwind.config.js)
* Axios for API calls

IMPORTANT:

* Follow the provided UI design/screens EXACTLY in layout and structure
* Do NOT redesign or add fancy UI elements
* Keep it minimal, clean, and practical

DESIGN INPUT:

explore 

stitch
folder and files inside it for UI design system, images/screens.
...
```

### Where AI Helped

* Quickly scaffolding backend routes, controllers, and models
* Generating React components and layout structure
* Converting UI ideas into implementable code
* Reducing development time for repetitive logic

### What AI Got Wrong

* Generated large, monolithic components with poor readability and low reusability
* Did not properly handle MongoDB connection setup and environment configuration
* Issues in frontend-backend integration (API mismatches and incorrect data handling)
* Incorrect field usage in UI (`order.totalAmount` instead of `order.total`), causing `NaN` values
* Status update API failed due to case-sensitivity mismatch between frontend and backend
* Dashboard data was not updating after creating or updating orders
* Pagination was incorrectly implemented

### Improvements Made

* Refactored large components into smaller, reusable, and maintainable components
* Improved overall code readability and structure across frontend and backend
* Fixed MongoDB connection issues and ensured stable environment configuration
* Resolved frontend-backend integration issues for consistent data flow
* Corrected data mapping issues (e.g., total amount calculation bug)
* Fixed status update logic by aligning frontend and backend enum values
* Ensured dashboard updates dynamically after order creation and status changes
* Implemented proper pagination for better scalability and usability


### Key Takeaway

AI significantly accelerated development, but manual intervention was required to ensure correctness, simplicity, and production readiness.


## ⚖️ Tradeoffs & Decisions

### What I Skipped

* Authentication system (to avoid over-complication and focus on core features)

### What I Would Improve With More Time

* Add authentication (JWT-based login system)
* Improve pagination for large datasets
* Improve UI responsiveness and UX polish
* Add unit tests
* Add role-based access (admin vs staff)
* Improve error handling and logging

## 📦 API Overview

### Orders

* POST /api/orders → Create order
* GET /api/orders → Get all orders (with filters)
* PATCH /api/orders/:id/status → Update status

### Dashboard

* GET /api/dashboard → Get analytics

## 📌 Notes

* The project focuses on simplicity, clarity, and fast execution
* Built using an AI-first approach as required
* Avoided over-engineering while ensuring core functionality works reliably
