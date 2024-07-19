// import { HttpLink, makeVar } from "@apollo/client";
// import {
//   registerApolloClient,
//   ApolloClient,
//   InMemoryCache,
// } from "@apollo/experimental-nextjs-app-support";

// export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       uri: process.env.,
//       // you can disable result caching here if you want to
//       // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
//       // fetchOptions: { cache: "no-store" },
//       fetchOptions: {
//         mode: "no-cors",
//       },
//     }),
//   });
// });

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      // authorization: `Bearer ${HYGRAPH_PERMANENTAUTH_TOKEN}`
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
