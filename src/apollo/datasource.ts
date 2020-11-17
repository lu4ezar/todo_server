import { DataSource } from 'apollo-datasource';
import { Collection, MongooseUpdateQuery } from 'mongoose';
import { ITodo } from '../mongoose/todo.interface';
import { IChecklist } from '../mongoose/checklist.interface';
import Todo from '../mongoose/todo.model';
import Checklist from '../mongoose/checklist.model';
import {
  CreateTodoInput,
  CreateChecklistInput,
  Scalars,
} from '../generated/graphql';

export class TodosAPI extends DataSource {
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
  async createTodo(input: CreateTodoInput): Promise<ITodo> {
    const todo = new Todo({ ...input });
    const result = await todo.save();
    return result;
  }
  async updateTodo(
    _id: Scalars['ID'],
    input: MongooseUpdateQuery<
      Pick<
        ITodo,
        'id' | 'title' | 'description' | 'priority' | 'status' | 'created'
      >
    >
  ): Promise<ITodo> {
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

export class ChecklistsAPI extends DataSource {
  collection: Collection;
  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }

  // Queries
  async getChecklists(): Promise<Array<IChecklist>> {
    return Checklist.find();
  }

  async getChecklist(_id: Scalars['ID']): Promise<IChecklist> {
    return (await Checklist.findOne({ _id })) as IChecklist;
  }

  // Mutations
  async createChecklist(input: CreateChecklistInput): Promise<IChecklist> {
    const checklist = new Checklist({ ...input });
    const result = await checklist.save();
    return result;
  }
  async updateTodo(
    _id: Scalars['ID'],
    input: MongooseUpdateQuery<
      Pick<
        IChecklist,
        'id' | 'title' | 'description' | 'priority' | 'status' | 'created'
      >
    >
  ): Promise<IChecklist> {
    return (await Checklist.findOneAndUpdate({ _id }, input, {
      new: true,
    })) as IChecklist;
  }
  async deleteTodo(_id: Scalars['ID']): Promise<IChecklist> {
    const checklist = (await Checklist.findById({ _id })) as IChecklist;
    await Checklist.deleteOne({ _id });
    return checklist;
  }
}
