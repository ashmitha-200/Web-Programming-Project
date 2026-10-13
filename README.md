# CampusConnect — Placement Cell Management System

A responsive React frontend for a college placement cell. Built with **React.js, HTML, CSS, and JavaScript** using Vite.

## Features

- Dashboard with placement KPIs, progress, schedule, and recent applications
- Student records: add, edit, search, filter, delete, and export CSV
- Company directory: add, edit, search, and remove recruiting companies
- Job openings: publish/edit roles, eligibility criteria, deadlines, and packages
- Application tracker with editable recruitment statuses
- Placement calendar and recruitment event overview
- Analytics by department and application stage
- Settings page and demo-data reset
- Local browser storage so changes persist after refreshing
- Responsive layout for desktop, tablet, and mobile

## Requirements

- Node.js (LTS recommended)
- Visual Studio Code
- Internet connection for the first dependency install (Google Fonts are also loaded online)

## Run in VS Code

1. Extract `placement-cell-management-system.zip`.
2. Open the extracted `placement-cell-management-system` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Notes

- This is a **frontend-only demonstration**. There is no backend, shared database, or real login/authentication yet.
- Records are saved to the browser's `localStorage`; they are local to that browser/device.
- Company names, student details, application records, and placement figures are sample/demo data. Replace them with your college's authorized data before any real use.
- CSV export downloads the currently displayed records.
- For a production deployment, add a secure backend/database, authentication, role-based permissions, input validation, and appropriate privacy controls.

## Reset demo data

Open the **Settings** page and choose **Restore demo data**.
