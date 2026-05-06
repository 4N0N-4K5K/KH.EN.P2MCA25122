# Notification System Design

## Overview

This project is a Campus Notification System built using React.js and Node.js.

The system fetches notifications from the AffordMed API, sorts them based on priority, and displays the top notifications in a simple and responsive user interface.

---

# Frontend

The frontend is developed using:

- React.js
- Material UI
- Axios

Features included:

- Responsive UI
- Notification cards
- Filtering notifications
- Pagination
- Viewed notification tracking

---

# Backend

The backend is developed using:

- Node.js
- Express.js
- Axios

Backend responsibilities:

- Authenticate with API
- Fetch notifications
- Sort notifications by priority
- Send processed data to frontend

---

# Priority Logic

Notifications are sorted using the following priority:

| Type | Priority |
|------|----------|
| Placement | 3 |
| Result | 2 |
| Event | 1 |

If two notifications have the same priority, the latest notification is shown first.

---

# Features

- API Integration
- Responsive Design
- Filtering
- Pagination
- Viewed Notifications
- Logging Middleware

---

# Middleware

A simple logging middleware is used to log:

- Request method
- Request URL

---

# Tech Stack

## Frontend

- React.js
- Material UI

## Backend

- Node.js
- Express.js

---

# Conclusion

This project demonstrates a simple full-stack notification management system with API integration, sorting logic, and a responsive frontend interface.