/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CreateRoomPostingInput = {
  address: Scalars['String']['input'];
  area: Scalars['Float']['input'];
  category: Scalars['String']['input'];
  createdAt: Scalars['DateTime']['input'];
  expired_at: Scalars['DateTime']['input'];
  images: Array<Scalars['String']['input']>;
  main_content: Scalars['String']['input'];
  package_type?: PackageType;
  price: Scalars['Float']['input'];
  stars: Scalars['Float']['input'];
  sub_category: Scalars['String']['input'];
  tenant_type: TentnantType;
  title: Scalars['String']['input'];
  updatedAt: Scalars['DateTime']['input'];
  videos?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateRoomPostingOutput = {
  __typename?: 'CreateRoomPostingOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateUserInput = {
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: RoleType;
  tel: Scalars['String']['input'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  tel: Scalars['String']['input'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  expiresIn?: Maybe<Scalars['Float']['output']>;
  ok: Scalars['Boolean']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createRoomPosting: CreateRoomPostingOutput;
  createUser: CreateUserOutput;
  login: LoginOutput;
  refreshToken: LoginOutput;
  resendOtp: SendOtpOutput;
  sendOtp: SendOtpOutput;
  updateRoomPosting: RoomPosting;
  verifyOtp: VerifyOtpOutput;
};


export type MutationCreateRoomPostingArgs = {
  createRoomPostingInput: CreateRoomPostingInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationUpdateRoomPostingArgs = {
  updateRoomPostingInput: UpdateRoomPostingInput;
};


export type MutationVerifyOtpArgs = {
  verifyOtpInput: VerifyOtpInput;
};

export enum PackageType {
  Basic = 'basic',
  Free = 'free',
  Vip = 'vip',
  Vip1 = 'vip1',
  Vip2 = 'vip2',
  Vip3 = 'vip3'
}

export type Query = {
  __typename?: 'Query';
  getAll: Array<RoomPosting>;
  me: User;
};

export enum RoleType {
  Broker = 'broker',
  Owner = 'owner',
  Searcher = 'searcher'
}

export type RoomPosting = {
  __typename?: 'RoomPosting';
  address: Scalars['String']['output'];
  area: Scalars['Float']['output'];
  category: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  expired_at: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  images: Array<Scalars['String']['output']>;
  main_content: Scalars['String']['output'];
  package_type: PackageType;
  price: Scalars['Float']['output'];
  stars: Scalars['Float']['output'];
  sub_category: Scalars['String']['output'];
  tenant_type: TentnantType;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  videos?: Maybe<Array<Scalars['String']['output']>>;
};

export type SendOtpOutput = {
  __typename?: 'SendOtpOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export enum TentnantType {
  All = 'all',
  Female = 'female',
  Male = 'male'
}

export type UpdateRoomPostingData = {
  address?: InputMaybe<Scalars['String']['input']>;
  area?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expired_at?: InputMaybe<Scalars['DateTime']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  main_content?: InputMaybe<Scalars['String']['input']>;
  package_type?: InputMaybe<PackageType>;
  price?: InputMaybe<Scalars['Float']['input']>;
  stars?: InputMaybe<Scalars['Float']['input']>;
  sub_category?: InputMaybe<Scalars['String']['input']>;
  tenant_type?: InputMaybe<TentnantType>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  videos?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateRoomPostingInput = {
  data: UpdateRoomPostingData;
  id: Scalars['Float']['input'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  facebook?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: RoleType;
  tel: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  verified: Scalars['Boolean']['output'];
  zalo?: Maybe<Scalars['Float']['output']>;
};

export type VerifyOtpInput = {
  otp: Scalars['String']['input'];
};

export type VerifyOtpOutput = {
  __typename?: 'VerifyOtpOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserOutput', ok: boolean, error?: string | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, accessToken?: string | null, refreshToken?: string | null, expiresIn?: number | null, error?: string | null, user?: { __typename?: 'User', id: number, tel: string, name: string, role: RoleType, verified: boolean } | null } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'LoginOutput', ok: boolean, accessToken?: string | null, refreshToken?: string | null, error?: string | null } };

export type VerifyOtpMutationVariables = Exact<{
  verifyOtpInput: VerifyOtpInput;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'VerifyOtpOutput', ok: boolean, error?: string | null } };

export type ResendOtpMutationVariables = Exact<{ [key: string]: never; }>;


export type ResendOtpMutation = { __typename?: 'Mutation', resendOtp: { __typename?: 'SendOtpOutput', ok: boolean, error?: string | null } };

export type SendOtpMutationVariables = Exact<{ [key: string]: never; }>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOtp: { __typename?: 'SendOtpOutput', ok: boolean, error?: string | null } };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tel"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verifyOtpInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"verifyOtpInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verifyOtpInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const ResendOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resendOtp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendOtp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<ResendOtpMutation, ResendOtpMutationVariables>;
export const SendOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendOtp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendOtp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<SendOtpMutation, SendOtpMutationVariables>;