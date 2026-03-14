import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const SECRET = "my_SecretKey_Is_40LPA_Package"
const PORT = process.env.PORT;
// Users DB
const users = [
    {id : 1, useremail: "avinash@gmail.com", password: "123456789"},
    {id : 2, useremail: "user1@gmail.com", password: "user1pass"},
    {id : 3, useremail: "admin@gmail.com", password: "admin1234"},
];

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Login
app.post('/login', (req,res) => {
    const { email, password } = req.body;
    const user = users.find(
        u => u.useremail === email && u.password === password
    );

    if(!user){
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    const token = jwt.sign(
        {id: user.id, useremail: user.useremail},
        SECRET,
        {expiresIn: "1h"}
    );

    res.status(200).json({ token });
});

// middleware to verify token
function authenticateToken(req, res, next) {

  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({
    message: "no token provided"
  });

  jwt.verify(token, SECRET, (err, user) => {

    if (err) return res.status(403);

    req.user = user;

    next();
  });
}

// Protected Homepage
app.get('/home', authenticateToken,(req,res) => {
    res.json({
        message : 'this is home page',
        user: req.user
    });
});

// Protected Profile
app.get('/profile', authenticateToken,(req,res) => {
    res.json({
        message : 'some protected users file, which users can only access',
        user: req.user
    });
});

app.get('/', (req, res) => {
    res.json({
        message: "api home"
    })
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});