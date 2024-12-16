import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import clientRoutes from './routes/clientRoutes';
import './listeners/clientListeners'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Middleware');
    console.log('origin',req.headers.origin);
    console.log('referer',req.headers.referer);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(express.json());
app.use('/api/clients', clientRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize.sync({ force: false });
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
