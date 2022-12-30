import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../dbConfig/db.js"

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
                    res.status(300).json({
                        status: "error",
                        message: err.sqlMessage,
                    });

                } else {
                    console.log(result[0] + " ++++++++++++++++++++++++++++++++++++++++++++++");
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



export const login = async (req, res) => {
    try {
        const { u_name, u_email, u_mobile, password } = req.body;

        if (u_name != undefined || u_email != undefined || u_mobile != undefined && password) {
            console.log(u_name + " name " + u_email + " emial " + u_mobile + " mobile " + password + " password");

            connection.query(
                `select * from users where u_name='${u_name}' or u_email='${u_email}' or u_mobile='${u_mobile}'`,
                function (err, result) {
                    if (err) {
                        res.status(300).json({
                            status: "error",
                            message: err.sqlMessage,
                        });
                    } else {
                        // console.log(result);
                        if (Object.keys(result).length > 0) {

                            const checkPass = bcrypt.compareSync(password, result[0].u_password);

                            console.log(checkPass);

                            if (!checkPass) {
                                res.status(201).json({
                                    status: "error",
                                    message: "Incorrect Password !!! Please try again.",
                                });
                            } else {
                                const uid = result[0].user_id
                                const token = jwt.sign({ id: uid }, process.env.JWT_SECRET, {
                                    expiresIn: '5m'
                                });

                                let now = new Date();
                                now.setMinutes(now.getMinutes() + 5);
                                now = new Date(now);
                                res.status(200).json({ token, uid, expiresIn: now });

                            }
                        } else {
                            res.status(300).json({
                                status: "error",
                                message: "Please check Username & try again",
                            });
                        }
                    }
                }
            );

        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const logout = async (req, res, next) => {
   
    const token = "";
    const uid = -1

    res.status(200).json({ token, uid });
    next();
}

export default register;