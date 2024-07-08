import { getClient } from "@/src/lib/apollo/client";
import { pageLinks } from "@/src/constants";
import { gql } from "@apollo/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      ok
      accessToken
      refreshToken
      error
    }
  }
`;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        if (!credentials?.tel || !credentials?.password) return null; // Fix condition check
        const { tel, password } = credentials;
        const client = getClient();
        try {
          const {
            data: { login },
          } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              loginInput: {
                tel,
                password,
              },
            },
          });

          if (login && login.ok && login.user) {
            return login.user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: pageLinks.login,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
