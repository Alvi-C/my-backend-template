import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Ensures that queries adhere to the schema
mongoose.set('strictQuery', true);

dotenv.config();

export const mongoDB = process.env.MONGO_URI;
export const connectDataBase = async () => {
    try {
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB is connected'.cyan.underline.bold);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
