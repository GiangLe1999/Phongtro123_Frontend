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

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  postings: Array<Posting>;
  slug: Scalars['String']['output'];
};

export type CoreOutput = {
  __typename?: 'CoreOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateNewPasswordInput = {
  password?: InputMaybe<Scalars['String']['input']>;
  tel: Scalars['String']['input'];
};

export type CreateNewPasswordOutput = {
  __typename?: 'CreateNewPasswordOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type CreateUserInput = {
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  role: RoleType;
  tel: Scalars['String']['input'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type District = {
  __typename?: 'District';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  postings: Array<Posting>;
  province?: Maybe<Province>;
  slug: Scalars['String']['output'];
};

export type LoginInput = {
  password?: InputMaybe<Scalars['String']['input']>;
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
  createCategories: CoreOutput;
  createNewPassword: CreateNewPasswordOutput;
  createUser: CreateUserOutput;
  login: LoginOutput;
  refreshToken: LoginOutput;
  sendForgotPasswordOtp: SendOtpOutput;
  sendOtp: SendOtpOutput;
  verifyForgotPasswordOtp: VerifyForgotPasswordOutput;
  verifyOtp: VerifyOtpOutput;
};


export type MutationCreateNewPasswordArgs = {
  createNewPasswordInput: CreateNewPasswordInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationSendForgotPasswordOtpArgs = {
  sendForgotPasswordOtpInput: SendOtpInput;
};


export type MutationVerifyForgotPasswordOtpArgs = {
  verifyForgotPasswordOtpInput: VerifyForgotPasswordOtpInput;
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

export type Posting = {
  __typename?: 'Posting';
  address: Scalars['String']['output'];
  area: Scalars['Float']['output'];
  category: Category;
  createdAt: Scalars['DateTime']['output'];
  district: District;
  expired_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Float']['output'];
  images: Array<Scalars['String']['output']>;
  is_crawled: Scalars['Boolean']['output'];
  main_content: Scalars['String']['output'];
  maps_embed_link: Scalars['String']['output'];
  package_type: PackageType;
  price: Scalars['Float']['output'];
  province: Province;
  stars: Scalars['Float']['output'];
  tenant_type: TentnantType;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  videos?: Maybe<Array<Scalars['String']['output']>>;
};

export type Province = {
  __typename?: 'Province';
  districts: Array<District>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  postings: Array<Posting>;
  slug: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
};

export enum RoleType {
  Broker = 'broker',
  Owner = 'owner',
  Searcher = 'searcher'
}

export type SendOtpInput = {
  tel: Scalars['String']['input'];
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

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  facebook?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  is_crawled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  postings: Array<Posting>;
  role: RoleType;
  tel: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  verified: Scalars['Boolean']['output'];
  zalo?: Maybe<Scalars['String']['output']>;
};

export type VerifyForgotPasswordOtpInput = {
  otp: Scalars['String']['input'];
  tel: Scalars['String']['input'];
};

export type VerifyForgotPasswordOutput = {
  __typename?: 'VerifyForgotPasswordOutput';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
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

export type CreateNewPasswordMutationVariables = Exact<{
  createNewPasswordInput: CreateNewPasswordInput;
}>;


export type CreateNewPasswordMutation = { __typename?: 'Mutation', createNewPassword: { __typename?: 'CreateNewPasswordOutput', ok: boolean, error?: string | null } };

export type VerifyForgotPasswordOtpMutationVariables = Exact<{
  verifyForgotPasswordOtpInput: VerifyForgotPasswordOtpInput;
}>;


export type VerifyForgotPasswordOtpMutation = { __typename?: 'Mutation', verifyForgotPasswordOtp: { __typename?: 'VerifyForgotPasswordOutput', ok: boolean, error?: string | null } };

export type SendForgotPasswordOtpMutationVariables = Exact<{
  sendForgotPasswordOtpInput: SendOtpInput;
}>;


export type SendForgotPasswordOtpMutation = { __typename?: 'Mutation', sendForgotPasswordOtp: { __typename?: 'SendOtpOutput', ok: boolean, error?: string | null } };

export type VerifyOtpMutationVariables = Exact<{
  verifyOtpInput: VerifyOtpInput;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOtp: { __typename?: 'VerifyOtpOutput', ok: boolean, error?: string | null } };

export type SendOtpMutationVariables = Exact<{ [key: string]: never; }>;


export type SendOtpMutation = { __typename?: 'Mutation', sendOtp: { __typename?: 'SendOtpOutput', ok: boolean, error?: string | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, accessToken?: string | null, refreshToken?: string | null, expiresIn?: number | null, error?: string | null, user?: { __typename?: 'User', id: number, tel: string, name: string, role: RoleType, verified: boolean } | null } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'LoginOutput', ok: boolean, accessToken?: string | null, refreshToken?: string | null, error?: string | null } };


export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const CreateNewPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createNewPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createNewPasswordInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateNewPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNewPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createNewPasswordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createNewPasswordInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateNewPasswordMutation, CreateNewPasswordMutationVariables>;
export const VerifyForgotPasswordOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyForgotPasswordOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verifyForgotPasswordOtpInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyForgotPasswordOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyForgotPasswordOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"verifyForgotPasswordOtpInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verifyForgotPasswordOtpInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<VerifyForgotPasswordOtpMutation, VerifyForgotPasswordOtpMutationVariables>;
export const SendForgotPasswordOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendForgotPasswordOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendForgotPasswordOtpInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendForgotPasswordOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sendForgotPasswordOtpInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendForgotPasswordOtpInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<SendForgotPasswordOtpMutation, SendForgotPasswordOtpMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"verifyOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verifyOtpInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyOtpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"verifyOtpInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verifyOtpInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const SendOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendOtp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendOtp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<SendOtpMutation, SendOtpMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tel"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;