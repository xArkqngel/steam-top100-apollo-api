import { gql } from "apollo-server-express";

const gameTypeDefs = gql`
  type Query {
    game(id: ID!): Game
    games: [Game]
    dlcs: [Game]
    game_dlcs(id: ID!): [Game]
    searchGames(query: String!, maxResults: Int): [Game]
  }

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

export default gameTypeDefs;
