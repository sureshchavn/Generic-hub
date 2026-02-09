# Generic Hub

Welcome to Generic Hub, an informational web application designed to help users find, compare, and learn about affordable generic medicines. This project showcases a modern frontend built with React, demonstrating a clean, user-friendly interface for both customers and administrators.

The application is built as a frontend-only experience, using the browser's `localStorage` to simulate a database for a fully interactive demo.

## How It Works

This project is a **frontend-only application** that runs entirely in the browser without needing a backend server. Here’s a breakdown of its implementation:

- **Data Persistence:** Instead of a traditional database, the application uses the browser's **`localStorage`**. When the app first loads, it reads initial data from the `constants.ts` file. Any changes made (like an admin adding a new medicine or a user registering) are saved as JSON strings in `localStorage`. This makes the data persist between browser sessions.

- **State Management:** Global state is managed using **React's Context API**.
    - **`MedicineContext`**: Acts as a centralized store for all medicine data. When an admin modifies the data, this context updates, and all components consuming it (like the homepage) re-render automatically to show the latest information.
    - **`AuthContext`**: Manages user authentication state, keeping track of the logged-in user and their role (`admin` or `customer`) across the entire application.
    - **`ThemeContext`**: Manages the application-wide theme, allowing users to toggle between light and dark modes.

- **Routing:** The application uses **React Router** to handle navigation. All pages are single-page application (SPA) routes, providing a seamless user experience without full page reloads. Protected routes are implemented to restrict access to certain pages (like the `/admin` dashboard) based on user roles.

## Key Features

### For Customers:
- **Browse & Search:** Easily search for medicines by brand name, generic name, or manufacturer.
- **Detailed Views:** Access detailed information for each medicine, including description, pricing, and stock status.
- **Quick View Modal:** Quickly preview medicine details from the homepage without navigating away.
- **Compare Medicines:** Select multiple medicines for a side-by-side comparison of their key details.
- **Store Locator:** A page showing the location of Generic Hub compared to other local pharmacies, highlighting its affordability and convenience.
- **User Accounts:** Register and log in to a customer account.
- **Light & Dark Mode:** A fully-featured theme toggle for a comfortable viewing experience at any time of day.

### For Administrators:
- **Admin Dashboard:** A protected, dedicated panel for managing the medicine inventory.
- **CRUD Operations:** Admins can easily Create, Read, Update, and Delete medicine listings.
- **Seamless Management:** Changes made in the admin panel are instantly reflected across the entire application.

## Technology Stack & Libraries

- **Core Framework:** **React** with **TypeScript** for building the user interface with type safety.
- **Routing:** **React Router** (`react-router-dom`) is used for client-side routing and navigation between pages.
- **Styling:** **Tailwind CSS** is used for utility-first styling, allowing for rapid development of a responsive and modern UI.
- **State Management:** **React Context API** is used for managing global application state (e.g., user authentication, medicine data, theme) without external libraries like Redux.
- **Data Storage:** The browser's **`localStorage` Web API** is used to persist data locally, simulating a database.

## API Key Management (Future Integration)

### Current Status
This is a fully self-contained frontend application. **It does not currently use any external APIs, and therefore, no API keys are required to run the project.** The Store Locator page uses a static map image for demonstration purposes.

### How to Add an API Key in the Future
The project is pre-configured to make integrating an API (like Google Maps for the Store Locator) straightforward. It is critical to handle API keys securely. Do **not** write your key directly into a component. Here is the recommended approach:

**1. Locate the `config.ts` file:**
In the root directory, there is a file named `config.ts`. This file is intended to hold your secret keys.

**2. Add your key to `config.ts`:**
Open the file and replace the placeholder with your actual key. For example:
```typescript
// config.ts
export const GOOGLE_MAPS_API_KEY = "YOUR_SECRET_API_KEY_GOES_HERE";
```

**3. IMPORTANT: Secure Your Key:**
The `config.ts` file contains sensitive information and **must not be committed to version control (like Git)**. If you are using Git, create a `.gitignore` file in the root of your project and add the following line to it to prevent the file from being tracked:
```
# .gitignore
config.ts
```

**4. Use the Key in Your Application:**
Now, you can safely import and use the key wherever you need it. For example, in `LocatorPage.tsx`:
```typescript
import { GOOGLE_MAPS_API_KEY } from '../config';

// ... inside your component logic, you could load the Google Maps script:
const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=weekly`;
```

## Getting Started

No complex setup or build process is required. To run the project:
1. Make sure all the files are in the same directory.
2. Open the `index.html` file in your preferred web browser.

## Project Structure

```
/
├── components/      # Reusable React components (Navbar, MedicineCard, etc.)
│   ├── Logo.tsx
│   └── ...
├── context/         # React Context providers for global state
│   ├── AuthContext.tsx
│   ├── MedicineContext.tsx
│   └── ThemeContext.tsx
├── pages/           # Top-level page components for each route (HomePage, AdminPage, etc.)
├── config.ts        # For storing API keys. MUST be gitignored.
├── constants.ts     # Initial mock data for medicines and stores.
├── types.ts         # TypeScript type definitions for the application.
├── App.tsx          # Main application component with routing setup.
├── index.tsx        # Entry point of the React application.
└── index.html       # The main HTML file.
```

## Demo Credentials

You can test the full functionality of the application using the following roles:

- **Admin User:**
  - **Username:** `admin`
  - **Password:** `admin123`
  - This account provides access to the Admin Dashboard located at the `/admin` route.

- **Customer User:**
  - Feel free to register any new account through the "Sign Up" page. This will grant you access to customer-specific features.
# Generic-hub
This is medical website 
