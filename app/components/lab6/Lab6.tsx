import { emit } from "@tauri-apps/api/event";
import { useState } from "react";
import { Button, Input, Modal } from "antd";

export interface GenerationParams {
  n: number;
  min: number;
  max: number;
}

export interface GeneratedData {
  numbers: number[];
}

export const Lab6 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState<GenerationParams>({
    n: 0,
    min: 0,
    max: 0,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    emit("start-generation", params);
    setIsModalOpen(false);
  };

  const handleChange = (field: keyof GenerationParams, value: string) => {
    setParams((prev) => ({
      ...prev,
      [field]: field === "n" ? parseInt(value, 10) : parseFloat(value),
    }));
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button type="primary" onClick={showModal}>
        Почати
      </Button>
      <Modal
        centered
        closable={false}
        title="Введіть дані"
        open={isModalOpen}
        okText="Так"
        onOk={handleOk}
        cancelText="Скасувати"
        onCancel={() => setIsModalOpen(false)}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Input
            placeholder="n"
            onChange={(e) => handleChange("n", e.target.value)}
          />
          <Input
            placeholder="min"
            onChange={(e) => handleChange("min", e.target.value)}
          />
          <Input
            placeholder="max"
            onChange={(e) => handleChange("max", e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};
