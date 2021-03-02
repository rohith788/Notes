const { gql } = require("apollo-server");

module.exports = gql`
  type Note {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String
    email: String!
  }
  type Query {
    getNotes: [Note]
    getNote(noteId: ID!): Note
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createNote(title: String!, body: String!): Note!
    deleteNote(noteId: ID!): String!
  }
`;
