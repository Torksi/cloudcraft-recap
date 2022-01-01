/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

fs.readdir("./public/data/2021", (err, files) => {
  let count = 0;
  let deathTotal = 0;
  let playerKillTotal = 0;
  let mobKillTotal = 0;

  files.forEach((file) => {
    const data = JSON.parse(
      fs.readFileSync(`./public/data/2021/${file}`, "utf8")
    );
    count += 1;
    deathTotal += data.info.death_count;
    playerKillTotal += data.info.player_kill_count;
    mobKillTotal += data.info.mob_kill_count;
  });

  console.log(`Average Deaths: ${deathTotal / count}`);
  console.log(`Average Mob Kills: ${mobKillTotal / count}`);
  console.log(`Average Player Kills: ${playerKillTotal / count}`);
});
