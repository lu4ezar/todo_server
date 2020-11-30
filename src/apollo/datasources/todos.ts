import { DataSource } from 'apollo-datasource';
import { Collection } from 'mongoose';
import { ITodo } from '../../mongoose/todo.interface';
import { IChecklistRefDocument } from '../../mongoose/checklist.interface';
import Todo from '../../mongoose/todo.model';
import Checklist from '../../mongoose/checklist.model';
import {
  CreateTodoInput,
  UpdateTodoInput,
  Scalars,
} from '../../generated/graphql';

export default class TodosAPI extends DataSource {
  collection: Collection;
  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }
  // Queries
  async getTodos(checklist: ITodo['checklist']): Promise<Array<ITodo>> {
    return await Todo.find({ checklist });
  }

  async getTodo(_id: Scalars['ID']): Promise<ITodo> {
    return (await Todo.findOne({ _id })) as ITodo;
  }

  // Mutations
  async createTodo(input: CreateTodoInput): Promise<ITodo> {
    const todo = new Todo(input);
    const result = await todo.save();
    if (input.checklist) {
      const checklist = (await Checklist.findOne({
        _id: input.checklist,
      })) as IChecklistRefDocument;
      checklist.todos = [...checklist.todos, result._id];
      await checklist.save();
    }
    return result;
  }

  async updateTodo(input: UpdateTodoInput): Promise<ITodo> {
    return (await Todo.findOneAndUpdate({ _id: input._id }, input, {
      new: true,
    })) as ITodo;
  }

  async toggleTodo(_id: Scalars['ID']): Promise<ITodo> {
    const todo = (await Todo.findById(_id)) as ITodo;
    todo.completed = !todo.completed;
    return todo.save();
  }
  async deleteTodo(_id: Scalars['ID']): Promise<ITodo> {
    const todo = (await Todo.findById({ _id })) as ITodo;
    await Todo.deleteOne({ _id });
    return todo;
  }
}
