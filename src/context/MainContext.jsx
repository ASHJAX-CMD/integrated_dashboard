import { createContext, useState, useEffect, useRef } from 'react';

export const wsContext = createContext();

const MainContext = ({ children }) => {
  const [serverData, setServerData] = useState(null);

  const ws = useRef(null);
  const messageQueue = useRef([]);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket server");

      // Send any queued messages if WebSocket is open
      while (messageQueue.current.length > 0) {
        ws.current.send(messageQueue.current.shift());
      }
    };

    ws.current.onmessage = (event) => {
      console.log("[MainContext] Raw Data:", event.data);
      try {
        const receivedData = JSON.parse(event.data);
        console.log("[MainContext] Parsed Data:", receivedData);

        // Ensure a new object reference to trigger re-renders in React
        setServerData({ ...receivedData });
        

      } catch (error) {
        console.error("[MainContext] Invalid JSON received:", event.data);
      }
    };

    ws.current.onclose = () => console.log("WebSocket Closed");
    ws.current.onerror = (error) => console.error("WebSocket Error:", error);

    // Cleanup WebSocket connection when component unmounts
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleClick = (event) => {
    const message = JSON.stringify({ x: event.clientX, y: event.clientY });

    // Send message through WebSocket, or queue if not open yet
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.log("WebSocket is not open yet! Queuing message.");
      messageQueue.current.push(message);
    }
  };

  return (
    <wsContext.Provider value={{ serverData, setServerData, handleClick }}>
      {children}
      {console.log("MainContext Received Data:", serverData)}
    </wsContext.Provider>
  );
};

export default MainContext;
