nvoice Management App (HNG Stage 2)

A responsive Invoice Management Application built as part of the HNG 14 Frontend Stage 2 Internship Task.
This app allows users to create, manage, filter, and track invoices with full CRUD functionality, theme switching, and persistent state.

🚀 Live Demo

Add your deployed link here
Example: https://your-app.vercel.app

📁 Repository

Add your GitHub repo link here
Example: https://github.com/your-username/invoice-app

🎯 Project Objective

Build a fully functional invoice management system based on a provided Figma design with the ability to:

Create invoices
Read/view invoices
Update invoices
Delete invoices
Save drafts
Mark invoices as paid
Filter invoices by status
Toggle light/dark mode
Persist data using LocalStorage (or backend optional)
⚙️ Features
🧾 CRUD Functionality
Create new invoices via form modal
View invoice list and details
Edit existing invoices
Delete invoices with confirmation modal
📝 Form Validation
Required field validation
Email format validation
Quantity and price validation
Prevent submission of invalid data
Inline error messages for each field
📦 Invoice Status System

Invoices support three statuses:

🟡 Draft
🔵 Pending
🟢 Paid
Rules:
Draft invoices can be edited
Pending invoices can be marked as paid
Paid invoices are locked from reverting to draft
🔍 Filtering

Users can filter invoices by:

All
Draft
Pending
Paid

Filter updates dynamically with no page reload.

🌗 Theme Toggle
Light and Dark mode support
Global theme context
Preference saved in LocalStorage
Fully responsive theme switching
📱 Responsive Design

Optimized for:

📱 Mobile (320px+)
📱 Tablet (768px+)
💻 Desktop (1024px+)

Ensures:

No horizontal scrolling
Proper spacing across breakpoints
Fully usable UI on all devices
🧩 Interactive Features
Hover states on buttons and invoice cards
Keyboard navigable UI
Accessible form controls
Smooth UI transitions
🏗️ Tech Stack
React (Vite or CRA)
JavaScript (ES6+)
CSS / Tailwind CSS (if used)
React Router DOM
LocalStorage API
🧠 Architecture Overview

The app is structured into reusable components:

InvoiceList → displays all invoices
InvoiceDetails → single invoice view
InvoiceForm → create/edit invoices
StatusBadge → displays invoice status
FilterBar → filtering controls
ThemeContext → manages light/dark mode
💾 Data Structure

Each invoice object follows this structure:

{
id: 1,
displayId: "INV-001",
clientName: "John Doe",
email: "john@example.com",
status: "pending", // draft | pending | paid
items: [
{
name: "Design Work",
quantity: 2,
price: 500
}
],
total: 1000,
createdAt: "2026-04-20",
dueDate: "2026-04-25",
companyAddress: {},
clientAddress: {}
}
🧪 Validation Rules
Client name must be at least 3 characters
Valid email format required
At least one invoice item required
Quantity and price must be positive numbers
All required fields must be filled before submission
🌐 State Management
React useState used for local state
Context API used for global invoice state
LocalStorage used for persistence
♿ Accessibility Features
Semantic HTML (article, section, form)
Proper labels for inputs
Keyboard navigation support
ARIA labels where necessary
Focus visible states
Color contrast compliance (WCAG AA)
🔄 Persistence
Invoice data stored in LocalStorage
Theme preference saved in LocalStorage
Data persists across page refresh
📌 Future Improvements
Backend integration (Node.js / Express / Firebase)
Authentication system
Database storage (MongoDB / PostgreSQL)
Invoice PDF export
Email invoice feature
🧑‍💻 Author

Built by: Firestarter
HNG Internship 2026 – Stage 2 Frontend Task
