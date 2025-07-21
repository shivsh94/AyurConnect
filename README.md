# AyurConnect - Ayurvedic Healthcare Platform

A modern web application connecting patients with Ayurvedic doctors for consultations and appointments.

## 🚀 Features

### For Patients
- **Doctor Discovery**: Browse and search for Ayurvedic doctors
- **Appointment Booking**: Schedule consultations with preferred doctors
- **Appointment Management**: View, cancel, and track appointment status
- **Profile Management**: Update personal information and medical history

### For Doctors
- **Appointment Requests**: View and manage incoming appointment requests
- **Patient Management**: Access patient information and appointment history
- **Profile Management**: Update professional information and specializations
- **Blog System**: Share health tips and articles (coming soon)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Redux Toolkit** - State management
- **React Router v6** - Routing
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
AyurConnect/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── Components/       # Reusable UI components
│   │   │   ├── UI/          # Basic UI components (Button, Input, etc.)
│   │   │   ├── Cards/       # Card components
│   │   │   ├── Modals/      # Modal components
│   │   │   ├── Layout/      # Layout components
│   │   │   ├── Forms/       # Form components
│   │   │   ├── Profile/     # Profile-related components
│   │   │   └── Authentications/ # Auth components
│   │   ├── pages/           # Page components
│   │   │   ├── Home/        # Landing page
│   │   │   ├── PatientHomePage/ # Patient dashboard pages
│   │   │   ├── DoctorHomePage/  # Doctor dashboard pages
│   │   │   └── Appointment/     # Appointment booking pages
│   │   ├── features/        # Redux slices
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── constants/       # Constants and configurations
│   │   └── assets/          # Static assets
│   └── public/              # Public assets
├── Backend/                 # Node.js backend application
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   └── utils/               # Utility functions
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AyurConnect
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd Frontend
   npm install

   # Install backend dependencies
   cd ../Backend
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` files in both Frontend and Backend directories:

   **Backend/.env**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```

   **Frontend/.env**
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

4. **Start the development servers**
   ```bash
   # Start backend server (from Backend directory)
   npm run dev

   # Start frontend server (from Frontend directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/user/signin` - User login
- `POST /api/v1/user/signout` - User logout
- `POST /api/v1/user/register` - User registration

### Doctor Endpoints
- `GET /api/v1/user/public/doctors` - Get all doctors (public)
- `GET /api/v1/user/getdoctor` - Get current doctor profile
- `PUT /api/v1/user/updatedoctor` - Update doctor profile

### Patient Endpoints
- `GET /api/v1/user/getpatients` - Get current patient profile
- `PUT /api/v1/user/updatepatient` - Update patient profile

### Appointment Endpoints
- `POST /api/v1/user/appointments` - Create appointment
- `GET /api/v1/user/getPatientAppointments` - Get patient appointments
- `GET /api/v1/user/getDoctorAppointments` - Get doctor appointments
- `PUT /api/v1/user/appointments/:id/cancel` - Cancel appointment
- `PUT /api/v1/user/appointments/:id/accept` - Accept appointment
- `PUT /api/v1/user/appointments/:id/decline` - Decline appointment

## 🔧 Development

### Code Style
- Use ESLint for code linting
- Follow consistent naming conventions
- Use TypeScript for better type safety (future enhancement)

### Database Schema
- **User**: Authentication and basic user info
- **Doctor**: Doctor-specific information and credentials
- **Patients**: Patient-specific information and medical history
- **Appointment**: Appointment scheduling and status management

### State Management
- Redux Toolkit for global state
- React hooks for local state
- Custom hooks for reusable logic

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Vercel/Railway)
1. Set environment variables
2. Configure MongoDB connection
3. Deploy using Vercel CLI or Railway dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@ayurconnect.com or create an issue in the repository.

## 🔮 Future Enhancements

- [ ] Video consultation integration
- [ ] Payment gateway integration
- [ ] Prescription management
- [ ] Health records management
- [ ] Mobile app development
- [ ] AI-powered health recommendations
- [ ] Multi-language support
- [ ] Advanced analytics dashboard