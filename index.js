require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const cookieParser = require("cookie-parser")


const userRoute = require("./routes/userRoute")
const notesRoute = require("./routes/notesRoute")


const app = express();
PORT = process.env.PORT || 8080;
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin: process.env.FRONTEND_URL,  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true 
  }));


app.use('/api/user', userRoute );
app.use('/api/notes',notesRoute);


app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT} `);
})