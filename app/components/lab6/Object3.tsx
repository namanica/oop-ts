import { useEffect, useState } from "react";
import { readText } from "@tauri-apps/api/clipboard";

export const Object3 = () => {
  const [sortedNumbers, setSortedNumbers] = useState<number[]>([]);

  const fetchFromClipboard = async () => {
    try {
      const text = await readText();
      if (text) {
        const numbers = text
          .split(",")
          .map((num) => parseFloat(num.trim()))
          .filter((num) => !isNaN(num));
        return numbers;
      }
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchFromClipboard().then((numbers) => {
        const sorted = [...numbers].sort((a, b) => a - b);
        setSortedNumbers(sorted);
      });
    });

    return () => clearInterval(interval);
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
        Відсортовані числа
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          margin: 20,
        }}
      >
        {sortedNumbers.map((num, index) => (
          <div key={index}>{num}</div>
        ))}
      </div>
    </div>
  );
};
