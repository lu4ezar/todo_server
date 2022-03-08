import { DataSource } from 'apollo-datasource';
import { Collection } from 'mongoose';
import { ITodo } from '../../mongoose/interfaces/todo.interface';
import { IChecklistDocument } from '../../mongoose/interfaces/checklist.interface';
import Todo from '../../mongoose/models/todo.model';
import Checklist from '../../mongoose/models/checklist.model';
import {
  CreateTodoInput,
  UpdateTodoInput,
  Todo as TodoType,
} from '../../generated/graphql';

export default class TodosAPI extends DataSource {
  collection: Collection;

  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }
  // Queries
  // async getTodos(checklist: ITodo['checklist']): Promise<Array<ITodo>> {
  //   return await Todo.find({ checklist });
  // }

  // async getTodo(_id: TodoType['id']): Promise<ITodo> {
  //   return (await Todo.findOne({ _id })) as ITodo;
  // }

  // Mutations
  createTodo = async (input: CreateTodoInput): Promise<IChecklistDocument> => {
    const { checklist: id, ...todoInput } = input;
    const newTodo = new Todo(todoInput);
    const checklist = await Checklist.findOne({ _id: id });
    if (!checklist) {
      throw new Error('No checklist with provided id');
    }
    checklist.todos.splice(newTodo.order, 0, newTodo);
    const result = await checklist.save();
    return result;
  };

  updateTodo = async (input: UpdateTodoInput): Promise<IChecklistDocument> => {
    const { id, ...todoInput } = input;
    const checklist = await Checklist.findOne({ 'todos._id': id });
    if (!checklist) {
      throw new Error('No checklist with provided id');
    }
    const todo = checklist.todos.id(id);
    if (!todo) {
      throw new Error('No todo with provided id');
    }
    todo.set(todoInput);
    return checklist.save();
  };

  toggleTodo = async (id: TodoType['id']): Promise<IChecklistDocument> => {
    const checklist = await Checklist.findOne({ 'todos._id': id });
    if (!checklist) {
      throw new Error('No checklist with provided id');
    }
    const todo = checklist.todos.id(id);
    if (!todo) {
      throw new Error('No todo with provided id');
    }
    todo.set({ completed: !todo.completed });
    return checklist.save();
  };

  deleteTodo = async (id: ITodo['id']): Promise<IChecklistDocument | null> => {
    const checklist: IChecklistDocument | null = await Checklist.findOne({
      'todos._id': id,
    });
    if (!checklist) {
      throw new Error('No checklist with provided id');
    }
    const todo = checklist.todos.id(id);
    if (todo) {
      todo.set({ completed: !todo.completed });
      return checklist.save();
    }
    return checklist;
  };
}
