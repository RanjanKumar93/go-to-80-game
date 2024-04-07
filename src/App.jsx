import Player from "./components/Player";
import { useState } from "react";

import dice6 from "./assets/dice/dice-6.png"

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

  return (
    <>
      <div className="w-5/6 bg-pink-500 grid grid-cols-2 text-center laui mx-auto">
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
        <div className="fixed left-0 top-1/2 flex flex-col space-y-4 items-center justify-center w-full">
          {diceVisible && (
            <img
              src={dice6}
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
      <div className="mt-[20rem]">
        <pre>{`
      Instructions:
      Site is Note Responsive yet, so please play in PC.
      1.press start to play.
      2.first player 1 will roll dice, value written below score is your current score it will got add automatcally white rolling.
      3.press set to add current score to score value.
      4.If 1 comes before you pressed set, you will loose your current score and you can't be able to add current score and you have to wait for your next turn.
      5.first to get score 80 will win
      `}</pre>
      </div>
    </>
  );
}

export default App;
