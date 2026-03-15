import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {

  res.json({
    user: req.user
  });

});


export default router;