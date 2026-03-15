import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { users } from '../constants.db.js';

dotenv.config();

const router = express.Router();
const SECRET = process.env.SECRET;

router.post('/', (req,res) => {
    const { email, password } = req.body;
    const user = users.find(
        u=> u.useremail === email && u.password === password
    );

    if(!user){
        return res.status(401).json({
            message : "Invalid Credentials"
        });
    }

    const token = jwt.sign(
        {id: user.id, useremail: user.useremail},
        SECRET,
        {expiresIn: "1h"}
    );

    res.status(200).json({token});

});

export default router;