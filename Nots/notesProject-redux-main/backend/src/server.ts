import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());

// Routes
const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});