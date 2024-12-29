/* eslint-disable @typescript-eslint/no-explicit-any */
import { listen } from "@tauri-apps/api/event";
import { Table as AntTable, Button } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { WebviewWindow } from "@tauri-apps/api/window";
import { getDrawnObject } from "./constants";

interface ShapesForTable {
  key: number;
  object: string;
  x: number | null;
  y: number | null;
  startX: number | null;
  startY: number | null;
  endX: number | null;
  endY: number | null;
}

export const Table = () => {
  const [receivedShapes, setReceivedShapes] = useState<ShapesForTable[]>([]);
  const [originalShapes, setOriginalShapes] = useState<any[]>([]);

  const columns = [
    { title: "Фігура", dataIndex: "object", key: "object" },
    { title: "x", dataIndex: "x", key: "x" },
    { title: "y", dataIndex: "y", key: "y" },
    { title: "startX", dataIndex: "startX", key: "startX" },
    { title: "startY", dataIndex: "startY", key: "startY" },
    { title: "endX", dataIndex: "endX", key: "endX" },
    { title: "endY", dataIndex: "endY", key: "endY" },
    {
      title: "",
      dataIndex: "delete",
      key: "delete",
      render: (_: any, record: ShapesForTable) => (
        <Button
          type="primary"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];

  const handleDelete = (key: number) => {
    const updatedShapes = receivedShapes.filter((shape) => shape.key !== key);
    const updatedOriginalShapes = originalShapes.filter(
      (_, index) => index !== key
    );

    setReceivedShapes(updatedShapes);
    setOriginalShapes(updatedOriginalShapes);

    const mainWindow = WebviewWindow.getByLabel("main");
    if (mainWindow) {
      mainWindow.emit("update-shapes", updatedOriginalShapes);
    }
  };

  useEffect(() => {
    const unlisten = listen<any[]>("send-shapes", (event) => {
      const shapes = event.payload.map((shape, index) => ({
        key: index,
        object: getDrawnObject(shape),
        x: shape.x || null,
        y: shape.y || null,
        startX: shape.startX || null,
        startY: shape.startY || null,
        endX: shape.endX || null,
        endY: shape.endY || null,
      }));

      setReceivedShapes(shapes);
      setOriginalShapes(event.payload);
    });

    return () => {
      unlisten.then((cleanup) => cleanup());
    };
  }, []);

  const handleSelect = (selectedRowKeys: React.Key[]) => {
    const mainWindow = WebviewWindow.getByLabel("main");
    if (mainWindow) {
      mainWindow.emit("highlight-shapes", selectedRowKeys);
    }
  };

  return (
    <AntTable
      rowSelection={{
        type: "checkbox",
        onChange: handleSelect,
      }}
      dataSource={receivedShapes}
      columns={columns}
      pagination={false}
    />
  );
};
