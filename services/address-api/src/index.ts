import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import addressRoutes from './routes/addressRoutes';
import './listeners/addressListeners'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002;

// Connect to MongoDB
connectDB();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// Middleware
app.use(express.json());

// Routes
app.use('/api/addresses', addressRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
