
# Note-Taking App - Backend

This is the backend of a Note-Taking Web Application built using Node.js, Express.js, and MongoDB. It supports features such as hierarchical categories (e.g., course, semester, subject), user authentication, and note management.

## Features

- User Sign Up and Sign In with JWT Authentication
- OTP-based Email Verification for Account Registration and Password Recovery
- Create, Read, Update, and Delete Notes
- Categorization of Notes (CollegeNote, BusinessNote, PersonalNote,Course, Semester, Subject, etc.)
- User Profile Management

## Folder Structure

```
project-root/
│   index.js             # Main entry point of the application
│   package.json         # Dependencies and scripts
│   .env.example         # Environment variable template
│   .gitignore           # Git ignore file
│
├── config/              # Configuration files (e.g., database connection)
│
├── controllers/         # Request handlers (auth, category, note, user)
│
├── models/              # Mongoose models (Category, Note, User)
│
├── routes/                #all routes like userRoute, notesRoutes etc 
├── middlewares/         # Custom middleware (e.g., authentication)
├── public/uploads       # for static files like images etc     
└── services/               # Utility functions (e.g.,JWT handling)
```

## Prerequisites

- [Node.js](https://nodejs.org/) (version 20.x or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Cloud Instance)
- [Nodemailer](https://nodemailer.com/about/) (for OTP-based email verification) -[Cloudinary](https://cloudinary.com/) (for image,files upload and storage)


## Installation

1. **Clone the repository**

```bash
git clone <repository_url>
cd note-taking-app-backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Variables**

Rename `.env.example` to `.env` and update the values accordingly:

```
PORT=8080
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>
EMAIL_USER=<Your Email Address>
EMAIL_PASS=<Your Email Password> #generate a app password from your gmail account dont use your actual passuser
CLOUDINARY_CLOUD_NAME=<your cloudinary cloud name>
CLOUDINARY_API_KEY=<your cloudinary api key>
CLOUDINARY_API_SECRET=<ypur cloudinary api secret>
```

4. **Start the application**

```bash
npm start
```

Or for development:

```bash
npm run dev
```

The server will be running on `http://localhost:5000` by default.

## Scripts

- `npm start` - Starts the server in production mode.
- `npm run dev` - Starts the server using nodemon for development.

## API Endpoints

### Authentication
- `POST /api/user/signup` - User Signup 
- `POST /api/user/signin` - User Sign In
- `POST /api/user/logout` - delete Token
- `POST /api/user/forgot-password` - Initiate password reset
- `POST /api/user/reset-password` - Reset password using link send to email 

### Notes for exmaple college note
- `GET /api/notes/college/userId` - Get  notes for the authenticated user
- `POST /api/notes/college` - Create a new note
- `PUT /api/notes/college/userId/noteId` - Update a note
- `DELETE /api/notes/college/userId/noteId` - Delete a note

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- Cloudinary (Image, files Upload)
- JWT for Authentication
- Nodemailer for Email Verification
- Bcrypt for Password Hashing

## Contributing

Feel free to fork this repository and contribute by submitting a pull request. Any contributions are highly appreciated.

## License
@Satish_Kumar_Singh, 2025. All rights reserved.
This project is licensed under the MIT License.
