/* eslint-disable @typescript-eslint/no-explicit-any */
import { listen } from "@tauri-apps/api/event";
import { Table as AntTable } from "antd";
import { useEffect, useState } from "react";
import { writeFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";

const columns = [
  {
    title: "Фігура",
    dataIndex: "object",
    key: "object",
  },
  {
    title: "x",
    dataIndex: "x",
    key: "x",
  },
  {
    title: "y",
    dataIndex: "y",
    key: "y",
  },
  {
    title: "startX",
    dataIndex: "startX",
    key: "startX",
  },
  {
    title: "startY",
    dataIndex: "startY",
    key: "startY",
  },
  {
    title: "endX",
    dataIndex: "endX",
    key: "endX",
  },
  {
    title: "endY",
    dataIndex: "endY",
    key: "endY",
  },
];

export const Table = () => {
  const [receivedShapes, setReceivedShapes] = useState<any[]>([]);
  const getDrawnObject = (shape: any) => {
    let objectName;
    if (shape.radiusX && !shape.radius) {
      objectName = "Еліпс";
    } else if (shape.width && !shape.depth) {
      objectName = "Прямокутник";
    } else if (shape.radius) {
      objectName = "Лінія з кружечками";
    } else if (shape.depth) {
      objectName = "Куб";
    } else if (shape.startX && !shape.radius) {
      objectName = "Лінія";
    } else {
      objectName = "Крапка";
    }
    return objectName;
  };

  useEffect(() => {
    const unlisten = listen<any[]>("send-shapes", async (event) => {
      const shapes = event.payload.map((shape, index) => {
        return {
          key: index,
          object: getDrawnObject(shape),
          x: shape.x || null,
          y: shape.y || null,
          startX: shape.startX || null,
          startY: shape.startY || null,
          endX: shape.endX || null,
          endY: shape.endY || null,
        };
      });

      setReceivedShapes(shapes);

      const desktopPath = await desktopDir();
      const filePath = `${desktopPath}shapes.txt`;

      const fileContent = shapes
        .map(
          (shape) =>
            `${getDrawnObject(shape)} з координатами: ${JSON.stringify({
              x: shape.x || null,
              y: shape.y || null,
              startX: shape.startX || null,
              startY: shape.startY || null,
              endX: shape.endX || null,
              endY: shape.endY || null,
            })}`
        )
        .join("\n");

      writeFile({
        path: filePath,
        contents: fileContent,
      })
        .then(() => {
          console.log(`File written successfully to ${filePath}`);
        })
        .catch((err) => {
          console.error("Error writing file:", err);
        });
    });

    return () => {
      unlisten.then((cleanup) => cleanup());
    };
  }, []);

  return (
    <AntTable
      dataSource={receivedShapes}
      columns={columns}
      pagination={false}
    />
  );
};
