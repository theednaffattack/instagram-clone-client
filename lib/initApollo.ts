import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject
} from "apollo-boost";
import { setContext } from "apollo-link-context";
// import { createHttpLink } from "apollo-link-http";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import fetch from "isomorphic-unfetch";
import { onError } from "apollo-link-error";
import { split } from "apollo-link";

import { getMainDefinition } from "apollo-utilities";

import { isBrowser } from "./isBrowser";
import Router from "next/router";

const myIpAddress = "192.168.1.8"; // internalIp.v4.sync();

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

interface Options {
  getToken: () => string;
}

function create(initialState: any, { getToken }: Options) {
  // const httpLink = createHttpLink({
  //   uri: `http://${myIpAddress}:4000/graphql`,
  //   credentials: "include"
  // });

  const uploadLink = createUploadLink({
    uri: `http://${myIpAddress}:4000/graphql`,
    credentials: "include"
  });

  // Create a WebSocket link:
  const wsLink = isBrowser
    ? new WebSocketLink({
        uri: `ws://${myIpAddress}:4000/subscriptions`,
        options: {
          reconnect: true
          // connectionParams: {
          //   authToken: authToken ? `qid=${authToken}` : ""
          // }
        }
      })
    : null;

  const splitLink = isBrowser
    ? split(
        // split based on operation type
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink!,
        uploadLink
      )
    : uploadLink;

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
            null,
            2
          )}, Path: ${path}`
        );
        if (isBrowser && message.includes("Not authenticated")) {
          Router.replace("/login");
        }
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        cookie: token ? `qid=${token}` : ""
      }
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(authLink.concat(uploadLink)),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState: any, options: Options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
