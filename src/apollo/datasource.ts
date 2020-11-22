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
  async getTodos(checklist: ITodo['checklist']): Promise<Array<ITodo>> {
    if (checklist) {
      const parentChecklist = await Checklist.findOne({
        _id: checklist,
      });
      if (parentChecklist) return parentChecklist.todos;
    }
    return Todo.find();
  }

  async getTodo(_id: Scalars['ID']): Promise<ITodo> {
    return (await Todo.findOne({ _id })) as ITodo;
  }

  // Mutations
  async createTodo(input: CreateTodoInput): Promise<ITodo> {
    const todo = new Todo(input);
    const result = await todo.save();
    return result;
  }
  async updateTodo(
    input: MongooseUpdateQuery<
      Pick<
        ITodo,
        'title' | 'description' | 'priority' | 'completed' | 'expires'
      >
    >
  ): Promise<ITodo> {
    return (await Todo.findOneAndUpdate(input, {
      new: true,
    })) as ITodo;
  }
  async toggleTodo(_id: Scalars['ID']): Promise<ITodo> {
    const todo = (await Todo.findById(_id)) as ITodo;
    todo.completed = !todo.completed;
    const result = await todo.save();
    return result;
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
  async updateChecklist(
    input: MongooseUpdateQuery<
      Pick<
        IChecklist,
        'title' | 'description' | 'priority' | 'completed' | 'expires'
      >
    >
  ): Promise<IChecklist> {
    return (await Checklist.findOneAndUpdate({ _id: input._id }, input, {
      new: true,
    })) as IChecklist;
  }
  async deleteChecklist(_id: Scalars['ID']): Promise<IChecklist> {
    const checklist = (await Checklist.findById({ _id })) as IChecklist;
    await Checklist.deleteOne({ _id });
    return checklist;
  }
}
