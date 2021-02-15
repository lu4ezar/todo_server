import { MongoClient } from 'mongodb';

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const todos = db.collection('todos');

    const mockTodo = { _id: 'some-todo-id', title: 'Todo 1' };
    await todos.insertOne(mockTodo);

    const insertedTodo = await todos.findOne({ _id: 'some-user-id' });
    expect(insertedTodo).toEqual(mockTodo);
  });
});
