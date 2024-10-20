import React, { useEffect, useRef, useState } from "react";
import { Menu, MenuProps } from "antd";
import { Dot, Ellipse, Line, Rectangle, Shape } from "@/app/modules/Shape";
import { items } from "./constants";

export const Lab2: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [currentTab, setCurrentTab] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [previewShape, setPreviewShape] = useState<Shape | null>(null);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrentTab(e.key);
  };

  const drawShape = (event: MouseEvent, preview = false) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    let newShape: Shape | null = null;

    switch (currentTab) {
      case "dot":
        newShape = new Dot(x, y);
        break;
      case "line":
        if (lastPosition) {
          newShape = new Line(lastPosition.x, lastPosition.y, x, y);
        }
        break;
      case "rectangle":
        if (lastPosition) {
          const width = x - lastPosition.x;
          const height = y - lastPosition.y;
          newShape = new Rectangle(
            lastPosition.x,
            lastPosition.y,
            width,
            height
          );
        }
        break;
      case "ellipse":
        if (lastPosition) {
          const radiusX = Math.abs(x - lastPosition.x);
          const radiusY = Math.abs(y - lastPosition.y);
          newShape = new Ellipse(
            lastPosition.x,
            lastPosition.y,
            radiusX,
            radiusY
          );
        }
        break;
    }

    if (preview && newShape) {
      setPreviewShape(newShape);
    } else if (newShape) {
      setShapes((prev) => [...prev, newShape]);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        shapes.forEach((shape) => shape.draw(ctx));

        if (previewShape) {
          previewShape.draw(ctx);
        }
      }
    }
  }, [shapes, previewShape]);

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
    setPreviewShape(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const mouseDownHandler = (event: MouseEvent) => {
      startDrawing(event);
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      if (isDrawing) {
        drawShape(event, true);
      }
    };

    const mouseUpHandler = (event: MouseEvent) => {
      if (isDrawing) {
        drawShape(event);
        stopDrawing();
      }
    };

    if (canvas) {
      canvas.addEventListener("mousedown", mouseDownHandler);
      canvas.addEventListener("mousemove", mouseMoveHandler);
      canvas.addEventListener("mouseup", mouseUpHandler);
      canvas.addEventListener("mouseleave", stopDrawing);

      return () => {
        canvas.removeEventListener("mousedown", mouseDownHandler);
        canvas.removeEventListener("mousemove", mouseMoveHandler);
        canvas.removeEventListener("mouseup", mouseUpHandler);
        canvas.removeEventListener("mouseleave", stopDrawing);
      };
    }
  }, [isDrawing]);

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
        style={{ margin: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}
        width={700}
        height={400}
      />
    </div>
  );
};
