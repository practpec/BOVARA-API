import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { syncRoutes } from './routes/sync.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB', err));

app.use('/api', syncRoutes);


app.get('/', (req, res) => {
  res.send('API de respaldo para sistema de ganado');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});