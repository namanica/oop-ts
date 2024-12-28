"use client";
import { useEffect, useState } from "react";
// import { Lab1 } from "./components/lab1/Lab1";
// import { Lab2 } from "./components/lab2/Lab2(func)";
// import { Lab2 } from "./components/lab2/Lab2(oop)";
// import { Lab3 } from "./components/lab3/Lab3";
// import { Lab4 } from "./components/lab4/Lab4";
import { Lab5 } from "./components/lab5/Lab5";
import { Table } from "./components/lab5/Table";
import { Shape } from "./modules/MyEditor";
import { WebviewWindow } from "@tauri-apps/api/window";

const App = () => {
  const [isClient, setIsClient] = useState(false);
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const isTable = urlParams.get("window") === "table";

  useEffect(() => {
    if (!isTable && isClient) {
      const targetWindow = WebviewWindow.getByLabel("table");
      if (targetWindow) {
        console.log("Emitting shapes:", shapes);
        targetWindow.emit("send-shapes", shapes);
      }
    }
  }, [shapes, isTable, isClient]);

  if (isTable && isClient) {
    return <Table />;
  }

  return (
    <div>
      {isClient && (
        <Lab5
          shapes={shapes}
          setShapes={(newShapes: Shape[]) => setShapes(newShapes)}
        />
      )}
    </div>
  );
};

export default App;
