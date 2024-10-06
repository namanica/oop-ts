"use client";
import { useEffect, useState } from "react";
import { Lab1 } from "./components/lab1/Lab1";

const App = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <div>{isClient && <Lab1 />}</div>;
};

export default App;
