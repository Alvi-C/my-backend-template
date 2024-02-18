import express from 'express';
import testRoute from '../controllers/testController.js';

const router = express.Router();

// route test using GET method
router.route('/').get(testRoute);

export default router;
