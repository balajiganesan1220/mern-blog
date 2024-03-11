import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
dotenv.config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => { console.log('MongoDb is connected') })
  .catch((err) => { console.error('MongoDb connection error:', err) });

const app = express();

app.listen(3000, () => { console.log('server is running on port 3000') });


app.use('/api/user', userRoutes);