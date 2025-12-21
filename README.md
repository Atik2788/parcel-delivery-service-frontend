# Parcel Management Dashboard

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.3-purple)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

---

## Overview

This is a **Parcel Management Dashboard** built with **React**, **TypeScript**, **TailwindCSS**, and **Redux Toolkit**, providing a complete dashboard for **Admin**, **Sender**, and **Receiver** users. Features include:

- ✅ Admin: Manage users & parcels, block/unblock, paginate, search & filter.
- ✅ Sender: Create parcels, track status, mark parcels as returned/cancelled, give ratings to receivers.
- ✅ Receiver: Claim parcels, update tracking, give ratings to senders, view charts.
- ✅ Fully responsive and visually clean UI using **TailwindCSS**.
- ✅ API integration for live data.

---
Live Url: https://parcel-delivery-service-frontend.netlify.app/ </br>

For admin userId and pass, please contact me: https://atik2788.netlify.app/
---


## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Features](#features)
  - [Admin Dashboard](#admin-dashboard)
  - [Sender Dashboard](#sender-dashboard)
  - [Receiver Dashboard](#receiver-dashboard)
- [Technologies](#technologies)
- [License](#license)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/parcel-dashboard.git
cd parcel-dashboard
npm install
# or
yarn
npm run dev
# or
yarn dev
```
Open your browser at http://localhost:5173

```bash
VITE_API_BASE_URL=https://your-api-base-url.com
```

Available Scripts
```bash
npm run dev → Start the dev server
npm run build → Build for production
npm run preview → Preview the production build
```

Project Structure
```bash
src/
├─ app/
│  └─ store.ts
├─ components/
│  ├─ admin/
│  │  ├─ AdminDashboard.tsx
│  │  ├─ UsersSection.tsx
│  │  ├─ ParcelsSection.tsx
│  │  └─ ReceiverParcelChart.tsx
│  ├─ sender/
│  │  ├─ SenderDashboard.tsx
│  │  ├─ CreateParcel.tsx
│  │  └─ SenderParcelChart.tsx
│  ├─ receiver/
│  │  ├─ ReceiverDashboard.tsx
│  │  ├─ ClaimParcelModal.tsx
│  │  └─ TrackingUpdateModal.tsx
│  └─ ui/
│     ├─ tabs.tsx
│     ├─ button.tsx
│     └─ table.tsx
├─ features/
│  ├─ api/
│  │  └─ axios.ts
│  └─ auth/
│     └─ authApi.ts
├─ service/
│  ├─ parcelService.ts
│  └─ adminService.ts
└─ types/
   ├─ auth.ts
   └─ parcel.ts

```

### Features
#### Admin Dashboard
>>>View and manage Users: </br>
>>>Filter by role: SENDER, RECEIVER, ADMIN, SUPER_ADMIN </br>
>>>Search by name/email </br>
>>>Pagination </br>
>>>View and manage Parcels: </br>
>>>Block/Unblock parcels </br>
>>>Search parcels </br>
>>>Pagination </br>
>>>Dashboard charts & meta info for quick stats. </br>


#### Sender Dashboard
>>>Create new parcels with details </br> 
>>>View parcel statistics </br> 
>>>Update parcel status: </br> 
>>>Cancel requested/approved parcels </br> 
>>>Mark delivered parcels as returned </br> 
>>>Rate receivers after delivery </br> 

#### Receiver Dashboard
>>>Claim parcels  </br>
>>>Update tracking info  </br>
>>>Rate senders after delivery  </br>
>>>Dashboard charts showing parcel status  </br>
>>>Table view of all assigned parcels  </br>

#### Technologies
>>>React 18 & TypeScript </br>
>>>TailwindCSS for styling </br>
>>>Redux Toolkit for state management </br>
>>>Axios for API requests </br>
>>>Sonner for toast notifications </br>
>>>Vite for build tooling </br>


License </br>
This project is licensed under the MIT License.