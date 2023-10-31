import { leaderboard } from "./leaderboard";

var prompt = require("prompt-sync")();

const pool: string[] = [];
const previousWinners: string[] = [];

const fillPool = () => {
  for (const person of leaderboard) {
    for (let i = 0; i < parseInt(person.points); i++) {
      pool.push(person.name);
    }
  }
};

const drawWinner = async () => {
  const winner = pool[Math.floor(Math.random() * pool.length)];
  previousWinners.push(winner);
  return winner;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  prompt("Press enter to begin");
  console.log("\nLet's start the lottery! 🤩");
  await sleep(5000);
  console.log(`Total number of participants 👨‍👩: ${leaderboard.length}`);
  await sleep(5000);
  fillPool();
  console.log(`Total number of tickets in the pool 🎟️: ${pool.length}`);
  await sleep(5000);
  console.log("\n\nLet's draw a winner! 🎟\n");
  while (prompt("Press enter to continue") === "") {
    console.log("\nAnd the winner is... 🥁\n");
    await sleep(7000);
    let winner = await drawWinner();
    while (previousWinners.includes(winner)) {
      winner = await drawWinner();
    }
    console.log(winner);
    await sleep(1000);
    console.log("\n\nCongratulations! 🎉🎉\n\n");
  }
};

main();
