import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import gql from 'graphql-tag';
import { ApolloProvider, graphql } from 'react-apollo';


const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:8080/graphql' }),
  cache: new InMemoryCache(),
});





export default client
