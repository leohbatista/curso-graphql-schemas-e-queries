const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  # Criando um escalar nao suportado por padrao
  scalar Date

  # Tipo personalizado
  type Usuario {
    id: ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  # Pontos de entrada da API
  type Query {
    ola: String!
    horaAtual: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
  }
`;

const resolvers = {
  Usuario: {
    salario(parent) {
      return parent.salario_bruto;
    }
  },
  Produto: {
    precoComDesconto(parent) {
      return parent.desconto ? (parent.preco * (100 - parent.desconto) / 100).toFixed(2) : parent.preco;
    }
  },
  Query: {
    ola() {
      return "My GraphQL API";
    },
    horaAtual() {
      return new Date();
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: "Foo Jordan",
        email: "foo@server.com",
        idade: 25,
        salario_bruto: 4550.99,
        vip: false,
      }
    },
    produtoEmDestaque() {
      return {
        nome: "MacBook Pro",
        preco: 10999.90,
        desconto: 10.5,
      }
    }
  }
};

// Cria instancia do servidor
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server running on ${url}`);
})