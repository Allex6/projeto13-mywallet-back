import express from 'express';
import cors from 'cors';
import authRoutes from './routers/authRoutes.js';
import transactionsRoutes from './routers/transactionsRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(transactionsRoutes);

app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));