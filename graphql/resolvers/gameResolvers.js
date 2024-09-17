import data from "../../public/games.json" assert { type: "json" };

const transformTags = (tags) => {
  return Object.keys(tags).map((key) => ({
    name: key,
    count: tags[key],
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
      const filteredGames = Object.entries(data)
        .filter(([_, game]) =>
          game.name?.toLowerCase().includes(normalizedQuery)
        )
        .map(([id, game]) => ({ id, ...game }));
      if (maxResults) {
        return filteredGames.slice(0, maxResults);
      }
      return filteredGames;
    },
  },
};

export default gameResolvers;
