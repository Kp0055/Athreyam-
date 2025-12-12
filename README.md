# 🏥 Athreyam - Doctor Consulting Platform

A comprehensive full-stack telemedicine platform connecting patients with healthcare professionals through video consultations, appointment booking, real-time chat, and integrated payment systems.

## ✨ Features

### For Patients
- 🔍 **Find Doctors** - Search and filter doctors by specialization, location, and availability
- 📅 **Book Appointments** - Schedule consultations with preferred doctors
- 💬 **Real-time Chat** - Communicate with doctors via instant messaging
- 💳 **Integrated Payments** - Secure payment processing with Razorpay and Stripe
- 👤 **Profile Management** - Manage personal information and view appointment history
- 💰 **Digital Wallet** - Track transactions and manage wallet balance
- 📱 **Social Feed** - View and interact with health-related posts from doctors
- 🔔 **Notifications** - Stay updated with appointment reminders and messages

### For Doctors
- 📊 **Dashboard** - View analytics and appointment statistics
- 📋 **Booking Management** - Manage patient appointments and schedules
- 💬 **Patient Communication** - Chat with patients in real-time
- 📝 **Content Sharing** - Post health tips and educational content
- 👨‍⚕️ **Profile Management** - Update credentials, education, and certifications
- 💵 **Payment Tracking** - Monitor earnings and transaction history
- 🔐 **Secure Authentication** - JWT-based authentication with Google OAuth support

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **Styling**: Tailwind CSS + DaisyUI
- **Routing**: React Router DOM v6
- **Forms**: React Hook Form
- **UI Components**: Heroicons, React Icons
- **Charts**: Chart.js with react-chartjs-2
- **Real-time**: Socket.io Client
- **Payments**: Stripe & Razorpay integration
- **Notifications**: React Hot Toast
- **Authentication**: Firebase

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport.js (Google OAuth 2.0)
- **Real-time**: Socket.io
- **File Upload**: Multer
- **Payment Gateways**: Razorpay, Stripe
- **Session Management**: Express Session with Connect-Mongo
- **Security**: bcrypt for password hashing
- **Cloud Storage**: Firebase

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas account)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Kp0055/Athreyam-.git
cd Athreyam-
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory (see [backend/.env.example](backend/.env.example)):

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Payment Gateways
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
STRIPE_SECRET_KEY=your_stripe_secret_key

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket

# CORS
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (see [frontend/.env.example](frontend/.env.example)):

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000

# Firebase
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket

# Payment
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Google OAuth
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🏃 Running the Application

### Development Mode

**Backend:**
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:5000`

**Frontend:**
```bash
cd frontend
npm start
```
The frontend will start on `http://localhost:3000`

### Production Mode

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder using a static server
```

## 📁 Project Structure

```
Athreyam-/
├── backend/
│   ├── src/
│   │   ├── config/          # Database and configuration
│   │   ├── controller/      # Route controllers
│   │   │   ├── user/        # User-related controllers
│   │   │   ├── doctorController/  # Doctor-related controllers
│   │   │   └── chat/        # Chat functionality
│   │   ├── middlewares/     # Authentication & authorization
│   │   ├── models/          # Mongoose schemas
│   │   │   ├── User/        # User and transaction models
│   │   │   ├── Doctor/      # Doctor and post models
│   │   │   ├── booking/     # Appointment models
│   │   │   └── messages/    # Chat message models
│   │   ├── routers/         # API routes
│   │   ├── socket/          # Socket.io configuration
│   │   ├── utils/           # Helper functions
│   │   └── server.ts        # Entry point
│   ├── uploads/             # File uploads storage
│   └── package.json
│
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── app/             # Redux store configuration
│   │   ├── components/      # React components
│   │   │   ├── User/        # Patient components
│   │   │   ├── Doctor/      # Doctor components
│   │   │   └── Reusable/    # Shared components
│   │   ├── features/        # Redux slices
│   │   ├── pages/           # Page components
│   │   │   ├── User/        # Patient pages
│   │   │   └── Doctor/      # Doctor pages
│   │   ├── Routers/         # Route configuration
│   │   ├── types/           # TypeScript type definitions
│   │   └── util/            # Utility functions
│   └── package.json
│
├── .github/
│   └── workflows/           # CI/CD workflows
├── .gitignore
└── README.md
```

## 🔌 API Overview

### User Endpoints
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/doctors` - Find doctors
- `POST /api/user/booking` - Book appointment
- `GET /api/user/appointments` - Get user appointments
- `POST /api/user/wallet` - Wallet operations

### Doctor Endpoints
- `POST /api/doctor/register` - Doctor registration
- `POST /api/doctor/login` - Doctor login
- `GET /api/doctor/profile` - Get doctor profile
- `PUT /api/doctor/profile` - Update doctor profile
- `POST /api/doctor/education` - Add education
- `POST /api/doctor/certification` - Add certification
- `GET /api/doctor/bookings` - Get doctor bookings
- `GET /api/doctor/dashboard` - Dashboard statistics

### Chat Endpoints
- `GET /api/chat/messages` - Get chat messages
- `POST /api/chat/send` - Send message

## 🔐 Authentication

The platform uses multiple authentication methods:
- **JWT Tokens** - Secure API authentication
- **Google OAuth 2.0** - Social login integration
- **Session Management** - Persistent user sessions
- **Protected Routes** - Role-based access control

## 💳 Payment Integration

Supports multiple payment gateways:
- **Razorpay** - Primary payment gateway
- **Stripe** - Alternative payment option
- **Wallet System** - Internal wallet for transactions

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests (if configured)
cd backend
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- **Kp0055** - [GitHub Profile](https://github.com/Kp0055)

## 🙏 Acknowledgments

- React and Redux communities
- Express.js and Node.js communities
- MongoDB team
- All open-source contributors

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

**Made with ❤️ for better healthcare accessibility**
