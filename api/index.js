import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";

import data from "../public/games.json" assert { type: "json" };

// Transform tags function
const transformTags = (tags) => {
  return Object.keys(tags).map((key) => ({
    name: key,
    count: tags[key],
  }));
};

// Define your resolvers
const resolvers = {
  Query: {
    game: (_, { id }) => {
      const game = data[id];
      if (game && game.tags) {
        game.tags = transformTags(game.tags);
      }
      return game;
    },
  },
};

// Define your schema
const typeDefs = gql`
  type Game {
    id: ID
    name: String
    release_date: String
    price: Float
    dlc: [Int]
    is_dlc: Boolean
    detailed_description: String
    about_the_game: String
    short_description: String
    reviews: String
    header_image: String
    capsule_image: String
    windows: Boolean
    mac: Boolean
    linux: Boolean
    recommendations: Int
    supported_languages: [String]
    full_audio_languages: [String]
    minimum_requirements: Requirements
    recommended_requirements: Requirements
    packages: [Packages]
    achievements: Achievements
    developers: [String]
    publishers: [String]
    categories: [String]
    genres: [String]
    screenshots: [String]
    movies: [String]
    positive: Int
    negative: Int
    estimated_owners: String
    average_playtime_2weeks: String
    average_playtime_forever: String
    discount: String
    peak_ccu: Int
    tags: [Tag]
  }

  type Query {
    game(id: ID!): Game
    games: [Game]
  }

  type Achievements {
    total: Int
    highlighted: [Achievement]
  }

  type Achievement {
    name: String
    path: String
  }

  type Requirements {
    os: String
    processor: String
    memory: String
    graphics: String
    directX: String
    network: String
    storage: String
    sound_card: String
    additional_notes: String
  }

  type Packages {
    title: String
    description: String
    subs: [Package]
  }

  type Package {
    text: String
    description: String
    price: Float
  }

  type Tag {
    name: String
    count: Int
  }
`;

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer(app, httpServer);

export default httpServer;
