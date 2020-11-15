import {
  Resolvers,
  Checklist,
  QueryResolvers,
  MutationResolvers,
} from '../../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    checklist: (_, { id }, { dataSources }): Checklist =>
      dataSources.checklistsAPI.getChecklist(id),
    checklists: (_, __, { dataSources }): Checklist[] =>
      dataSources.checklistsAPI.getChecklists(),
  } as QueryResolvers,
  Mutation: {
    createChecklist: async (
      _,
      { input },
      { dataSources },
    ): Promise<Checklist> => dataSources.checklistsAPI.createChecklist(input),
    updateChecklist: async (
      _,
      { id, input },
      { dataSources },
    ): Promise<Checklist> =>
      dataSources.checklistsAPI.updateChecklist(id, input),
    deleteChecklist: async (_, { id }, { dataSources }): Promise<Checklist> =>
      dataSources.checklistsAPI.deleteChecklist(id),
  } as MutationResolvers,
};

export default resolvers;
