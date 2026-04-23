## Invoice Management App (HNG Stage 2)

A responsive Invoice Management Application built as part of the HNG 14 Frontend Stage 2 Internship Task.
This app allows users to create, manage, filter, and track invoices with full CRUD functionality, theme switching, and persistent state.

## Live Demo

Add your deployed link here
Example: 'https://stage2task.zeta.vercel.app'

## Repository

Add your GitHub repo link here
Example: 'https://github.com/Scarlet70/Stage2task'

## Project Objective

## Features

## CRUD Functionality

Create new invoices via form modal
View invoice list and details
Edit existing invoices
Delete invoices with confirmation modal

## Form Validation

- Required field validation
- Email format validation
- Quantity and price validation
- Prevent submission of invalid data
- Inline error messages for each field

## Invoice Status System

Invoices support three statuses:

- Draft
- Pending
- Paid

Rules:

- Draft invoices can be edited
- Pending invoices can be marked as paid
- Paid invoices are locked from reverting to draft

## Filtering

Users can filter invoices by:

- All
- Draft
- Pending
- Paid

## Filter updates dynamically with no page reload.

## Theme Toggle

Light and Dark mode support
Global theme context
Preference saved in LocalStorage
Fully responsive theme switching
📱 Responsive Design

Optimized for:

Mobile (320px+)
Tablet (768px+)
Desktop (1024px+)

Ensures:

No horizontal scrolling
Proper spacing across breakpoints
Fully usable UI on all devices

## Interactive Features

    Hover states on buttons and invoice cards
    Keyboard navigable UI
    Accessible form controls
    Smooth UI transitions

## Tech Stack

    React (Vite or CRA)
    JavaScript (ES6+)
    CSS / Tailwind CSS (if used)
    React Router DOM
    LocalStorage API

🧠

## Accessibility Features

Semantic HTML (article, section, form)
Proper labels for inputs
Keyboard navigation support
ARIA labels where necessary
Focus visible states
Color contrast compliance (WCAG AA)

## Persistence

Invoice data stored in LocalStorage
Theme preference saved in LocalStorage
Data persists across page refresh

## Future Improvements

Backend integration (Node.js / Express / Firebase)
Authentication system
Database storage (MongoDB / PostgreSQL)
Invoice PDF export
Email invoice feature

## Author

Built by: Cheta.Dev
HNG Internship 2026 – Stage 2 Frontend Task
