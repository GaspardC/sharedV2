import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  TypePolicies,
  makeVar,
  NormalizedCacheObject,
  from,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  persistCache,
  AsyncStorageWrapper,
  LocalStorageWrapper,
  LocalForageWrapper,
} from "apollo3-cache-persist";
import OfflineLink from "apollo-link-offline";
import { useState, useEffect } from "react";
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";
import { isDev, isWeb } from "../utils/index";
import { RvsAnyType, useRehydrateReactiveVariables } from "./reactiveVariables";
import storageHybrid from "../utils/storage/storage";
import asyncStorage from "../utils/storage/utilStorage";
import authToken from "../utils/auth";
import useNetworkFlag from "../hooks/useNetwork";
import AsyncWebStorageWrapper from "../utils/storage/async.storage";

const storage = isWeb()
  ? new AsyncWebStorageWrapper(storageHybrid)
  : new AsyncStorageWrapper(storageHybrid);

// export const GRAPHQL_ENDPOINT = `${process.env.REACT_APP_BACKEND_URL}/graphql`;
// export const API_ENDPOINT = `${process.env.REACT_APP_BACKEND_URL}`;
export const amILoggedIn = makeVar<boolean>(false);

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await authToken.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export let backendUrl = process.env.REACT_APP_BACKEND_URL;
const useApolloClient = (
  backendUrl_?: string,
  queryFields?: TypePolicies["Query"]["fields"],
  rvsToRehydrate?: RvsAnyType,
  extraTypePolicy?: TypePolicies,
  apolloLinks?: ApolloLink[]
) => {
  const rvsReloaded = useRehydrateReactiveVariables(rvsToRehydrate);

  backendUrl = backendUrl_ ?? process.env.REACT_APP_BACKEND_URL;
  const graphQLEndpoint = `${backendUrl}/graphql`;

  const uploadLink = createUploadLink({ uri: graphQLEndpoint });

  // const offlineLink = new OfflineLink({
  //   storage,
  //   sequential: true
  // });

  const { networkIsConnected, wasConnected } = useNetworkFlag();
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  //TODO: include in settings shared -local only
  // useEffect(() => {
  //   (async () => {
  //     // console.log(
  //     //   "testoffline",
  //     //   wasConnected,
  //     //   networkIsConnected,
  //     //   !wasConnected && !!networkIsConnected
  //     // );
  //     if (networkIsConnected === true && client) {
  //       const queueSize = (await offlineLink.getQueue()).size;
  //       try {
  //         console.log("offline mutations sync", queueSize);

  //         await offlineLink.setup(client);
  //         // if (networkIsConnected === true) {
  //         //   console.log("reseting cached client");
  //         //   await client.cache.reset();
  //         // }
  //         // client.refetchQueries({ include: "active" });
  //       } catch (e) {
  //         console.log("error sync offline mutaitons", e);
  //       }
  //     }
  //   })();
  // }, [networkIsConnected]);

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              UsersPermissionsMe: {
                read() {
                  return amILoggedIn();
                },
              },
              ...(queryFields && queryFields),
            },
          },
          ...(extraTypePolicy && extraTypePolicy),
        },
      });
      await persistCache({
        cache,
        storage,
        // storage,
        maxSize: false,
        debug: isDev(),
      });
      // const link = authLink.concat(uploadLink);
      // const link = from([offlineLink, authLink, uploadLink]);
      const link = from([...(apolloLinks ?? []), authLink, uploadLink]);

      const newClient = new ApolloClient({
        link,
        cache,
        connectToDevTools: true, //isDev(),
        defaultOptions: {
          watchQuery: {
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
          },
          query: {
            // fetchPolicy: "cache-and-network",
            errorPolicy: "all",
          },
          mutate: {
            errorPolicy: "all",
          },
        },
      });
      // await offlineLink.setup(newClient);
      setClient(newClient);
    }

    init().catch(console.error);
  }, []);
  return { client, rvsReloaded };
};
export default useApolloClient;
