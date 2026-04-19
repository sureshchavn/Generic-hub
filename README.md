# Generic-hub

A full-stack medical website application built with React, Node.js, Express, and MongoDB. This platform provides medicine information, locator services, and generic medicine alternatives finder.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Setup Instructions](#setup-instructions)
- [Client Dependencies](#client-dependencies)
- [Server Dependencies](#server-dependencies)
- [Running the Application](#running-the-application)

## 🎯 Project Overview

Generic-hub is a comprehensive medical platform that includes:
- Medicine search and information lookup
- Generic medicine alternatives finder
- Medical shop locator with map integration
- User authentication and authorization
- Admin dashboard for medicine management
- Responsive UI with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React** 19.1.1 - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Leaflet & React-Leaflet** - Map integration
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **Google GenAI** - AI integration

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin resource handling
- **Multer** - File upload handling
- **Dotenv** - Environment configuration

## 📁 Project Structure

```
Generic-hub/
├── Client/
│   ├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── types/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── postcss.config.mjs
├── Server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── index.js
│   └── package.json
├── package.json
└── README.md
```

## 💾 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB (local or cloud instance)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Generic-hub
```

### Step 2: Install Client Dependencies
```bash
cd Client
npm install
```

### Step 3: Install Server Dependencies
```bash
cd ../Server
npm install
```

### Step 4: Environment Configuration
Create a `.env` file in the Server directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## 📦 Client Dependencies

### Production Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| @google/genai | ^1.40.0 | Google AI integration |
| @tailwindcss/cli | ^4.2.2 | Tailwind CSS CLI |
| @tailwindcss/postcss | ^4.2.2 | Tailwind PostCSS plugin |
| @tailwindcss/vite | ^4.2.2 | Tailwind Vite plugin |
| axios | ^1.15.0 | HTTP client |
| leaflet | ^1.9.4 | Map library |
| lucide-react | ^1.8.0 | Icon library |
| mongodb | ^6.20.0 | MongoDB driver |
| react | ^19.1.1 | React library |
| react-dom | ^19.1.1 | React DOM rendering |
| react-leaflet | ^5.0.0 | React wrapper for Leaflet |
| react-router-dom | ^7.9.1 | Client-side routing |

### Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| @types/leaflet | ^1.9.21 | Leaflet type definitions |
| @types/node | ^22.14.0 | Node.js type definitions |
| @types/react | ^19.2.14 | React type definitions |
| @types/react-dom | ^19.2.3 | React DOM type definitions |
| @vitejs/plugin-react | ^5.0.0 | Vite React plugin |
| autoprefixer | ^10.4.27 | PostCSS autoprefixer |
| baseline-browser-mapping | ^2.10.17 | Browser compatibility mapping |
| postcss | ^8.5.9 | CSS transformations |
| tailwindcss | ^4.2.2 | Utility-first CSS framework |
| typescript | ~5.8.2 | TypeScript compiler |
| vite | ^6.3.6 | Build tool and dev server |

## 📦 Server Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| bcryptjs | ^3.0.3 | Password hashing |
| cors | ^2.8.6 | Cross-Origin Resource Sharing |
| dotenv | ^17.4.1 | Environment variable management |
| express | ^5.2.1 | Web framework |
| jsonwebtoken | ^9.0.3 | JWT authentication |
| mongodb | ^7.1.1 | MongoDB driver |
| mongoose | ^9.4.1 | MongoDB ODM |
| multer | ^2.1.1 | File upload middleware |

## 🚀 Running the Application

### Start the Server
```bash
cd Server
npm start
# or for development with auto-reload
npx nodemon index.js
```
The server will run on `http://localhost:5000`

### Start the Client (in a new terminal)
```bash
cd Client
npm run dev
```
The client will run on `http://localhost:5173` (or another available port)

### Build for Production
```bash
# Client build
cd Client
npm run build

# Client preview
npm run preview
```

## 📝 Available Scripts

### Client Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server Scripts
- `npm start` - Start the server

## 🔐 Features

- User authentication and authorization
- Medicine search functionality
- Generic medicine alternatives
- Medical store locator with map integration
- Admin panel for content management
- Responsive design for all devices
- Type-safe development with TypeScript

## 📄 License

ISC

## 👥 Author

Generic-hub Team
