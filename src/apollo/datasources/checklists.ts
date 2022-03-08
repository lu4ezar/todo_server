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
  getChecklists = async (
    userId: User['id']
  ): Promise<Array<IChecklistDocument>> => Checklist.find({ owner: userId });

  getChecklist = async (
    _id: ChecklistType['id']
  ): Promise<IChecklistDocument> =>
    (await Checklist.findOne({ _id })) as IChecklistDocument;

  // Mutations
  createChecklist = async (
    input: CreateChecklistInput
  ): Promise<IChecklistDocument> => {
    const checklist = new Checklist(input) as IChecklistDocument;
    return checklist.save();
  };

  updateChecklist = async (
    input: UpdateChecklistInput
  ): Promise<IChecklistDocument> =>
    (await Checklist.findOneAndUpdate({ _id: input.id }, input, {
      new: true,
    })) as IChecklistDocument;

  deleteChecklist = async (
    _id: ChecklistType['id']
  ): Promise<IChecklistDocument> =>
    (await Checklist.findOneAndDelete({
      _id,
    })) as IChecklistDocument;
}
