import { Menu, MenuProps } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { items } from "./constants";

export const Lab2: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentTab, setCurrentTab] = useState("");
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrentTab(e.key);
  };

  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const startDrawing = (event: MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setLastPosition({ x, y });
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPosition(null);
  };

  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);
  const [lines, setLines] = useState<
    { startX: number; startY: number; endX: number; endY: number }[]
  >([]);
  const [rectangles, setRectangles] = useState<
    Array<{ x: number; y: number; width: number; height: number }>
  >([]);
  const [currentRect, setCurrentRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [ellipses, setEllipses] = useState<
    Array<{ x: number; y: number; radiusX: number; radiusY: number }>
  >([]);
  const [currentEllipse, setCurrentEllipse] = useState<{
    x: number;
    y: number;
    radiusX: number;
    radiusY: number;
  } | null>(null);

  const drawDot = (event: MouseEvent) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setDots((prevDots) => [...prevDots, { x, y }]);
      }
    }
  };

  const drawLine = (event: MouseEvent) => {
    if (!isDrawing || !lastPosition || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setLines((prevLines) => [
      ...prevLines,
      { startX: lastPosition.x, startY: lastPosition.y, endX: x, endY: y },
    ]);

    setLastPosition({ x, y });
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

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const width = x - currentRect.x;
    const height = y - currentRect.y;

    setCurrentRect((prevRect) =>
      prevRect ? { ...prevRect, width, height } : null
    );
  };

  const stopRectangle = () => {
    if (currentRect) {
      const finishedRect = { ...currentRect };
      setRectangles((prev) => [...prev, finishedRect]);
    }

    setIsDrawing(false);
    setCurrentRect(null);
  };

  const startEllipse = (event: MouseEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCurrentEllipse({ x, y, radiusX: 0, radiusY: 0 });
    setIsDrawing(true);
  };

  const drawEllipse = (event: MouseEvent) => {
    if (!isDrawing || !currentEllipse || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const radiusX = Math.abs(x - currentEllipse.x);
    const radiusY = Math.abs(y - currentEllipse.y);

    setCurrentEllipse((prevEllipse) =>
      prevEllipse ? { ...prevEllipse, radiusX, radiusY } : null
    );
  };

  const stopEllipse = () => {
    if (currentEllipse) {
      const finishedEllipse = { ...currentEllipse };
      setEllipses((prev) => [...prev, finishedEllipse]);
    }

    setIsDrawing(false);
    setCurrentEllipse(null);
  };

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        dots.forEach(({ x, y }) => {
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "blue";
          ctx.fill();
        });

        lines.forEach(({ startX, startY, endX, endY }) => {
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          ctx.stroke();
        });

        rectangles.forEach((r) => {
          ctx.beginPath();
          ctx.fillStyle = "yellow";
          ctx.fillRect(r.x, r.y, r.width, r.height);
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.strokeRect(r.x, r.y, r.width, r.height);
        });

        if (currentRect) {
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            currentRect.x,
            currentRect.y,
            currentRect.width,
            currentRect.height
          );
        }

        ellipses.forEach((e) => {
          ctx.beginPath();
          ctx.ellipse(e.x, e.y, e.radiusX, e.radiusY, 0, 0, Math.PI * 2);
          ctx.fillStyle = "grey";
          ctx.fill();
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2;
          ctx.stroke();
        });

        if (currentEllipse) {
          ctx.beginPath();
          ctx.ellipse(
            currentEllipse.x,
            currentEllipse.y,
            currentEllipse.radiusX,
            currentEllipse.radiusY,
            0,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }
  }, [dots, lines, rectangles, currentRect, ellipses, currentEllipse]);

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

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && currentTab === "ellipse") {
      canvas.addEventListener("mousedown", startEllipse);
      canvas.addEventListener("mousemove", drawEllipse);
      canvas.addEventListener("mouseup", stopEllipse);
      canvas.addEventListener("mouseleave", stopEllipse);
    }

    return () => {
      if (canvas && currentTab === "ellipse") {
        canvas.removeEventListener("mousedown", startEllipse);
        canvas.removeEventListener("mousemove", drawEllipse);
        canvas.removeEventListener("mouseup", stopEllipse);
        canvas.removeEventListener("mouseleave", stopEllipse);
      }
    };
  }, [currentTab, isDrawing, currentEllipse]);

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
        style={{ margin: "10px", boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}
        width={700}
        height={400}
      />
    </div>
  );
};
