"use client";
import { useEffect, useState } from "react";
// import { Lab1 } from "./components/lab1/Lab1";
// import { Lab2 } from "./components/lab2/Lab2(func)";
// import { Lab2 } from "./components/lab2/Lab2(oop)";
// import { Lab3 } from "./components/lab3/Lab3";
// import { Lab4 } from "./components/lab4/Lab4";
import { Lab5 } from "./components/lab5/Lab5";

const App = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <div>{isClient && <Lab5 />}</div>;
};

export default App;
