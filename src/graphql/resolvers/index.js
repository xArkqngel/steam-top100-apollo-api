import gameResolvers from "./gameResolvers.js";

const resolvers = {
  Query: {
    ...gameResolvers.Query,
  },
};

export default resolvers;
