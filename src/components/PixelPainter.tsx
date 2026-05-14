import { useEffect, useRef, useState } from "react";
import "./PixelPainter.css";

const SIZE = 64;

type Pixel = {
  value: number;
  filled: boolean;
};

const COLORS: Record<number, string> = {
  0: "#ffffff",
  1: "#ffd6e0",
  2: "#ff9eb5",
  3: "#ff6f91",
  4: "#f06292",
  5: "#c2185b",
};

function brightnessToNumber(b: number) {
  if (b > 220) return 0;
  if (b > 180) return 1;
  if (b > 140) return 2;
  if (b > 100) return 3;
  if (b > 60) return 4;
  return 5;
}

export default function PixelPainter() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [grid, setGrid] = useState<Pixel[][]>([]);
  const [selected, setSelected] = useState(1);

  const scaleRef = useRef(1);
  const panRef = useRef({ x: 0, y: 0 });

  // load image → convert to 64x64
  useEffect(() => {
    const img = new Image();
    img.src = "/motif.png";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = SIZE;
      canvas.height = SIZE;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, SIZE, SIZE);

      const data = ctx.getImageData(0, 0, SIZE, SIZE).data;

      const newGrid: Pixel[][] = [];

      for (let y = 0; y < SIZE; y++) {
        const row: Pixel[] = [];

        for (let x = 0; x < SIZE; x++) {
          const i = (y * SIZE + x) * 4;

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const brightness = (r + g + b) / 3;

          const value = brightnessToNumber(brightness);

          row.push({
            value,
            filled: value === 0,
          });
        }

        newGrid.push(row);
      }

      setGrid(newGrid);
    };
  }, []);

  // paint
  const paint = (x: number, y: number) => {
    setGrid(prev => {
      const copy = [...prev];
      const pixel = copy[y][x];

      if (pixel.value === selected) {
        pixel.filled = true;
      }

      return copy;
    });
  };

  // zoom + pan (touch / wheel)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      scaleRef.current += e.deltaY * -0.001;
      scaleRef.current = Math.min(Math.max(0.5, scaleRef.current), 3);

      el.style.transform = `
        scale(${scaleRef.current})
        translate(${panRef.current.x}px, ${panRef.current.y}px)
      `;
    };

    let isDown = false;
    let startX = 0;
    let startY = 0;

    const onDown = (e: PointerEvent) => {
      isDown = true;
      startX = e.clientX;
      startY = e.clientY;
    };

    const onMove = (e: PointerEvent) => {
      if (!isDown) return;

      panRef.current.x += (e.clientX - startX) * 0.5;
      panRef.current.y += (e.clientY - startY) * 0.5;

      startX = e.clientX;
      startY = e.clientY;

      el.style.transform = `
        scale(${scaleRef.current})
        translate(${panRef.current.x}px, ${panRef.current.y}px)
      `;
    };

    const onUp = () => {
      isDown = false;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div className="wrap">
      <h2>Paint by Numbers 💖</h2>

      {/* palette */}
      <div className="palette">
        {Object.entries(COLORS).map(([k, v]) => (
          <button
            key={k}
            className={`color ${selected === Number(k) ? "active" : ""}`}
            style={{ background: v }}
            onClick={() => setSelected(Number(k))}
          >
            {k}
          </button>
        ))}
      </div>

      {/* canvas */}
      <div className="viewport">
        <div className="canvas" ref={containerRef}>
          {grid.map((row, y) =>
            row.map((p, x) => (
              <div
                key={`${x}-${y}`}
                className="cell"
                onClick={() => paint(x, y)}
                style={{
                  background: p.filled
                    ? COLORS[p.value]
                    : "#fff",
                  color: p.value !== 0 ? "#d16a8a" : "transparent",
                }}
              >
                {!p.filled ? p.value : ""}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}