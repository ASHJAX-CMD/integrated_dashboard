// src/components/Output.js
import React, {useContext } from "react";
import { wsContext } from "../context/MainContext";

const Output = () => {
const { serverData, handleClick } = useContext(wsContext);
  return (
    <div
      style={{ backgroundColor: "silver", width: "100vw", height: "100vh" }}
      onClick={handleClick}
    >
      {console.log("Server Data from output page:", serverData)}
      Click anywhere!
    </div>
  );
};

export default Output;
