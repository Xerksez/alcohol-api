export const typeDefs = `#graphql

  scalar Date

  type Vodka {
    id: Int!
    name: String!
    type: String!
    abv: Float!
    country: String!
    details: VodkaDetails!
    createdAt: Date!
  }

  type Rum {
    id: Int!
    name: String!
    type: String!
    abv: Float!
    country: String!
    details: RumDetails!
    createdAt: Date!
  }

  type Wine {
    id: Int!
    name: String!
    type: String!
    abv: Float!
    country: String!
    details: WineDetails!
    createdAt: Date!
  }

  type Whiskey {
    id: Int!
    name: String!
    type: String!
    abv: Float!
    country: String!
    details: WhiskeyDetails!
    createdAt: Date!
  }

  type VodkaDetails {
    distillery: String!
    year: Int!
    awards: Awards
  }

  type RumDetails {
    distillery: String!
    year: Int!
    aging: Int
    awards: Awards
  }

  type WineDetails {
    vineyard: String!
    year: Int!
    awards: Awards
  }

  type WhiskeyDetails {
    distillery: String!
    year: Int!
    aging: Int
    awards: Awards
  }

  type Awards {
    international: [Int]!
    domestic: [Int]!
  }

  input VodkaFilterInput {
    name: StringFilter
    type: StringFilter
    abv: NumberFilter
    country: StringFilter
    details: VodkaDetailsFilter
  }

  input RumFilterInput {
    name: StringFilter
    type: StringFilter
    abv: NumberFilter
    country: StringFilter
    details: RumDetailsFilter
  }

  input WineFilterInput {
    name: StringFilter
    type: StringFilter
    abv: NumberFilter
    country: StringFilter
    details: WineDetailsFilter
  }

  input WhiskeyFilterInput {
    name: StringFilter
    type: StringFilter
    abv: NumberFilter
    country: StringFilter
    details: WhiskeyDetailsFilter
  }

  input VodkaDetailsFilter {
    distillery: StringFilter
    year: NumberFilter
    awards: AwardsFilter
  }

  input RumDetailsFilter {
    distillery: StringFilter
    year: NumberFilter
    aging: NumberFilter
    awards: AwardsFilter
  }

  input WineDetailsFilter {
    vineyard: StringFilter
    year: NumberFilter
    awards: AwardsFilter
  }

  input WhiskeyDetailsFilter {
    distillery: StringFilter
    year: NumberFilter
    aging: NumberFilter
    awards: AwardsFilter
  }

  input AwardsFilter {
    international: NumberFilter
    domestic: NumberFilter
  }

  input StringFilter {
    eq: String
    contains: String
    neq: String
    notContains: String
  }

  input NumberFilter {
    eq: Float
    gt: Float
    lt: Float
    gte: Float
    lte: Float
  }

  input PaginationInput {
    limit: Int!
    offset: Int!
  }

  type Query {
    vodkas(filter: VodkaFilterInput, sort: String, pagination: PaginationInput): [Vodka!]!
    vodka(id: Int!): Vodka
    rums(filter: RumFilterInput, sort: String, pagination: PaginationInput): [Rum!]!
    rum(id: Int!): Rum
    wines(filter: WineFilterInput, sort: String, pagination: PaginationInput): [Wine!]!
    wine(id: Int!): Wine
    whiskies(filter: WhiskeyFilterInput, sort: String, pagination: PaginationInput): [Whiskey!]!
    whiskey(id: Int!): Whiskey
  }

  type Mutation {
    createVodka(name: String!, type: String!, abv: Float!, country: String!, details: VodkaDetailsInput!): Vodka!
    updateVodka(id: Int!, name: String, type: String, abv: Float, country: String, details: VodkaDetailsInput): Vodka!
    patchVodka(id: Int!, name: String, type: String, abv: Float, country: String, details: VodkaDetailsInput): Vodka!
    deleteVodka(id: Int!): Boolean!

    createRum(name: String!, type: String!, abv: Float!, country: String!, details: RumDetailsInput!): Rum!
    updateRum(id: Int!, name: String, type: String, abv: Float, country: String, details: RumDetailsInput): Rum!
    patchRum(id: Int!, name: String, type: String, abv: Float, country: String, details: RumDetailsInput): Rum!
    deleteRum(id: Int!): Boolean!

    createWine(name: String!, type: String!, abv: Float!, country: String!, details: WineDetailsInput!): Wine!
    updateWine(id: Int!, name: String, type: String, abv: Float, country: String, details: WineDetailsInput): Wine!
    patchWine(id: Int!, name: String, type: String, abv: Float, country: String, details: WineDetailsInput): Wine!
    deleteWine(id: Int!): Boolean!

    createWhiskey(name: String!, type: String!, abv: Float!, country: String!, details: WhiskeyDetailsInput!): Whiskey!
    updateWhiskey(id: Int!, name: String, type: String, abv: Float, country: String, details: WhiskeyDetailsInput): Whiskey!
    patchWhiskey(id: Int!, name: String, type: String, abv: Float, country: String, details: WhiskeyDetailsInput): Whiskey!
    deleteWhiskey(id: Int!): Boolean!
  }

  input VodkaDetailsInput {
    distillery: String!
    year: Int!
    awards: AwardsInput
  }

  input RumDetailsInput {
    distillery: String!
    year: Int!
    awards: AwardsInput
  }

  input WineDetailsInput {
    vineyard: String!
    year: Int!
    awards: AwardsInput
  }

  input WhiskeyDetailsInput {
    distillery: String!
    year: Int!
    awards: AwardsInput
  }

  input AwardsInput {
    international: [Int]!
    domestic: [Int]!
  }
`;