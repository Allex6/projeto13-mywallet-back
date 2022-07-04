import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import authRoutes from './routers/authRoutes.js';
import transactionsRoutes from './routers/transactionsRoutes.js';

const PORT = process.env.PORT || 5000;
const app = express();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'my_wallet';

const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let db;

client.connect(err => {
    console.log('err ---------------------------', err);
  db = client.db(DB_NAME);
});

app.use(cors());
app.use(express.json());

app.use((req, res, next)=>{
    req.db = db;
    next();
});

app.use(authRoutes);
app.use(transactionsRoutes);

app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}`));