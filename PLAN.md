# Multi-Timezone Meeting Scheduler API – Implementation Plan (Monolithic)

This project helps users across different timezones find overlapping meeting slots and book them easily. It includes authentication, timezone logic, scheduling, notifications, and extensibility for integrations.

---

## ✅ Phase 1: Project Setup & Boilerplate

- [x] Scaffold NestJS project with modular structure
- [x] Setup ESLint, Prettier, and Husky
- [x] Create `.env` and config module
- [x] Initialize Docker Compose for PostgreSQL and Redis
- [x] Setup Prisma with PostgreSQL
- [x] Create Swagger/OpenAPI setup

---

## ✅ Phase 2: Auth & User Management

- [ ] Register/Login endpoint with JWT
- [ ] Secure routes with AuthGuard
- [ ] Hash passwords using bcrypt
- [ ] Setup user roles: `user`, `guest`
- [ ] Add user profile fields: `timezone`, `workingHours`
- [ ] CRUD endpoints for profile

---

## ✅ Phase 3: Availability & Scheduling Logic

- [ ] Create availability module
- [ ] Endpoint to define/set availability (daily working hours)
- [ ] Endpoint to generate shareable link
- [ ] Endpoint for guests to input timezone & preferred hours
- [ ] Implement timezone-aware overlap calculation (Luxon)
- [ ] Return available slots between users

---

## ✅ Phase 4: Booking System

- [ ] Booking endpoint to reserve time slots
- [ ] Block overlapping slots after booking
- [ ] Send confirmation emails with iCal links
- [ ] Add meeting entity: user_id, guest_id, start_time, end_time

---

## ✅ Phase 5: Notification Queue System

- [ ] Integrate Redis + BullMQ
- [ ] Create a reminder job to run X mins before a meeting
- [ ] Add retry logic and logging
- [ ] Set up a worker to consume and send reminder emails

---

## ✅ Phase 6: API Keys & Webhooks

- [ ] Generate API keys per user
- [ ] Secure endpoints with API key auth (optional)
- [ ] Allow users to register webhooks
- [ ] Trigger webhooks on booking or cancellation events

---

## ✅ Phase 7: DevOps & Deployment

- [ ] Dockerize the NestJS app
- [ ] Use GitHub Actions to build/test/deploy
- [ ] Deploy to Railway / Render
- [ ] Environment-based config support

---

## ✅ Phase 8: Documentation & Showcase

- [ ] Complete Swagger API docs
- [ ] Create Postman collection
- [ ] Add ERD diagram
- [ ] Record Loom video to explain project
- [ ] Write README with features, setup, and tech highlights

---

## ✅ Bonus: Optional Frontend

- [ ] Simple React/Next.js calendar UI
- [ ] Input availability and show overlapping slots
- [ ] Call API endpoints from UI
