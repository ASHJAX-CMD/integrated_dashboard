import React, { useState, useEffect, useContext } from 'react';
import { wsContext } from "../context/MainContext";

const Input = () => {
  const { serverData } = useContext(wsContext);
  const [circles, setCircles] = useState([]);

  // Debugging logs to verify the flow
  console.log("[Input] Rendered");
  console.log("[Input] Current serverData:", serverData);

  useEffect(() => {
    console.log("[Input] useEffect triggered with:", serverData);

    if (serverData && serverData.x !== undefined && serverData.y !== undefined) {
      setCircles((prevCircles) => [
        ...prevCircles,
        { x: serverData.x, y: serverData.y, id: Date.now() },
      ]);
    }
  }, [serverData]); // Re-run on serverData change

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCircles([...circles, { x, y, id: Date.now() }]);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "violet",
        position: "relative",
        overflow: "hidden",
      }}
    >{console.log("Server Data from input page:", serverData)}
      {circles.map((circle) => (
        <div
          key={circle.id}
          style={{
            position: "absolute",
            width: "32px",
            height: "32px",
            backgroundColor: "gold",
            borderRadius: "50%",
            top: `${circle.y - 16}px`, // center the circle
            left: `${circle.x - 16}px`,
            pointerEvents: "none",
            boxShadow: "0 0 10px gold",
          }}
        />
      ))}
    </div>
  );
};

export default Input;
