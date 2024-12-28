/* eslint-disable @typescript-eslint/no-explicit-any */
import { listen } from "@tauri-apps/api/event";
import { Table as AntTable } from "antd";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    const unlisten = listen<any[]>("send-shapes", (event) => {
      const shapes = event.payload.map((shape, index) => {
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

        return {
          key: index,
          object: objectName,
          x: shape.x ? shape.x : undefined,
          y: shape.y ? shape.y : undefined,
          startX: shape.startX ? shape.startX : undefined,
          startY: shape.startY ? shape.startY : undefined,
          endX: shape.endX ? shape.endX : undefined,
          endY: shape.endY ? shape.endY : undefined,
        };
      });
      setReceivedShapes(shapes);
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
