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
          className="outline-none px-1 py-0.5 text-black"
          minLength={4}
          maxLength={12}
        />
      ) : (
        name
      )}
    </div>
  );
}

export default Name;
