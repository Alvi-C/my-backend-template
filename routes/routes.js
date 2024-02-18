import express from 'express';
import testRoute from './testRoute.js';
// import path from 'path';

const router = express.Router();

// business router goes here
router.use('/', testRoute);

/* 
// Express Route for Serving Index HTML Page for testing
const __dirname = path.dirname(new URL(import.meta.url).pathname);
router.get('^/$|/index(.html)?', (_req, res) => {
    // res.send('test server is running');
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
}); 
*/

export default router;
