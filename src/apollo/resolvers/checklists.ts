import {
  Resolvers,
  Checklist,
  QueryResolvers,
  MutationResolvers,
} from '../../generated/graphql';
import { IChecklistDocument } from '../../mongoose/interfaces/checklist.interface';

const resolvers: Resolvers = {
  Query: {
    checklist: (_, { id }, { dataSources }): Checklist =>
      dataSources.checklistsAPI.getChecklist(id),
    checklists: (_, __, { dataSources, user }): IChecklistDocument[] =>
      dataSources.checklistsAPI.getChecklists(user._id),
  } as QueryResolvers,
  Mutation: {
    createChecklist: async (
      _,
      { input },
      { dataSources, user }
    ): Promise<Checklist> =>
      dataSources.checklistsAPI.createChecklist({
        ...input,
        owner: user._id,
      }),
    updateChecklist: async (
      _,
      { input },
      { dataSources }
    ): Promise<Checklist> => dataSources.checklistsAPI.updateChecklist(input),
    deleteChecklist: async (_, { id }, { dataSources }): Promise<Checklist> =>
      dataSources.checklistsAPI.deleteChecklist(id),
  } as MutationResolvers,
};

export default resolvers;
