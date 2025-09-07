# Real Estate Backend API

A comprehensive Node.js backend API for a real estate management system with user authentication, property management, and role-based access control.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Agent, User)
  - OTP verification system
  - Password reset functionality

- **Property Management**
  - Land/property registration
  - Property listing and search
  - Property updates and deletion
  - Image upload support

- **User Management**
  - User profile management
  - Wishlist and favorites
  - Property recommendations

- **Admin Panel**
  - User management
  - Property approval system
  - Analytics and reporting

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer, Express-fileupload
- **Email Service**: Nodemailer
- **SMS Service**: Twilio
- **Cloud Storage**: Firebase
- **Environment**: dotenv

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd assets_backend-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/real-estate-db
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Twilio Configuration
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   
   # Firebase Configuration
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   
   # Server Configuration
   PORT=8000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Password reset confirmation
- `POST /verify-otp` - OTP verification

### Land/Property Routes (`/api/auth/land`)
- `GET /` - Get all properties
- `POST /` - Create new property
- `GET /:id` - Get property by ID
- `PUT /:id` - Update property
- `DELETE /:id` - Delete property

### User Routes (`/api/auth/user`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `GET /properties` - Get user's properties
- `POST /wishlist` - Add to wishlist
- `DELETE /wishlist/:id` - Remove from wishlist
- `POST /favorites` - Add to favorites
- `DELETE /favorites/:id` - Remove from favorites

### Agent Routes (`/api/auth/agent`)
- `GET /properties` - Get agent's properties
- `POST /properties` - Create new property
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

### Admin Routes (`/api/auth/admin`)
- `GET /users` - Get all users
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user
- `GET /properties` - Get all properties
- `PUT /properties/:id` - Update property
- `DELETE /properties/:id` - Delete property

## 🏗️ Project Structure

```
assets_backend-main/
├── controllers/          # Route controllers
│   ├── admin/           # Admin-specific controllers
│   ├── agent/           # Agent-specific controllers
│   ├── user/            # User-specific controllers
│   ├── auth-controller.js
│   ├── land-controller.js
│   └── otp-controller.js
├── middleware/          # Custom middleware
│   └── auth.js         # Authentication middleware
├── model/              # Database models
│   ├── land-model.js
│   └── user-model.js
├── server/             # Route definitions
│   ├── admin-router.js
│   ├── agent-router.js
│   ├── auth-router.js
│   ├── land-router.js
│   └── user-router.js
├── utils/              # Utility functions
│   └── db.js          # Database connection
├── index.js            # Main server file
├── package.json
└── README.md
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 🚦 Role-Based Access Control

- **Admin**: Full access to all resources
- **Agent**: Can manage properties and view assigned users
- **User**: Can manage own profile and properties

## 📝 Environment Variables

Make sure to set up all required environment variables in your `.env` file. Refer to the installation section for the complete list.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

If you have any questions or need help, please open an issue in the repository.

## 🔄 Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon

---

**Note**: This is a backend API. You'll need a frontend application to interact with these endpoints.