import { DataSource } from 'apollo-datasource';
import { Collection } from 'mongoose';
import { IChecklistDocument } from '../../mongoose/interfaces/checklist.interface';
import Checklist from '../../mongoose/models/checklist.model';
import {
  Checklist as ChecklistType,
  CreateChecklistInput,
  UpdateChecklistInput,
  User,
} from '../../generated/graphql';

export default class ChecklistsAPI extends DataSource {
  collection: Collection;
  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }

  // Queries
  async getChecklists(userId: User['id']): Promise<Array<IChecklistDocument>> {
    return await Checklist.find({ owner: userId });
  }

  async getChecklist(_id: ChecklistType['id']): Promise<IChecklistDocument> {
    return (await Checklist.findOne({ _id })) as IChecklistDocument;
  }
  // Mutations
  createChecklist(input: CreateChecklistInput): Promise<IChecklistDocument> {
    const checklist = new Checklist(input) as IChecklistDocument;
    return checklist.save();
  }
  async updateChecklist(
    input: UpdateChecklistInput
  ): Promise<IChecklistDocument> {
    return (await Checklist.findOneAndUpdate({ _id: input.id }, input, {
      new: true,
    })) as IChecklistDocument;
  }
  async deleteChecklist(_id: ChecklistType['id']): Promise<IChecklistDocument> {
    return (await Checklist.findOneAndDelete({
      _id,
    })) as IChecklistDocument;
  }
}
