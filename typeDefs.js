export const typeDefs = `#graphql

  type Vodka {
    id: ID!
    name: String!
    type: String!
    abv: Float!
    country: String!
    details: VodkaDetails!
  }

  type VodkaDetails {
    distillery: String!
    year: Int!
    awards: Awards
  }

  type Awards {
    international: [String]!
    domestic: [String]!
  }

  type Query {
    vodkas: [Vodka!]!
    vodka(id: ID!): Vodka
  }

  type Mutation {
    createVodka(name: String!, type: String!, abv: Float!, country: String!, details: VodkaDetailsInput!): Vodka!
  }

  input VodkaDetailsInput {
    distillery: String!
    year: Int!
    awards: AwardsInput
  }

  input AwardsInput {
    international: [String]!
    domestic: [String]!
  }
`;
