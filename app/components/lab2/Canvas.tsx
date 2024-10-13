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
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentRect, setCurrentRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [rectangles, setRectangles] = useState<
    Array<{ x: number; y: number; width: number; height: number }>
  >([]);

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

  const startDrawing = (event: MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setLastPosition({ x, y });
    setIsDrawing(true);
  };

  const drawLine = (event: MouseEvent) => {
    if (!isDrawing || !lastPosition || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();

    setLastPosition({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  const startRectangle = (event: MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCurrentRect({ x, y, width: 0, height: 0 });
    setIsDrawing(true);
  };

  const drawRectangle = (event: MouseEvent) => {
    if (!isDrawing || !currentRect || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const width = x - currentRect.x;
    const height = y - currentRect.y;

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    rectangles.forEach((r) => {
      ctx.fillStyle = "yellow";
      ctx.fillRect(r.x, r.y, r.width, r.height);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeRect(r.x, r.y, r.width, r.height);
    });

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.strokeRect(currentRect.x, currentRect.y, width, height);

    setCurrentRect((prevRect) =>
      prevRect ? { ...prevRect, width, height } : null
    );
  };

  const stopRectangle = () => {
    if (currentRect) {
      const finishedRect = { ...currentRect };
      setRectangles((prev) => [...prev, finishedRect]);

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "yellow";
          ctx.fillRect(
            finishedRect.x,
            finishedRect.y,
            finishedRect.width,
            finishedRect.height
          );
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            finishedRect.x,
            finishedRect.y,
            finishedRect.width,
            finishedRect.height
          );
        }
      }
    }

    setIsDrawing(false);
    setCurrentRect(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && currentTab === "dot") {
      canvas.addEventListener("mousedown", drawDot);
    }

    return () => {
      if (canvas && currentTab === "dot") {
        canvas.removeEventListener("mousedown", drawDot);
      }
    };
  }, [currentTab]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && currentTab === "line") {
      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", drawLine);
      canvas.addEventListener("mouseup", stopDrawing);
      canvas.addEventListener("mouseleave", stopDrawing);
    }

    return () => {
      if (canvas && currentTab === "line") {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", drawLine);
        canvas.removeEventListener("mouseup", stopDrawing);
        canvas.removeEventListener("mouseleave", stopDrawing);
      }
    };
  }, [currentTab, isDrawing, lastPosition]);

  // Effect for Rectangle
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && currentTab === "rectangle") {
      canvas.addEventListener("mousedown", startRectangle);
      canvas.addEventListener("mousemove", drawRectangle);
      canvas.addEventListener("mouseup", stopRectangle);
      canvas.addEventListener("mouseleave", stopRectangle);
    }

    return () => {
      if (canvas && currentTab === "rectangle") {
        canvas.removeEventListener("mousedown", startRectangle);
        canvas.removeEventListener("mousemove", drawRectangle);
        canvas.removeEventListener("mouseup", stopRectangle);
        canvas.removeEventListener("mouseleave", stopRectangle);
      }
    };
  }, [currentTab, isDrawing, currentRect, rectangles]);

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
