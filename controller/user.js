import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../dbConfig/db.js"

/*reg user */

export const register = async (req, res, next) => {

    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "User Info can not be empty!"
        });
    }

    try {
        const {
            user_disp_name,
            u_name,
            u_email,
            u_mobile,
            password
        } = req.body;

        const saltRounds = 10;

        const passwordHash = bcrypt.hashSync(password, saltRounds);

        connection.query(
            `INSERT INTO smitch_power.users(user_disp_name,u_name,u_email,u_mobile,u_password) VALUES('${user_disp_name}','${u_name}','${u_email}','${u_mobile}','${passwordHash}')`,
            function (err, result) {
                if (err) {
                    console.log(err.sqlMessage + " -------------------------------------------------------------------------");
                    res.status(201).json({
                        status: "error",
                        message: err.sqlMessage,
                    });
                   
                } else {
                    console.log(result[0] +" ++++++++++++++++++++++++++++++++++++++++++++++");
                    res.status(201).json({
                        status: "success",
                        message: "User created!",
                    });
                }
            }
        );

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
};

export default register;