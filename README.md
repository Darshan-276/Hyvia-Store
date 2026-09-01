# Hyvia

> A modern full-stack e-commerce platform built for a seamless, fast, and secure shopping experience.

[![Status](https://img.shields.io/badge/status-in%20development-yellow)]()
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

---

## **🌐 Overview**

Hyvia is a full-stack e-commerce platform covering the complete shopping flow — product discovery, cart, authentication, checkout with real (test-mode) payments, order tracking, and an admin panel for managing the store.

It's my first full-stack project, built solo and end-to-end as a hands-on learning project. Every core feature is implemented from scratch to actually understand the layer it lives in, not just to get it working.

📄 A full Software Requirements Specification (architecture, database design, API design, MVP scope, and everything deferred to later phases).

---

## **🎯 Goals**

- Build a complete, real-world full-stack application — not a tutorial clone
- Learn modern web development by implementing it, not just reading about it
- Produce a portfolio-quality project that demonstrates real software engineering judgment, including what to build now versus later

---

## **✨ Features**

###  **Shipped in MVP (this build)**

### **Shopping Experience**
- Responsive product catalogue with category browsing
- Product detail pages (SEO-friendly slug URLs)
- Stock status indicators
- Featured products (homepage curation)

### **Cart**
- Add / remove / update quantity
- Persistent cart (guest → merged on login)
- Stock validation before checkout

### **Authentication**
- Register, login, logout
- JWT auth via httpOnly secure cookies (not localStorage — avoids XSS token theft)
- Protected routes, role-based access (user/admin)

### **Checkout & Orders**
- Stripe Checkout (test mode), server-side price validation
- Order creation only after webhook-confirmed payment
- Order history + status tracking (Pending → Confirmed → Processing → Shipped → Delivered)
- Order cancellation (while Pending/Confirmed)

### **Admin**
- Product & category CRUD (soft-delete via `active` flag — a product in an existing order can never be hard-deleted)
- Order status management

### **Security**
- bcrypt password hashing
- httpOnly cookies, server-side role checks (not just hidden UI)
- Input validation on every write route, rate limiting on auth
- Stripe webhook signature verification — payment status is never trusted from the client

### **Planned — Post-MVP (V2)**

- Product search, filtering, sorting
- Wishlist
- Coupon codes
- Product reviews & ratings
- Order status timeline UI
- Basic analytics events
- Cloudinary-based image uploads (currently: image URL strings on the Product model)

 ### **Future**

- AI-assisted recommendations/search
- Multi-vendor support
- Multi-currency / multi-language

---

## **🧱 Architecture**

```
                    ┌─────────────────────────┐
                    │       Hyvia WEB          │
                    │   Next.js 14 + TypeScript │
                    └────────────┬────────────┘
                                 │
                                 │ REST API (Axios, credentials included)
                                 ▼
                    ┌─────────────────────────┐
                    │      EXPRESS API         │
                    │    Node.js + Express     │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
                    ▼                         ▼
             ┌──────────────┐         ┌──────────────┐
             │   MongoDB    │         │    Stripe    │
             │    Atlas     │         │  (test mode) │
             └──────────────┘         └──────────────┘
```

**General request flow**
```
User → Next.js Frontend → REST API → Express Backend → Business Logic → MongoDB
```

**Authentication flow**
```
Register / Login
   ↓
Backend validates credentials, hashes/verifies password
   ↓
JWT generated → set as httpOnly cookie
   ↓
Subsequent requests → cookie sent automatically → auth middleware verifies → authorized
```
httpOnly cookies are used specifically so the auth token is never accessible to client-side JavaScript — a meaningful security upgrade over storing it in localStorage.

**Payment flow**
```
Checkout → Backend validates order & prices (never trusts client-sent totals)
   ↓
Stripe Checkout Session created
   ↓
Stripe-hosted checkout → Payment
   ↓
Stripe Webhook (signature-verified) → Order marked Confirmed
```
Hyvia never stores raw card data — Stripe carries that entire scope.

---

## **🧰 Tech Stack**

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Axios |
| Backend | Node.js, Express, REST API |
| Auth | JWT, httpOnly cookies, bcrypt |
| Database | MongoDB Atlas, Mongoose |
| Payments | Stripe (test mode) |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas |
| Dev tools | Git, GitHub, npm, ESLint |

---

## **📁 Project Structure**

```
Hyvia/
├── client/                    # Next.js frontend
│   ├── app/                     # App Router pages
│   ├── components/              # Reusable UI components
│   ├── lib/                     # Axios client, utilities
│   └── types/                   # TypeScript interfaces
│
├── server/                    # Express backend
│   └── src/
│       ├── config/                # DB connection, env config
│       ├── controllers/           # Route logic
│       ├── middleware/            # Auth, error handling
│       ├── models/                # Mongoose schemas
│       └── routes/                # API route definitions
│
└── docs/                      # SRS, architecture notes
```

---

## **🗃️ Core Data Models**

| Model | Stores |
|---|---|
| **User** | Name, email, hashed password, role (user/admin), address |
| **Product** | Name, slug, description, price, discount, category ref, images, stock, `featured` flag, `active` flag (soft-delete) |
| **Category** | Name, slug |
| **Cart** | One per user; embedded items with product ref, quantity, and price *snapshotted at add-time* |
| **Order** | User ref, embedded order items (name/price/image *snapshotted at order time* — historical orders never change even if the product does later), shipping address, totals, payment status, order status, Stripe payment intent ID |

Full field-level schema (types, required fields, indexes) is documented in the SRS.

---

## **🔌 API**

### **Auth**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### **Products**
- `GET /api/products` — supports `?category`, `?featured`, `?page`
- `GET /api/products/:slug`
- `POST /api/products` — admin
- `PUT /api/products/:id` — admin
- `DELETE /api/products/:id` — admin — soft-delete

### **Categories**
- `GET /api/categories`
- `POST /api/categories` — admin

### ### **Cart**
- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/:itemId`
- `DELETE /api/cart/:itemId`

### **Payments**
- `POST /api/payments/create-intent`
- `POST /api/payments/webhook` — Stripe signature verified

### **Orders**
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PATCH /api/orders/:id/cancel`
- `PATCH /api/orders/:id/status` — admin

Every route follows a consistent error shape: `{ error: { code, message } }`.

---

## **🎨 Design**

The visual direction: clean layout, premium but restrained (not flashy), product-first presentation, strong typography, minimal clutter. One accent color, consistent spacing scale, and the same component system (buttons, cards, forms) reused across the storefront and the admin panel — the goal is a store that feels like a real product, not a demo.

---

## **📸 Screenshots**

_Added as major UI milestones land._

| Homepage | Product Catalogue | Product Detail |
|---|---|---|
| Coming soon | Coming soon | Coming soon |

| Cart | Checkout | Admin Dashboard |
|---|---|---|
| Coming soon | Coming soon | Coming soon |

---

## **🚀 Getting Started**

### **Prerequisites**
- Node.js (v18+), npm, Git
- MongoDB Atlas account (free tier)
- Stripe account (test mode)

### **1. Clone**
```bash
git clone https://github.com/Darshan-276/Hyvia-Store.git
cd Hyvia-Store
```

### **2. Backend**
```bash
cd server
npm install
```
Create `server/.env`:
```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<a long random string>
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=<your Stripe test secret key>
STRIPE_WEBHOOK_SECRET=<your Stripe webhook secret>
```
```bash
npm run dev
```

### **3. Frontend**
```bash
cd client
npm install
```
Create `client/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your Stripe test publishable key>
```
```bash
npm run dev
```

Visit `http://localhost:3000`. **Never commit real secrets — both `.env` files are gitignored.**

---

## **🛣️ Roadmap**

### **Weeks 1–5 (MVP build)**
- [ ] Week 1 — React basics, product listing & detail pages
- [ ] Week 2 — Cart state, Express API skeleton
- [ ] Week 3 — MongoDB integration, real product data
- [ ] Week 4 — Auth, checkout, Stripe integration
- [ ] Week 5 — Admin panel, deployment

### **Post-MVP (V2)**
- [ ] Search, filtering, sorting
- [ ] Wishlist
- [ ] Coupon system
- [ ] Reviews & ratings
- [ ] Cloudinary image uploads
- [ ] Basic analytics

### **Future**
- [ ] AI-assisted recommendations
- [ ] Multi-vendor support
- [ ] Localization

---

## **📚 What I'm Learning Through Hyvia**

- **Frontend:** React, Next.js App Router, TypeScript, component design, state management, forms, API integration
- **Backend:** Express, REST API design, middleware, controllers, authentication/authorization
- **Database:** MongoDB, Mongoose schemas, CRUD, indexing, embedding vs. referencing
- **Production concepts:** auth security (JWT, httpOnly cookies), payment systems, webhook verification, environment config, deployment

I have an Electronics & Communication background — no prior web development experience going in. Every core feature here (auth, cart, checkout, admin logic) was written by hand to understand it properly; AI tools were used for boilerplate and setup only, never for the logic itself.

---

## **🧪 Testing**

Planned coverage as the build progresses: authentication flows, cart/stock validation logic, checkout and Stripe payment flow, admin authorization, and API endpoint tests for the highest-risk routes (auth, payments).

---

## **🔮 Future Improvements**

Wishlist, recently viewed products, coupon codes, better order tracking, basic analytics, product recommendations — added only once they provide real value, not just to pad the feature list.

---

## **🤝 Contributing**

Hyvia is currently a personal learning and portfolio project. Suggestions and discussion are welcome via Issues.

---

## **👨‍💻 Author**

**Darshan Deshmukh**
ECE Student • Full-Stack Developer • Builder

GitHub: https://github.com/Darshan-276
LinkedIn: https://www.linkedin.com/in/276-darshan-deshmukh/

## **📄 License**

MIT
