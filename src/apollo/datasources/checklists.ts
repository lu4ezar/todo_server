import { DataSource } from 'apollo-datasource';
import { Collection, MongooseUpdateQuery } from 'mongoose';
import {
  IChecklistDocument,
  IChecklistRefDocument,
} from '../../mongoose/checklist.interface';
import Checklist from '../../mongoose/checklist.model';
import { CreateChecklistInput, Scalars } from '../../generated/graphql';

export default class ChecklistsAPI extends DataSource {
  collection: Collection;
  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }

  // Queries
  async getChecklists(): Promise<Array<IChecklistDocument>> {
    return await Checklist.find().populate('todos').exec();
  }

  async getChecklist(_id: Scalars['ID']): Promise<IChecklistRefDocument> {
    return (await Checklist.findOne({ _id })) as IChecklistRefDocument;
  }
  // Mutations
  createChecklist(input: CreateChecklistInput): Promise<IChecklistRefDocument> {
    const checklist = new Checklist(input) as IChecklistRefDocument;
    return checklist.save();
  }
  async updateChecklist(
    input: MongooseUpdateQuery<
      Pick<
        IChecklistRefDocument,
        | '_id'
        | 'todos'
        | 'order'
        | 'title'
        | 'description'
        | 'priority'
        | 'completed'
        | 'created'
        | 'expires'
      >
    >
  ): Promise<IChecklistRefDocument> {
    return (await Checklist.findOneAndUpdate({ _id: input.id }, input, {
      new: true,
    })) as IChecklistRefDocument;
  }
  async deleteChecklist(_id: Scalars['ID']): Promise<IChecklistRefDocument> {
    return (await Checklist.findOneAndDelete({
      _id,
    })) as IChecklistRefDocument;
  }
}
