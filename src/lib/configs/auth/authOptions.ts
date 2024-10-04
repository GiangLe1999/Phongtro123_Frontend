import { LoginInput } from "@/src/__generated__/graphql";
import { pageLinks } from "@/src/constants";
import { getClient } from "@/src/lib/apollo/client";
import { gql } from "@apollo/client";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const LOGIN_MUTATION = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      ok
      accessToken
      refreshToken
      expiresIn
      user {
        id
        tel
        name
        role
        verified
        balance
      }
      error
    }
  }
`;

const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken {
    refreshToken {
      ok
      accessToken
      refreshToken
      error
    }
  }
`;

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        const { tel, password } = credentials as LoginInput;
        if (!tel || !password) return null;

        const client = getClient();
        try {
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              loginInput: {
                tel,
                password,
              } as LoginInput,
            },
          });

          if (data?.login?.ok && data?.login?.user) {
            return {
              user: { ...data?.login?.user },
              backendTokens: {
                accessToken: data?.login?.accessToken,
                refreshToken: data?.login?.refreshToken,
                expiresIn: data?.login?.expiresIn,
              },
            };
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
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Sau khi người dùng xác thực thành công thì update được trigger
      // Detect event update và update field verifed của token
      if (trigger === "update" && session) {
        token.user.verified = session.user.verified;
        return token;
      }

      if (user) return { ...token, ...user };
      // Access token vẫn còn hạn
      if (new Date().getTime() < token.backendTokens.expiresIn) {
        return token;
      }
      // Nếu không thì tiến hành refresh Token
      const client = getClient();
      const { data } = await client.mutate({
        mutation: REFRESH_TOKEN_MUTATION,
        context: {
          headers: {
            Authorization: `Refresh ${token.backendTokens.refreshToken}`,
          },
        },
      });
      return {
        ...token,
        backendTokens: {
          accessToken: data?.refreshToken?.accessToken,
          refreshToken: data?.refreshToken?.refreshToken,
          expiresIn: data?.refreshToken?.expiresIn,
        },
      };
    },
    async session({ session, token }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Customize redirect behavior here
      if (url.startsWith(baseUrl)) {
        // Allow the redirect if the URL is on the same domain
        return url;
      } else {
        // Otherwise, redirect to the homepage or another safe URL
        return baseUrl;
      }
    },
  },
  pages: {
    signIn: pageLinks.login,
  },
};

export default authOptions;
