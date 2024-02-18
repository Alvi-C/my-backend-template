import colors from 'colors';
import dotenv from 'dotenv';
import app from './app.js';
import { connectDataBase } from './configs/dbConnection.js';

dotenv.config();

colors.setTheme({
    info: 'green',
    help: 'cyan',
    warn: 'yellow',
    error: 'red',
});

const PORT = process.env.PORT || 8000;

async function startServer() {
    try {
        await connectDataBase();

        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}`.yellow.bold);
        });
    } catch (err) {
        console.log(err);
        process.exit(1); // Terminate the process if an error occurs
    }
}

startServer();
