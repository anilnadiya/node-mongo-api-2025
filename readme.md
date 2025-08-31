Apartment Management System - Project Brief
🎯 Goal

Build a web-based system for managing apartments, tenants, maintenance, expenses, and related operations, tailored for use by residents, apartment managers, and maintenance staff.

🧱 1. Core Modules
🔐 Authentication & Authorization

Roles: Admin, Resident, Maintenance Staff, Accountant

Auth: JWT-based authentication

Permissions: Role-based access control

🏘️ Apartment & Tenant Management

Apartments List: Building, Block, Flat No.

Tenant Info: Name, Contact, Lease Period, Rent, etc.

Move-in/Move-out management

Owner vs. Renter status

🛠️ Maintenance Requests

Submit Request (by tenant)

Assign to Staff (by admin/manager)

Status Tracking: Open, In Progress, Completed

History & Comments

💸 Expense Management

Shared Expenses: Utilities, repairs, etc.

Private Expenses: Paid by specific tenants

Monthly Reports

Downloadable Receipts / PDFs

📆 Notices & Announcements

Post notices for residents (e.g., water outage, maintenance work)

Email / Push notifications

Expiration dates for announcements

📊 Dashboard

For admins and residents

Graphs: Monthly expenses, requests status

Quick links: Submit maintenance, pay dues, etc.

💳 Payment & Billing

Rent payments

Maintenance charges

Integration with payment gateway (optional)

Payment history

🔧 Admin Panel

Manage users

Manage apartments

View all requests, expenses, payments

Generate reports

🏗️ 2. Tech Stack
Frontend:

ReactJS (latest)

TypeScript

React Router v6+

Redux Toolkit / Zustand (for state)

Material UI

Formik + Yup (for forms & validation)

Backend : advance structuure

Node.js + Express

MongoDB