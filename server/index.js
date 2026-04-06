const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');

// Connect to Database (will attempt local mongo default)
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://finance-dashboard-client-2dy0.onrender.com'
  ],
  credentials: true
}));
app.use(express.json());

// Mock Data (In-memory for demonstration if Mongo isn't connected)
let transactions = [
  { id: '1', date: '2024-03-01', description: 'Monthly Salary', amount: 5000, category: 'Salary', type: 'income' },
  { id: '2', date: '2024-03-02', description: 'Grocery Store', amount: 150, category: 'Food', type: 'expense' },
];

app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.post('/api/transactions', (req, res) => {
  const newTx = { id: Date.now().toString(), ...req.body };
  transactions.push(newTx);
  res.status(201).json(newTx);
});

app.delete('/api/transactions/:id', (req, res) => {
  transactions = transactions.filter(t => t.id !== req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
