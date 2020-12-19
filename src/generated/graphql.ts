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

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  todo?: Maybe<Todo>;
  todos: Array<Todo>;
  checklist?: Maybe<Checklist>;
  checklists: Array<Checklist>;
  me: User;
};

export type QueryTodoArgs = {
  id: Scalars['ID'];
};

export type QueryTodosArgs = {
  checklist?: Maybe<Scalars['ID']>;
};

export type QueryChecklistArgs = {
  id: Scalars['ID'];
};

export type QueryMeArgs = {
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  updateTodo: Todo;
  toggleTodo: Todo;
  deleteTodo: Todo;
  reorderTodos: Todo;
  createChecklist: Checklist;
  updateChecklist: Checklist;
  deleteChecklist: Checklist;
  reorderChecklists: Checklist;
  createUser: AuthPayload;
  loginUser: AuthPayload;
  updateUser: User;
  deleteUser: User;
};

export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};

export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};

export type MutationToggleTodoArgs = {
  id: Scalars['ID'];
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
  input: UpdateChecklistInput;
};

export type MutationDeleteChecklistArgs = {
  id: Scalars['ID'];
};

export type MutationReorderChecklistsArgs = {
  id: Scalars['ID'];
  order: Scalars['Int'];
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationLoginUserArgs = {
  input: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationDeleteUserArgs = {
  email: Scalars['String'];
};

export enum Priority {
  Low = 'LOW',
  Normal = 'NORMAL',
  High = 'HIGH',
}

/** Todo type */
export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  order: Scalars['Int'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  priority: Priority;
  completed: Scalars['Boolean'];
  created: Scalars['DateTime'];
  expires?: Maybe<Scalars['DateTime']>;
  checklist?: Maybe<Scalars['ID']>;
};

export type CreateTodoInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  priority?: Maybe<Priority>;
  completed?: Maybe<Scalars['Boolean']>;
  checklist?: Maybe<Scalars['ID']>;
};

export type UpdateTodoInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  priority: Priority;
  completed: Scalars['Boolean'];
  expires?: Maybe<Scalars['DateTime']>;
  checklist?: Maybe<Scalars['ID']>;
};

export type ReorderTodoInput = {
  id: Scalars['ID'];
  order: Scalars['Int'];
};

/** Checklist Type */
export type Checklist = {
  __typename?: 'Checklist';
  id: Scalars['ID'];
  order: Scalars['Int'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  priority: Priority;
  completed: Scalars['Boolean'];
  created: Scalars['DateTime'];
  expires: Scalars['DateTime'];
  todos: Array<Todo>;
};

export type CreateChecklistInput = {
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  priority?: Maybe<Priority>;
  completed?: Maybe<Scalars['Boolean']>;
};

export type UpdateChecklistInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  priority: Priority;
  completed: Scalars['Boolean'];
  expires?: Maybe<Scalars['DateTime']>;
};

/** User Type */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  created: Scalars['DateTime'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
};

export type CreateUserInput = {
  name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateUserInput = {
  name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
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
  AdditionalEntityFields: AdditionalEntityFields;
  String: ResolverTypeWrapper<Scalars['String']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Priority: Priority;
  Todo: ResolverTypeWrapper<Todo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateTodoInput: CreateTodoInput;
  UpdateTodoInput: UpdateTodoInput;
  ReorderTodoInput: ReorderTodoInput;
  Checklist: ResolverTypeWrapper<Checklist>;
  CreateChecklistInput: CreateChecklistInput;
  UpdateChecklistInput: UpdateChecklistInput;
  User: ResolverTypeWrapper<User>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  CreateUserInput: CreateUserInput;
  UpdateUserInput: UpdateUserInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AdditionalEntityFields: AdditionalEntityFields;
  String: Scalars['String'];
  DateTime: Scalars['DateTime'];
  Query: {};
  ID: Scalars['ID'];
  Mutation: {};
  Int: Scalars['Int'];
  Todo: Todo;
  Boolean: Scalars['Boolean'];
  CreateTodoInput: CreateTodoInput;
  UpdateTodoInput: UpdateTodoInput;
  ReorderTodoInput: ReorderTodoInput;
  Checklist: Checklist;
  CreateChecklistInput: CreateChecklistInput;
  UpdateChecklistInput: UpdateChecklistInput;
  User: User;
  AuthPayload: AuthPayload;
  CreateUserInput: CreateUserInput;
  UpdateUserInput: UpdateUserInput;
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
  todos?: Resolver<
    Array<ResolversTypes['Todo']>,
    ParentType,
    ContextType,
    RequireFields<QueryTodosArgs, never>
  >;
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
    RequireFields<MutationUpdateTodoArgs, 'input'>
  >;
  toggleTodo?: Resolver<
    ResolversTypes['Todo'],
    ParentType,
    ContextType,
    RequireFields<MutationToggleTodoArgs, 'id'>
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
    RequireFields<MutationUpdateChecklistArgs, 'input'>
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
  createUser?: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'input'>
  >;
  loginUser?: Resolver<
    ResolversTypes['AuthPayload'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginUserArgs, 'input'>
  >;
  updateUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, 'input'>
  >;
  deleteUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'email'>
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
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expires?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  checklist?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
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
  completed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expires?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  todos?: Resolver<Array<ResolversTypes['Todo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']
> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  Checklist?: ChecklistResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
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
export type TodoDbObject = {
  title: string;
  description?: Maybe<string>;
};

export type ChecklistDbObject = {
  title: string;
  todos: Array<TodoDbObject>;
};
