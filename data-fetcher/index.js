/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { default: axios } = require("axios");
const fs = require("fs");
// eslint-disable-next-line import/extensions, import/no-unresolved
const leaderboard = require("../src/data/players.json");

for (let i = 0; i < leaderboard.data.length; i += 1) {
  const player = leaderboard.data[i];
  const playerName = player.name.replace(/(<([^>]+)>)/gi, "");

  if (!fs.existsSync(`../data/${playerName}.json`)) {
    setTimeout(async () => {
      await axios
        .get(`https://stats.cloudcraft.fi/v1/player?player=${playerName}`)
        .then((response) => {
          fs.writeFile(
            `../data/${playerName}.json`,
            JSON.stringify(response.data),
            (err) => {
              if (err) {
                return console.error(err);
              }
              return console.log(`${playerName} was saved!`);
            }
          );
        })
        .catch(() => {
          console.error(`${playerName} caught an error (${i})!`);
        });
    }, 5000);
  }
}
