import { ApolloClient, InMemoryCache } from "@apollo/client";

/// cliet
export const client = new ApolloClient({
  uri: "https://sukoapi-production.up.railway.app/graphql",
  cache: new InMemoryCache(),
});
