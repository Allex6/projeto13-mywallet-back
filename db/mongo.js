import dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'my_wallet';

console.log('MONGO URI ', MONGO_URI, DB_NAME);

const mongoClient = new MongoClient(MONGO_URI);
let db;

mongoClient.connect(() => db = mongoClient.db(DB_NAME));

export { db, ObjectId };