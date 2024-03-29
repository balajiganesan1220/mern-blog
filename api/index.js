import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'


dotenv.config();

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => { console.log('MongoDb is connected') })
  .catch((err) => { console.error('MongoDb connection error:', err) });

const app = express();

app.use(express.json());

app.listen(3000, () => { console.log('server is running on port 3000') });


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Inrernal Server Error';
  res.status(statusCode).json({
    success: false,
      statusCode,
      message
  }
  )
})

