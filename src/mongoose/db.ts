import dotenv from 'dotenv';

dotenv.config();

const dbPath =
  process.env.NODE_ENV === 'production'
    ? (process.env.PROD_MONGODB as string)
    : (process.env.DEV_MONGODB as string);

import mongoose from 'mongoose';

mongoose.connect(dbPath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('DB connected');
});

export default db;
