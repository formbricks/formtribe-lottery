import { leaderboard } from "./leaderboard-2024";

var prompt = require("prompt-sync")();

const pool: {
  login: string;
  name: string | null;
  points: string;
  disqualified?: boolean;
}[] = [];
const previousWinners: string[] = [];

const fillPool = () => {
  for (const person of leaderboard) {
    if (person.disqualified) continue;

    const points = parseInt(person.points, 10);
    for (let i = 0; i < points; i++) {
      pool.push(person);
    }
  }
};

const drawWinner = () => {
  return pool[Math.floor(Math.random() * pool.length)];
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  prompt("Press enter to begin");
  console.log("\nLet's start the lottery! 🤩");
  //await sleep(5000);
  console.log(`Total number of participants 👨‍👩:  ${leaderboard.length}`);
  // await sleep(5000);
  fillPool();
  console.log(`Total number of tickets in the pool 🎟️:  ${pool.length}`);
  //await sleep(5000);
  console.log("\n\nLet's draw a winner! 🎟\n");
  while (prompt("Press enter to continue") === "") {
    console.log("\nAnd the winner is... 🥁\n");
    //await sleep(5000);
    let winner = drawWinner();
    while (previousWinners.includes(winner.login)) {
      winner = drawWinner();
    }
    previousWinners.push(winner.login);
    console.log("------------------------------------");
    console.log(
      "     ",
      `${winner.name} / ${winner.login} (${winner.points} points)`,
    );
    console.log("------------------------------------");
    //await sleep(1000);
    console.log("\n\nCongratulations! 🎉🎉\n\n");
  }
};

main();
