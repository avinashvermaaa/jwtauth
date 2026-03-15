import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/login.routes.js';
import homeRoutes from './routes/home.routes.js';
import profileRoutes from './routes/profile.routes.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/home', homeRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "api home"
    })
});

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});