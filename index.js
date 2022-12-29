import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import mysql from "mysql";
import usePath from "./routes/user.js"



const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(process.env.PORT,()=>{
    console.log(`Server Started on port ${process.env.PORT}`);
})

app.get('/', (req, res) => res.send('WELCOME'));

app.use("/users", usePath);



// app.get("/",(req,res) => {
//     connection.query('SELECT * from smitch_power.users', (err, rows) => {
//         if(err) throw err;
//         console.log('The data from users table are: \n', rows);
//     });
// });