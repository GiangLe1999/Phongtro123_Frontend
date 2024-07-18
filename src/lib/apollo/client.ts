import { HttpLink, ApolloLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const authLink = setContext((request, { headers }) => ({
    headers: {
      ...headers,
      "Apollo-Require-Preflight": "true",
      "x-apollo-operation-name": request.operationName || "default-operation", // Add this line
      "content-type": "application/json", // Ensure the content-type is not one of the blocked types
    },
  }));

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_SERVER_URL,
    fetchOptions: {
      mode: "no-cors",
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
  });
});
