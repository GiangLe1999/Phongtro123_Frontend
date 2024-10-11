/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ok\n      error\n    }\n  }\n": types.CreateUserDocument,
    "\n  query getProvinces {\n    getProvinces {\n      ok\n      error\n      provinces {\n        name\n        code\n      }\n    }\n  }\n": types.GetProvincesDocument,
    "\n  query getDistricts {\n    getDistricts {\n      ok\n      error\n      districts {\n        name\n        code\n        province {\n          code\n        }\n      }\n    }\n  }\n": types.GetDistrictsDocument,
    "\n  query getWards {\n    getWards {\n      ok\n      error\n      wards {\n        name\n        district {\n          code\n        }\n      }\n    }\n  }\n": types.GetWardsDocument,
    "\n  mutation createPosting($createPostingInput: CreatePostingInput!) {\n    createPosting(createPostingInput: $createPostingInput) {\n      posting {\n        id\n      }\n      ok\n      error\n    }\n  }\n": types.CreatePostingDocument,
    "\n  mutation createPostingMedia(\n    $posting_id: Float!\n    $images: [Upload!]\n    $videos: [Upload!]\n  ) {\n    createPostingMedia(\n      posting_id: $posting_id\n      images: $images\n      videos: $videos\n    ) {\n      ok\n      error\n    }\n  }\n": types.CreatePostingMediaDocument,
    "\n  mutation createNewPassword($createNewPasswordInput: CreateNewPasswordInput!) {\n    createNewPassword(createNewPasswordInput: $createNewPasswordInput) {\n      ok\n      error\n    }\n  }\n": types.CreateNewPasswordDocument,
    "\n  mutation verifyForgotPasswordOtp(\n    $verifyForgotPasswordOtpInput: VerifyForgotPasswordOtpInput!\n  ) {\n    verifyForgotPasswordOtp(\n      verifyForgotPasswordOtpInput: $verifyForgotPasswordOtpInput\n    ) {\n      ok\n      error\n    }\n  }\n": types.VerifyForgotPasswordOtpDocument,
    "\n  mutation sendForgotPasswordOtp($sendForgotPasswordOtpInput: SendOtpInput!) {\n    sendForgotPasswordOtp(\n      sendForgotPasswordOtpInput: $sendForgotPasswordOtpInput\n    ) {\n      ok\n      error\n    }\n  }\n": types.SendForgotPasswordOtpDocument,
    "\n  mutation verifyOtp($verifyOtpInput: VerifyOtpInput!) {\n    verifyOtp(verifyOtpInput: $verifyOtpInput) {\n      ok\n      error\n    }\n  }\n": types.VerifyOtpDocument,
    "\n  mutation sendOtp {\n    sendOtp {\n      ok\n      error\n    }\n  }\n": types.SendOtpDocument,
    "\n  mutation login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      ok\n      accessToken\n      refreshToken\n      expiresIn\n      user {\n        id\n        tel\n        name\n        role\n        verified\n        balance\n      }\n      error\n    }\n  }\n": types.LoginDocument,
    "\n  mutation refreshToken {\n    refreshToken {\n      ok\n      accessToken\n      refreshToken\n      error\n    }\n  }\n": types.RefreshTokenDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getProvinces {\n    getProvinces {\n      ok\n      error\n      provinces {\n        name\n        code\n      }\n    }\n  }\n"): (typeof documents)["\n  query getProvinces {\n    getProvinces {\n      ok\n      error\n      provinces {\n        name\n        code\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getDistricts {\n    getDistricts {\n      ok\n      error\n      districts {\n        name\n        code\n        province {\n          code\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getDistricts {\n    getDistricts {\n      ok\n      error\n      districts {\n        name\n        code\n        province {\n          code\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getWards {\n    getWards {\n      ok\n      error\n      wards {\n        name\n        district {\n          code\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getWards {\n    getWards {\n      ok\n      error\n      wards {\n        name\n        district {\n          code\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createPosting($createPostingInput: CreatePostingInput!) {\n    createPosting(createPostingInput: $createPostingInput) {\n      posting {\n        id\n      }\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createPosting($createPostingInput: CreatePostingInput!) {\n    createPosting(createPostingInput: $createPostingInput) {\n      posting {\n        id\n      }\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createPostingMedia(\n    $posting_id: Float!\n    $images: [Upload!]\n    $videos: [Upload!]\n  ) {\n    createPostingMedia(\n      posting_id: $posting_id\n      images: $images\n      videos: $videos\n    ) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createPostingMedia(\n    $posting_id: Float!\n    $images: [Upload!]\n    $videos: [Upload!]\n  ) {\n    createPostingMedia(\n      posting_id: $posting_id\n      images: $images\n      videos: $videos\n    ) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createNewPassword($createNewPasswordInput: CreateNewPasswordInput!) {\n    createNewPassword(createNewPasswordInput: $createNewPasswordInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createNewPassword($createNewPasswordInput: CreateNewPasswordInput!) {\n    createNewPassword(createNewPasswordInput: $createNewPasswordInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation verifyForgotPasswordOtp(\n    $verifyForgotPasswordOtpInput: VerifyForgotPasswordOtpInput!\n  ) {\n    verifyForgotPasswordOtp(\n      verifyForgotPasswordOtpInput: $verifyForgotPasswordOtpInput\n    ) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation verifyForgotPasswordOtp(\n    $verifyForgotPasswordOtpInput: VerifyForgotPasswordOtpInput!\n  ) {\n    verifyForgotPasswordOtp(\n      verifyForgotPasswordOtpInput: $verifyForgotPasswordOtpInput\n    ) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation sendForgotPasswordOtp($sendForgotPasswordOtpInput: SendOtpInput!) {\n    sendForgotPasswordOtp(\n      sendForgotPasswordOtpInput: $sendForgotPasswordOtpInput\n    ) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation sendForgotPasswordOtp($sendForgotPasswordOtpInput: SendOtpInput!) {\n    sendForgotPasswordOtp(\n      sendForgotPasswordOtpInput: $sendForgotPasswordOtpInput\n    ) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation verifyOtp($verifyOtpInput: VerifyOtpInput!) {\n    verifyOtp(verifyOtpInput: $verifyOtpInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation verifyOtp($verifyOtpInput: VerifyOtpInput!) {\n    verifyOtp(verifyOtpInput: $verifyOtpInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation sendOtp {\n    sendOtp {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation sendOtp {\n    sendOtp {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      ok\n      accessToken\n      refreshToken\n      expiresIn\n      user {\n        id\n        tel\n        name\n        role\n        verified\n        balance\n      }\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation login($loginInput: LoginInput!) {\n    login(loginInput: $loginInput) {\n      ok\n      accessToken\n      refreshToken\n      expiresIn\n      user {\n        id\n        tel\n        name\n        role\n        verified\n        balance\n      }\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation refreshToken {\n    refreshToken {\n      ok\n      accessToken\n      refreshToken\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation refreshToken {\n    refreshToken {\n      ok\n      accessToken\n      refreshToken\n      error\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;