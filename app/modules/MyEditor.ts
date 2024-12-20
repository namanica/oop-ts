/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class Shape {
  protected color: string;
  constructor(color: string) {
    this.color = color;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract drawPreview(ctx: CanvasRenderingContext2D): void;
}

export class Dot extends Shape {
  protected x: number;
  protected y: number;

  constructor(x: number, y: number, color: string = "blue") {
    super(color);
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
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
    color: string = "blue"
  ) {
    super(color);
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
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "black";
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
    color: string = "yellow"
  ) {
    super(color);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.setLineDash([]);
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "black";
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
    color: string = "grey"
  ) {
    super(color);
    this.x = x;
    this.y = y;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.setLineDash([]);
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, Math.PI * 2);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "black";
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
    color: string = "blue"
  ) {
    super(startX, startY, endX, endY, color);
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
    this.drawCircle(ctx, this.startX, this.startY, this.radius, this.color);
    this.drawCircle(ctx, this.endX, this.endY, this.radius, this.color);
  }

  drawPreview(ctx: CanvasRenderingContext2D): void {
    super.drawPreview(ctx);
    this.drawCircle(ctx, this.startX, this.startY, this.radius, "black");
    this.drawCircle(ctx, this.endX, this.endY, this.radius, "black");
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
      color: string = "black"
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
    color: string = "transparent"
  ) {
    super(x, y, width, height, color);
    this.depth = depth;
  }

  drawSides(ctx: CanvasRenderingContext2D): void {
    const backX = this.x + this.depth;
    const backY = this.y + this.depth;

    ctx.strokeStyle = "black";
    ctx.strokeRect(backX, backY, this.width, this.height);

    this.drawLine(ctx, this.x, this.y, backX, backY);
    this.drawLine(ctx, this.x + this.width, this.y, backX + this.width, backY);
    this.drawLine(
      ctx,
      this.x,
      this.y + this.height,
      backX,
      backY + this.height
    );
    this.drawLine(
      ctx,
      this.x + this.width,
      this.y + this.height,
      backX + this.width,
      backY + this.height
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
