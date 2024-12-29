/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class Shape {
  protected fillColor: string;
  protected strokeColor: string;

  constructor(
    fillColor: string = "transparent",
    strokeColor: string = "black"
  ) {
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract drawPreview(ctx: CanvasRenderingContext2D): void;

  highlight(strokeColor: string): void {
    this.strokeColor = strokeColor;
  }
}

export class Dot extends Shape {
  protected x: number;
  protected y: number;

  constructor(
    x: number,
    y: number,
    fillColor: string = "transparent",
    strokeColor: string = "black"
  ) {
    super(fillColor, strokeColor);
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = this.strokeColor;
    ctx.fill();
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    this.draw(ctx);
  }
}

export class Line extends Shape {
  protected startX: number;
  protected startY: number;
  protected endX: number;
  protected endY: number;

  constructor(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    fillColor: string = "transparent",
    strokeColor: string = "black"
  ) {
    super(fillColor, strokeColor);
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.setLineDash([]);
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

export class Rectangle extends Shape {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: string = "yellow",
    strokeColor: string = "black"
  ) {
    super(fillColor, strokeColor);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.setLineDash([]);
    ctx.strokeStyle = this.strokeColor;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = this.strokeColor;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

export class Ellipse extends Shape {
  protected x: number;
  protected y: number;
  protected radiusX: number;
  protected radiusY: number;

  constructor(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    fillColor: string = "grey",
    strokeColor: string = "black"
  ) {
    super(fillColor, strokeColor);
    this.x = x;
    this.y = y;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.fillColor;
    ctx.fill();
    ctx.setLineDash([]);
    ctx.strokeStyle = this.strokeColor;
    ctx.stroke();
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = this.strokeColor;
    ctx.stroke();
  }
}

interface Circle {
  drawCircle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
  ): void;
}

export class LineWithCircles extends Line implements Circle {
  private radius: number;

  constructor(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    radius: number = 5,
    fillColor: string = "black",
    strokeColor: string = "black"
  ) {
    super(startX, startY, endX, endY, fillColor, strokeColor);
    this.radius = radius;
  }

  drawCircle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
  ): void {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    this.drawCircle(
      ctx,
      this.startX,
      this.startY,
      this.radius,
      this.strokeColor
    );
    this.drawCircle(ctx, this.endX, this.endY, this.radius, this.strokeColor);
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    super.drawPreview(ctx);
    this.drawCircle(ctx, this.startX, this.startY, this.radius, this.fillColor);
    this.drawCircle(ctx, this.endX, this.endY, this.radius, this.fillColor);
  }
}

type Constructor<T = object> = new (...args: any[]) => T;

function LineMixin<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    drawLine(
      ctx: CanvasRenderingContext2D,
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      color: string
    ) {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = color;
      ctx.stroke();
    }
  };
}

export class Cube extends LineMixin(Rectangle) {
  private depth: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    depth: number = 30,
    fillColor: string = "transparent",
    strokeColor: string = "black"
  ) {
    super(x, y, width, height, fillColor, strokeColor);
    this.depth = depth;
  }

  drawSides(ctx: CanvasRenderingContext2D): void {
    const backX = this.x + this.depth;
    const backY = this.y + this.depth;

    ctx.strokeStyle = this.strokeColor;
    ctx.strokeRect(backX, backY, this.width, this.height);

    this.drawLine(ctx, this.x, this.y, backX, backY, this.strokeColor);
    this.drawLine(
      ctx,
      this.x + this.width,
      this.y,
      backX + this.width,
      backY,
      this.strokeColor
    );
    this.drawLine(
      ctx,
      this.x,
      this.y + this.height,
      backX,
      backY + this.height,
      this.strokeColor
    );
    this.drawLine(
      ctx,
      this.x + this.width,
      this.y + this.height,
      backX + this.width,
      backY + this.height,
      this.strokeColor
    );
  }

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    this.drawSides(ctx);
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    super.drawPreview(ctx);
    this.drawSides(ctx);
  }
}
