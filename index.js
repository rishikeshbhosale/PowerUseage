import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import session from "express-session";
// import cookieParser from "cookie-parser";

import usePath from "./routes/user.js"

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port ${process.env.PORT}`);
})

// app.use(session({  
//     name: `Sessions`,
//     secret: process.env.SESSION_SECRET,  
//     resave: false,
//     saveUninitialized: false,
//     cookie: { 
//       secure: false, 
//       maxAge: 300000 // 5 min
//     } 
//   }));
//   app.use(cookieParser());

app.get('/', (req, res) => res.send('WELCOME'));

app.use("/users", usePath);



// app.get("/",(req,res) => {
//     connection.query('SELECT * from smitch_power.users', (err, rows) => {
//         if(err) throw err;
//         console.log('The data from users table are: \n', rows);
//     });
// });