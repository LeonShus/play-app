"use client";

import { Button } from "@mui/material";
import { useState } from "react";

export const StreamTest = () => {
  const [items, setItems] = useState<string[]>([]);

  const getItems = async () => {
    try {
      const response = await fetch("api/stream-test");

      const reader = response.body?.getReader();

      const decoder = new TextDecoder();

      while (true) {
        const readData = await reader?.read();

        if (readData?.done) {
          break;
        }

        if (readData?.value) {
          const text = decoder.decode(readData.value);

          setItems((e) => {
            return [...e, text];
          });
        }
      }
    } catch {}
  };

  return (
    <div>
      {items.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      <Button onClick={getItems}>Get items</Button>
    </div>
  );
};
