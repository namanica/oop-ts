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
import { listen } from "@tauri-apps/api/event";
import { formatToClass } from "./components/lab5/constants";

const App = () => {
  const [isClient, setIsClient] = useState(false);
  const [shapes, setShapes] = useState<any[]>([]);
  const urlParams = new URLSearchParams(window.location.search);
  const isTable = urlParams.get("window") === "table";

  useEffect(() => {
    setIsClient(true);

    const unlisten = listen<any[]>("update-shapes", (event) => {
      setShapes(formatToClass(event.payload));
    });

    return () => {
      unlisten.then((cleanup) => cleanup());
    };
  }, []);

  useEffect(() => {
    const unlisten = listen<number[]>("highlight-shapes", (event) => {
      const highlightedKeys = event.payload;
      const updatedShapes = shapes.map((shape, index) => {
        if (highlightedKeys.includes(index)) {
          shape.highlight("red");
        } else {
          shape.highlight("black");
        }
        return shape;
      });
      setShapes([...updatedShapes]);
    });

    return () => {
      unlisten.then((cleanup) => cleanup());
    };
  }, [shapes]);

  useEffect(() => {
    if (!isTable && isClient) {
      const targetWindow = WebviewWindow.getByLabel("table");
      if (targetWindow) {
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
