# LUMÉ — Full-Stack E-Commerce Platform

A full-stack e-commerce application built with the MERN stack, covering the
complete shopping flow — browsing, cart, checkout, order tracking — plus an
admin dashboard for product and order management.

**Live demo:** [link]
**Video walkthrough / screenshots:** [link or embed]

## Features

- JWT-based authentication with role-based access (customer vs. admin)
- Product browsing with server-side search, category filtering, and pagination
- Cart and checkout flow with order placement and stock validation
- Order history for customers, with cancellation support
- Admin dashboard: create/edit/delete products with Cloudinary image upload,
  manage order statuses
- Server-side input validation and centralized error handling

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, React Router
**Backend:** Node.js, Express, MongoDB, Mongoose
**Auth:** JWT
**Image hosting:** Cloudinary (via Multer)
**Deployment:** Vercel (client + server as separate projects)

## Getting Started

1. Clone the repo and install dependencies in both `client/` and `server/`
2. Copy `server/.env.example` to `server/.env` and fill in your MongoDB URI,
   JWT secret, and Cloudinary credentials
3. `npm run dev` in `server/`, `npm run dev` in `client/`
4. Optional: `npm run seed` in `server/` to load sample products

## What I'd improve next

- Atomic stock decrement to fully prevent overselling under concurrent orders
- Automated tests (Jest/Supertest) for auth and order flows
- Refresh-token flow instead of a flat 7-day JWT

## Author

Daniyal Ali — [LinkedIn] — [portfolio/GitHub]
