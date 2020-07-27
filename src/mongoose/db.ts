const dbPath = process.env.PROD_MONGODB || 'mongodb://localhost:27017/todolist';

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
