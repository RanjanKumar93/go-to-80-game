import Player from "./components/Player";
import { useState } from "react";

import dice6 from "./assets/dice/dice-6.png";
import dice1 from "./assets/dice/dice-1.png";
import dice2 from "./assets/dice/dice-2.png";
import dice3 from "./assets/dice/dice-3.png";
import dice4 from "./assets/dice/dice-4.png";
import dice5 from "./assets/dice/dice-5.png";

function App() {
  const [dice, setDice] = useState(6);
  const [diceVisible, setDiceVisible] = useState(false);
  const [turn, setTurn] = useState("P1");
  const [scoreP1, setScoreP1] = useState(0);
  const [scoreP2, setScoreP2] = useState(0);
  const [currentScoreP1, setCurrentScoreP1] = useState(0);
  const [currentScoreP2, setCurrentScoreP2] = useState(0);
  const [winner, setWinner] = useState("");
  const [name, setName] = useState({
    P1: "P1",
    P2: "P2",
  });

  function handleRollClick() {
    if (winner) {
      setScoreP1(0);
      setScoreP2(0);
      setCurrentScoreP1(0);
      setCurrentScoreP2(0);
      setWinner("");
      setTurn("P1");
      setDice(6);
      return;
    }
    setDiceVisible(true);
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    setDice(randomNumber);
    if (randomNumber === 1) {
      setTurn((prev) => (prev === "P1" ? "P2" : "P1"));
      setCurrentScoreP1(0);
      setCurrentScoreP2(0);
      return;
    } else {
      turn === "P1" &&
        diceVisible &&
        setCurrentScoreP1((prev) => prev + randomNumber);
      turn === "P2" &&
        diceVisible &&
        setCurrentScoreP2((prev) => prev + randomNumber);
    }
  }

  function setScore() {
    const updateScoreAndTurn = () => {
      if (turn === "P1") {
        if (scoreP1 + currentScoreP1 >= 80) {
          setWinner("P1");
          setScoreP1((prev) => prev + currentScoreP1);
          setCurrentScoreP1(0);
          return;
        }
        setScoreP1((prev) => prev + currentScoreP1);
        setCurrentScoreP1(0);

        setTurn("P2");
      } else {
        if (scoreP2 + currentScoreP2 >= 80) {
          setWinner("P2");
          setScoreP2((prev) => prev + currentScoreP2);
          setCurrentScoreP2(0);
          return;
        }
        setTurn("P1");
        setScoreP2((prev) => prev + currentScoreP2);
        setCurrentScoreP2(0);
      }
    };
    updateScoreAndTurn();
  }

  const handleNameChange = (e) => {
    setName((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const diceImage = (value) => {
    if (value === 1) {
      return dice1;
    } else if (value === 2) {
      return dice2;
    } else if (value === 3) {
      return dice3;
    } else if (value === 4) {
      return dice4;
    } else if (value === 5) {
      return dice5;
    } else if (value === 6) {
      return dice6;
    }
  };

  return (
    <>
      <div className="w-5/6 bg-pink-500 grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 text-center laui mx-auto">
        {winner === "P1" && (
          <div className="fixed text-9xl w-full text-center left-0 top-44">
            {name.P1} Wins
          </div>
        )}
        {winner === "P2" && (
          <div className="fixed text-9xl w-full text-center left-0 top-44">
            {name.P2} Wins
          </div>
        )}
        <Player
          inputName="P1"
          handleNameChange={handleNameChange}
          winner={winner === "P1" ? "P1" : ""}
          setScore={setScore}
          name={name.P1}
          currentScore={currentScoreP1}
          isActive={turn === "P1" && diceVisible}
          score={scoreP1}
        />
        <div className="sm:fixed bg-pink-300 left-0 top-1/2 flex flex-col space-y-4 items-center justify-center w-full">
          {diceVisible && (
            <img
              src={diceImage(dice)}
              alt={`dice-${dice}`}
              className="h-24 w-24"
            />
          )}
          <button
            onClick={handleRollClick}
            className="text-xl border-[1px] hover:bg-black hover:text-white px-1 py-0.5 border-black rounded-lg"
          >
            {diceVisible && winner === "" && "Roll"}
            {!diceVisible && winner === "" && "Start"}
            {(winner === "P1" || winner === "P2") && "Rematch"}
          </button>
        </div>
        <Player
          inputName="P2"
          handleNameChange={handleNameChange}
          winner={winner === "P2" ? "P2" : ""}
          setScore={setScore}
          name={name.P2}
          isActive={turn === "P2" && diceVisible}
          score={scoreP2}
          currentScore={currentScoreP2}
        />
      </div>
      <div className="mt-4 sm:mt-[20rem]">
        <h1 className="my-2 text-2xl">Instructions</h1>
        <ol className="list-outside list-decimal pl-5">
          <li>It is a 1 vs 1 game.</li>
          <li>Press start to play.</li>
          <li>
            First player 1 will roll the dice. The value written below the score
            is your current score; it will be added automatically while rolling.
          </li>
          <li>Press Set to add the current score to the total score.</li>
          <li>
            If a 1 comes up before you pressed Set, you will lose your current
            score and won&apos;t be able to add it to the total score.
            You&apos;ll have to wait for your next turn.
          </li>
          <li>The first player to reach a score of 80 will win.</li>
        </ol>
      </div>
    </>
  );
}

export default App;
