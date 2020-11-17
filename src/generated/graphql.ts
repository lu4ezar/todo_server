/* eslint-disable */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date/Time type */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  todo?: Maybe<Todo>;
  todos: Array<Todo>;
  checklist?: Maybe<Checklist>;
  checklists: Array<Checklist>;
};

export type QueryTodoArgs = {
  id: Scalars['ID'];
};

export type QueryChecklistArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  updateTodo: Todo;
  deleteTodo: Todo;
  reorderTodos: Todo;
  createChecklist: Checklist;
  updateChecklist: Checklist;
  deleteChecklist: Checklist;
  reorderChecklists: Checklist;
};

export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};

export type MutationUpdateTodoArgs = {
  id: Scalars['ID'];
  input: UpdateTodoInput;
};

export type MutationDeleteTodoArgs = {
  id: Scalars['ID'];
};

export type MutationReorderTodosArgs = {
  id: Scalars['ID'];
  order: Scalars['Int'];
};

export type MutationCreateChecklistArgs = {
  input: CreateChecklistInput;
};

export type MutationUpdateChecklistArgs = {
  id: Scalars['ID'];
  input: UpdateChecklistInput;
};

export type MutationDeleteChecklistArgs = {
  id: Scalars['ID'];
};

export type MutationReorderChecklistsArgs = {
  id: Scalars['ID'];
  order: Scalars['Int'];
};

export enum Priority {
  Low = 'LOW',
  Normal = 'NORMAL',
  High = 'HIGH',
}

export enum Status {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Expired = 'EXPIRED',
}

/** Todo type */
export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  order: Scalars['Int'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  priority: Priority;
  status: Status;
  created: Scalars['DateTime'];
  checklist: Scalars['ID'];
};

export type CreateTodoInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  priority?: Maybe<Priority>;
  status?: Maybe<Status>;
};

export type UpdateTodoInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  priority?: Maybe<Priority>;
  status?: Maybe<Status>;
};

/** Checklist Type */
export type Checklist = {
  __typename?: 'Checklist';
  id: Scalars['ID'];
  order: Scalars['Int'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  priority: Priority;
  status: Status;
  created: Scalars['DateTime'];
  todos: Array<Todo>;
};

export type CreateChecklistInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  priority?: Maybe<Priority>;
  status?: Maybe<Status>;
};

export type UpdateChecklistInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  priority?: Maybe<Priority>;
  status?: Maybe<Status>;
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Priority: Priority;
  Status: Status;
  Todo: ResolverTypeWrapper<Todo>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreateTodoInput: CreateTodoInput;
  UpdateTodoInput: UpdateTodoInput;
  Checklist: ResolverTypeWrapper<Checklist>;
  CreateChecklistInput: CreateChecklistInput;
  UpdateChecklistInput: UpdateChecklistInput;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  DateTime: Scalars['DateTime'];
  Query: {};
  ID: Scalars['ID'];
  Mutation: {};
  Int: Scalars['Int'];
  Todo: Todo;
  String: Scalars['String'];
  CreateTodoInput: CreateTodoInput;
  UpdateTodoInput: UpdateTodoInput;
  Checklist: Checklist;
  CreateChecklistInput: CreateChecklistInput;
  UpdateChecklistInput: UpdateChecklistInput;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: Scalars['Boolean'];
}>;

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = UnionDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AbstractEntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = { overrideType?: Maybe<Scalars['String']> };

export type ColumnDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = ColumnDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {};

export type IdDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = IdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = { overrideType?: Maybe<Scalars['String']> };

export type LinkDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = LinkDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {};

export type EmbeddedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EmbeddedDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = { path: Scalars['String'] };

export type MapDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = MapDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  todo?: Resolver<
    Maybe<ResolversTypes['Todo']>,
    ParentType,
    ContextType,
    RequireFields<QueryTodoArgs, 'id'>
  >;
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>;
  checklist?: Resolver<
    Maybe<ResolversTypes['Checklist']>,
    ParentType,
    ContextType,
    RequireFields<QueryChecklistArgs, 'id'>
  >;
  checklists?: Resolver<
    Array<ResolversTypes['Checklist']>,
    ParentType,
    ContextType
  >;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = ResolversObject<{
  createTodo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTodoArgs, 'input'>
  >;
  updateTodo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTodoArgs, 'id' | 'input'>
  >;
  deleteTodo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTodoArgs, 'id'>
  >;
  reorderTodos?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationReorderTodosArgs, 'id' | 'order'>
  >;
  createChecklist?: Resolver<
    ResolversTypes['Checklist'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateChecklistArgs, 'input'>
  >;
  updateChecklist?: Resolver<
    ResolversTypes['Checklist'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateChecklistArgs, 'id' | 'input'>
  >;
  deleteChecklist?: Resolver<
    ResolversTypes['Checklist'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteChecklistArgs, 'id'>
  >;
  reorderChecklists?: Resolver<
    ResolversTypes['Checklist'],
    ParentType,
    ContextType,
    RequireFields<MutationReorderChecklistsArgs, 'id' | 'order'>
  >;
}>;

export type TodoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  priority?: Resolver<ResolversTypes['Priority'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  checklist?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ChecklistResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Checklist'] = ResolversParentTypes['Checklist']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  priority?: Resolver<ResolversTypes['Priority'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  Checklist?: ChecklistResolvers<ContextType>;
}>;

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
}>;

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>;
import { ObjectID } from 'mongodb';
