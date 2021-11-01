/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

const dbPath =
  process.env.NODE_ENV === 'production'
    ? (process.env.PROD_MONGODB as string)
    : (process.env.DEV_MONGODB as string);
console.log(`dbPath: ${dbPath}`);
console.log(`user: ${process.env.MONGO_INITDB_ROOT_USERNAME}`);
console.log(`pass: ${process.env.MONGO_INITDB_ROOT_PASSWORD}`);

mongoose.connect(dbPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
  auth: {
    username: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
  },
} as ConnectOptions);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('DB connected');
});

export default db;
