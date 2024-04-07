import { useState } from "react";
import Name from "./Name";

function Player({
  name,
  isActive,
  score,
  currentScore,
  setScore,
  winner,
  handleNameChange,
  inputName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <div
      className={`h-full flex flex-col border-[1px] justify-center py-5 text-white ${
        isActive ? "bg-blue-500" : ""
      } ${winner ? "bg-green-500" : ""}`}
    >
      <div className="flex items-center w-full justify-between px-44">
        <Name
          inputName={inputName}
          name={name}
          onNameChange={handleNameChange}
          isEditing={isEditing}
        />
        <button
          disabled={winner}
          onClick={handleEditClick}
          className="hover:bg-[black] text-black hover:text-white border-[1px] border-black rounded-lg px-1 py-0.5"
        >
          {isEditing ? "save" : "edit"}
        </button>
      </div>
      <div className="mt-4 flex flex-col space-y-3 items-center">
        <div>Score: {score}</div>
        <div>{currentScore}</div>
        <button
          onClick={setScore}
          disabled={winner}
          className="border-[1px] border-black px-1 py-0.5 rounded-lg hover:bg-black"
        >
          set
        </button>
      </div>
    </div>
  );
}

export default Player;
