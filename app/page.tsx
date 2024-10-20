"use client";
import { useEffect, useState } from "react";
import { Lab2 } from "./components/lab2/Lab2(oop)";
// import { Lab1 } from "./components/lab1/Lab1";
// import { Lab2 } from "./components/lab2/Lab2(func)";

const App = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <div>{isClient && <Lab2 />}</div>;
};

export default App;
