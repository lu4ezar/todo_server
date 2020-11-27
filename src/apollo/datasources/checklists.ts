import { DataSource } from 'apollo-datasource';
import { Collection, MongooseUpdateQuery } from 'mongoose';
import { IChecklist } from '../../mongoose/checklist.interface';
import Checklist from '../../mongoose/checklist.model';
import { CreateChecklistInput, Scalars } from '../../generated/graphql';

export default class ChecklistsAPI extends DataSource {
  collection: Collection;
  constructor(collection: Collection) {
    super();
    this.collection = collection;
  }

  // Queries
  async getChecklists(): Promise<Array<IChecklist>> {
    return await Checklist.find();
  }

  async getChecklist(_id: Scalars['ID']): Promise<IChecklist> {
    return (await Checklist.findOne({ _id })) as IChecklist;
  }
  // Mutations
  createChecklist(input: CreateChecklistInput): Promise<IChecklist> {
    const checklist = new Checklist(input);
    return checklist.save();
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
