const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const userRoutes = require("./routes/userRoute");
const errorHandler = require('./middleware/errorMiddleware')
// app.use('/',(req, res) => {
//     console.log("Oh ho connect successfully!");
//     res.send("Oh ho connect successfully!");
// })
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Routes
app.use('/api/users',userRoutes)

// Error Middleware
app.use(errorHandler)





module.exports = app;