/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table as AntTable, Button } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { ShapesForTable, TableManager } from "@/app/modules/TableManager";

export const Table = () => {
  const [tableManager] = useState(() => TableManager.getInstance());
  const [receivedShapes, setReceivedShapes] = useState<ShapesForTable[]>([]);

  useEffect(() => {
    const updateShapes = () => {
      setReceivedShapes(tableManager.getReceivedShapes());
    };

    tableManager.subscribe(updateShapes);
    tableManager.listenForShapes();

    return () => {
      tableManager.unsubscribe(updateShapes);
    };
  }, [tableManager]);

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
          onClick={() => tableManager.deleteShape(record.key)}
        />
      ),
    },
  ];

  const handleSelect = (selectedRowKeys: React.Key[]) => {
    tableManager.highlightShapes(selectedRowKeys);
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
