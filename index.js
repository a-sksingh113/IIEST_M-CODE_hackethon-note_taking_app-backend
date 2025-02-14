require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConnection');
const cookieParser = require("cookie-parser")


const userRoute = require("./routes/userRoute")
const notesRoute = require("./routes/notesRoute")


const app = express();
PORT = process.env.PORT || 8080;
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoute );
app.use('/api/notes',notesRoute);


app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT} `);
})