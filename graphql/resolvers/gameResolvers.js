import data from "../../public/games.json" assert { type: "json" };

const transformTags = (tags) => {
  return Object.entries(tags).map(([key, value]) => ({
    name: key,
    count: parseInt(value),
  }));
};

const gameResolvers = {
  Query: {
    game: (_, { id }) => {
      const game = data[id];
      if (game && game.tags) {
        game.tags = transformTags(game.tags);
      }
      return { id, ...game };
    },
    games: () => {
      return Object.entries(data)
        .filter(([_, game]) => !game.is_dlc)
        .map(([id, game]) => {
          if (game.tags) {
            game.tags = transformTags(game.tags);
          }
          return { id, ...game };
        });
    },
    dlcs: () => {
      return Object.entries(data)
        .filter(([_, game]) => game.is_dlc)
        .map(([id, game]) => {
          if (game.tags) {
            game.tags = transformTags(game.tags);
          }
          return { id, ...game };
        });
    },
    game_dlcs: (_, { id }) => {
      const game_dlc_list = data[id].dlc;
      return game_dlc_list.map((dlc_id) => {
        const dlc = data[dlc_id];
        if (dlc.tags) {
          dlc.tags = transformTags(dlc.tags);
        }
        return { id: dlc_id, ...dlc };
      });
    },
    searchGames: (_, { query, maxResults }) => {
      const normalizedQuery = query.toLowerCase();
      const games = Object.entries(data)
        .filter(
          ([_, game]) =>
            game.name?.toLowerCase().includes(normalizedQuery) && !game.is_dlc
        )
        .map(([id, game]) => ({ id, ...game }));
      const dlcs = Object.entries(data)
        .filter(
          ([_, game]) =>
            game.name?.toLowerCase().includes(normalizedQuery) && game.is_dlc
        )
        .map(([id, game]) => ({ id, ...game }));
      const combinedResults = [...games, ...dlcs];
      if (maxResults) {
        return combinedResults.slice(0, maxResults);
      }
      return combinedResults;
    },
  },
};

export default gameResolvers;
