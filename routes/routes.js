import express from 'express';
import testRoute from './testRoute.js';

const router = express.Router();

// business router goes here
router.use('/', testRoute);

export default router;
