import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

app.get('/', (req, res) => {
  res.json({ message: 'API chal raha hai!' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});

app.use('/api/auth', authRouter(supabase));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} port pe chal raha hai`);
});
