import { DataSource } from 'apollo-datasource';
import { Collection } from 'mongoose';
import type { ITodo } from '../mongoose/todo.interface';
import Todo from '../mongoose/todo.model';
import { TodoInput, Scalars } from '../generated/graphql';

class TodosAPI extends DataSource {
  collection: Collection;
  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }
  // Queries
  async getTodos(): Promise<Array<ITodo>> {
    return Todo.find();
  }

  async getTodo(_id: Scalars['ID']): Promise<ITodo> {
    return (await Todo.findOne({ _id })) as ITodo;
  }
  // Mutations
  async createTodo(input: TodoInput): Promise<ITodo> {
    const todo = new Todo({ ...input });
    const result = await todo.save();
    return result;
  }
  async updateTodo(_id: Scalars['ID'], input: TodoInput): Promise<ITodo> {
    return (await Todo.findOneAndUpdate({ _id }, input, {
      new: true,
    })) as ITodo;
  }
  async deleteTodo(_id: Scalars['ID']): Promise<ITodo> {
    const todo = (await Todo.findById({ _id })) as ITodo;
    await Todo.deleteOne({ _id });
    return todo;
  }
}

export default TodosAPI;
