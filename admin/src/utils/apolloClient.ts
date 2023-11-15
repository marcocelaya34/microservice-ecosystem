import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from "@apollo/client/utilities";


// Crea un enlace HTTP para las consultas y las mutaciones
const httpLink = new HttpLink({
    uri: 'http://localhost:3001/graphql',
  });
  
  // Crea un enlace WebSocket para las suscripciones
  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:3001/graphql',
    options: {
      reconnect: true,
    },
  });
  
  // Usa el enlace WebSocket para las suscripciones y el enlace HTTP para todo lo demás
  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});
