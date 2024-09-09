# Steam Top 100 Games API

Apollo GraphQL API created using data scrapped from my [version](https://github.com/xArkqngel/Steam-Games-Scraper) of the [Steam Games Scraper](https://github.com/FronkonGames/Steam-Games-Scraper), which has the top 100 most played games and its DLCs

## Installation
```
yarn install
```
To run the local dev enviorment
```
yarn dev
```
it will run at localhost:3000/graphql. This page will redirect you to Apollo Studio

## Query
These are the possible queries
```
  query ($gameId: ID!) {
    game(id: $gameId) {
      ...
    }
    game_dlcs(id: $gameId) {
      ...
    }
    games {
      ...
    }
    dlcs {
      ...
    }
}

```

## Demo
To see a demo of the application, go to [Apollo Studio](https://studio.apollographql.com/sandbox/explorer), and paste at top left this URL
```
https://steam-top100-apollo-api.vercel.app/graphql
```
