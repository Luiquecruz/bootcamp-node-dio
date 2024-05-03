const Character = require("./character");

const charactersList = [];

const Mario = new Character("Mario", 4, 3, 3, 0);
const Luigi = new Character("Luigi", 3, 5, 2, 0);
const Bowser = new Character("Bowser", 5, 3, 5, 0);

charactersList.push(...charactersList, Mario, Luigi, Bowser);

/* methods */
const rollTheDice = async (max = 6) => {
  return Math.floor(Math.random() * max) + 1;
};

const getRandomMode = async () => {
  let random = Math.random();
  let result = "";

  switch (true) {
    case random < 0.33:
      result = "DRAG";
      break;

    case random < 0.66:
      result = "DRIFT";
      break;

    default:
      result = "FIGHT";
      break;
  }

  return result;
};

const raceMessage = async (character, mode, dice, attr) => {
  console.log(
    ` - ${character} 🎲 rolled the dice and got number [${dice}] \n`,
    `- ${character} added +${dice} to ${mode} skill, and the new value is: ${dice + attr} \n`,
  );
};

const score = (points) => {
  return `${points} ${points > 1 ? "Points" : "Point"}`;
};

const raceEngine = async (P1, P2) => {
  let round = 1;
  let mode = null;
  let diceResult1 = null;
  let diceResult2 = null;
  let testSkill1 = 0;
  let testSkill2 = 0;

  console.log(
    " ------------------------------------------------------------\n",
    `(P1) ${P1.Name} vs ${P2.Name} (P2) \n`,
    "------------------------------------------------------------\n",
  );

  for (round; round <= 5; round++) {
    mode = await getRandomMode();
    diceResult1 = await rollTheDice();
    diceResult2 = await rollTheDice();

    console.log(`🏁 Round ${round} | Mode ${mode}`);

    if (mode === "DRAG") {
      testSkill1 = P1?.Speed + diceResult1;
      testSkill2 = P2?.Speed + diceResult2;

      await raceMessage(P1?.Name, mode, diceResult1, P1?.Speed);
      await raceMessage(P2?.Name, mode, diceResult2, P2?.Speed);
    }

    if (mode === "DRIFT") {
      testSkill1 = P1?.Handling + diceResult1;
      testSkill2 = P2?.Handling + diceResult2;

      await raceMessage(P1?.Name, mode, diceResult1, P1?.Handling);
      await raceMessage(P2?.Name, mode, diceResult2, P2?.Handling);
    }

    if (mode === "FIGHT") {
      testSkill1 = P1?.Power + diceResult1;
      testSkill2 = P2?.Power + diceResult2;

      await raceMessage(P1?.Name, mode, diceResult1, P1?.Power);
      await raceMessage(P2?.Name, mode, diceResult2, P2?.Power);

      if (testSkill1 > testSkill2 && P2.Points > 0) {
        P2.Points--;
      } else if (testSkill2 > testSkill1 && P1.Points > 0) {
        P1.Points--;
      }
    }

    testSkill1 > testSkill2
      ? (console.log(`✨ ${P1.Name} scored! \n`), P1.Points++)
      : (console.log(`✨ ${P2.Name} scored! \n`), P2.Points++);
  }

  if (P1.Points === P2.Points) return console.log("🔻 The Cup TIED! 🔻");

  P1.Points > P2.Points
    ? console.log(
        `🏆 ${P1.Name} is the Cup Winner with ${score(P1.Points)}! 🏆`,
      )
    : console.log(
        `🏆 ${P2.Name} is the Cup Winner with ${score(P2.Points)}! 🏆`,
      );
};

(async function main() {
  console.log(`🌟 A new Cup is about to start! 🌟\n`, "\n🔴 \n🟡 \n🟢\n");

  await raceEngine(charactersList[0], charactersList[2]);
})();
