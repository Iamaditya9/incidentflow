const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const incidentRoutes = require('./routes/incidentRoutes');
const systemRoutes = require('./routes/systemRoutes');
const activityRoutes = require('./routes/activityRoutes');
const setupSockets = require('./sockets/socketHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST', 'PATCH', 'DELETE'] }
});

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI || 'mongodb://localhost:27017/incidentflow';
    await mongoose.connect(connUri);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
};
connectDB();

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/incidents', incidentRoutes);
app.use('/api/systems', systemRoutes);
app.use('/api/activity', activityRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

setupSockets(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`IncidentFlow server running on port ${PORT}`);
});