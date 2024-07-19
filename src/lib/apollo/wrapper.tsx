"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { getSession } from "next-auth/react";
import { setContext } from "@apollo/client/link/context";

// have a function to create a client for you
function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    fetchOptions: { cache: "no-store" },
  });

  const authLink: ApolloLink = setContext(async (_: any, { headers }: any) => {
    const session = await getSession();
    const modifiedHeader = {
      headers: {
        ...headers,
        authorization: session?.backendTokens?.accessToken
          ? `Bearer ${session.backendTokens.accessToken}`
          : "",
      },
    };
    return modifiedHeader;
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
