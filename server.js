const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API chal raha hai!' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/affiliate')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} port pe chal raha hai`);
});