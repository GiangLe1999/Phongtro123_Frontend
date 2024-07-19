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

  const authLink: ApolloLink = setContext(async () => {
    const session = await getSession();
    return {
      headers: {
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    };
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
