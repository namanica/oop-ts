import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { GenerationParams } from "./Lab6";
import { writeText } from "@tauri-apps/api/clipboard";

export const Object2 = () => {
  const [numbers, setNumbers] = useState<number[]>([]);

  const copyToClipboard = async (numbers: number[]) => {
    const text = numbers.join(", ");
    await writeText(text);
  };

  useEffect(() => {
    const unlisten = listen<GenerationParams>(
      "start-generation",
      ({ payload }) => {
        const { n, min, max } = payload;
        const generatedNumbers = Array.from({ length: n }, () =>
          parseFloat((Math.random() * (max - min) + min).toFixed(5))
        );

        setNumbers(generatedNumbers);
        copyToClipboard(generatedNumbers);
      }
    );

    return () => {
      unlisten.then((off) => off());
    };
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          color: "#1677ff",
          margin: 20,
        }}
      >
        Згенеровані числа
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          margin: 20,
        }}
      >
        {numbers.map((num, index) => (
          <div key={index}>{num}</div>
        ))}
      </div>
    </div>
  );
};
