/* eslint-disable no-undef */
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

//middlewares
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client origin
    methods: ['GET', 'POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  };
  
  // Handle preflight requests
  app.options('*', cors(corsOptions)); // Allow preflight requests from any origin

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E Version Developed By Madhawa',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8081, () => console.log('Server has started on port 8081'));
  } catch (error) {
    console.log(error);
  }
};

startServer();