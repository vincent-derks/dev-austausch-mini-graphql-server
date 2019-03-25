const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// The GraphQL schema
const typeDefs = gql`
  type Hello {
    text: String
    date: String
  }
  type Norris {
    categorie: String
    icon_url: String
    id: String
    url: String
    value: String
  }
  type Query {
    hello: Hello
    norris: Norris
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => ({ text: 'world', date: Date.now() }),
    norris: () =>
      axios.get('https://api.chucknorris.io/jokes/random').then(res => res.data)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
