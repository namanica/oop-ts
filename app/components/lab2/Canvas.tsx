import { Menu, MenuProps } from "antd";
import React, { useEffect, useRef, useState } from "react";

export const Canvas: React.FC = () => {
  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      label: "Файл",
      key: "file",
    },
    {
      label: "Обʼєкти",
      key: "objects",
      children: [
        { label: "Крапка", key: "dot" },
        { label: "Лінія", key: "line" },
        { label: "Прямокутник", key: "rectangle" },
        { label: "Еліпс", key: "elipse" },
      ],
    },
    {
      label: "Довідка",
      key: "note",
    },
  ];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentTab, setCurrentTab] = useState("");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrentTab(e.key);
  };

  const drawDot = (event: MouseEvent) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && currentTab === "dot") {
      canvas.addEventListener("mousedown", drawDot);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", drawDot);
      }
    };
  }, [currentTab]);

  return (
    <div>
      <div>
        <Menu
          onClick={onClick}
          selectedKeys={[currentTab]}
          mode="horizontal"
          items={items}
        />
      </div>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid blue", margin: "10px" }}
        width={700}
        height={400}
      />
    </div>
  );
};
