import { useState } from "react";

function Name({ name, isEditing, onNameChange, inputName }) {
  return (
    <div className="text-white">
      {isEditing ? (
        <input
          name={inputName}
          type="text"
          value={name}
          onChange={onNameChange}
          className="outline-none px-1 text-lg py-0.5 rounded-lg text-black"
          maxLength={12}
        />
      ) : (
        <p className="text-lg mb-1">{name}</p> 
      )}
    </div>
  );
}

export default Name;
