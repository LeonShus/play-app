"use client";

import { Text } from "@/components/Text";
import { Box, Button, LinearProgress, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { StyledProgressWrapper } from "./styled";
import { biteToMb } from "./utils";

const TEST_SIZE = 40;

export const SpeedTest = () => {
  const [downloadSpeed, setDownloadSpeed] = useState<number | null>(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isTesting, setIsTesting] = useState(false);
  const [fileSize] = useState(biteToMb(TEST_SIZE)); // 20MB
  const startTimeRef = useRef<number>(0);
  const loadedRef = useRef<number>(0);

  const downloadSize = ((fileSize * progressPercent) / biteToMb(100)).toFixed(
    2
  );


  const testDownloadSpeed = async ({ signal }: { signal: AbortSignal }) => {
    setIsTesting(true);
    setDownloadSpeed(0);
    setProgressPercent(0);
    loadedRef.current = 0;
    startTimeRef.current = performance.now();

    try {
      const response = await fetch(`/api/download-test?size=${fileSize}`, {
        signal,
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();

      // Размер файла в байтах
      const contentLength = parseInt(
        response.headers.get("Content-Length") || "0"
      );

      // Для расчета скорости

      let lastMeasuredTime = startTimeRef.current;
      let lastMeasuredLoaded = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Сетаем размер в байтах
        loadedRef.current += value?.length || 0;
        const currentProgress = (loadedRef.current / contentLength) * 100;
        setProgressPercent(currentProgress);

        // Расчет текущей скорости (каждые 500ms)
        const now = performance.now();
        if (now - lastMeasuredTime >= 400) {
          const chunkTime = (now - lastMeasuredTime) / 1000; // в секундах
          const chunkLoaded = (loadedRef.current - lastMeasuredLoaded) * 8; // в битах
          const currentSpeed = chunkLoaded / biteToMb(chunkTime); // Mbps

          setDownloadSpeed(parseFloat(currentSpeed.toFixed(2)));

          lastMeasuredTime = now;
          lastMeasuredLoaded = loadedRef.current;
        }
      }

      // // Финальный расчет средней скорости
      // // Отрабатывает когда скорость большая
      const totalTime = (performance.now() - startTimeRef.current) / 1000;

      const averageSpeed = (contentLength * 8) / biteToMb(totalTime);
      setDownloadSpeed(parseFloat(averageSpeed.toFixed(2)));
    } catch {
      //   console.error("Speed test failed:", error);
    } finally {
      setIsTesting(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    if (isTesting) {
      testDownloadSpeed({ signal: controller.signal });
    }

    return () => {
      controller.abort();
    };
  }, [isTesting]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: "column",

          gap: "20px",

          alignItems: "center",
          padding: "30px",

          maxWidth: "340px",
          width: "100%",
        }}
      >
        <Text text={"Speed test"} size={24} weight={500} />

        <div>
          <Text text={downloadSpeed + " Mbps"} size={34} />
        </div>

        <StyledProgressWrapper>
          <Text
            className="progress_text"
            text={progressPercent.toFixed(2) + "%"}
          />

          <LinearProgress
            variant="determinate"
            sx={{ width: "100%", height: "24px" }}
            value={progressPercent}
          />
        </StyledProgressWrapper>

        <div className="flex gap-2">
          <Text text={`${downloadSize} of ${TEST_SIZE} Mb`} />
        </div>

        <div className="flex gap-2">
          {Boolean(progressPercent) && isTesting && (
            <Button
              variant="contained"
              onClick={() => {
                setIsTesting(false);
              }}
            >
              Stop
            </Button>
          )}

          {!isTesting && (
            <Button
              disabled={!Boolean(progressPercent)}
              variant="contained"
              onClick={() => {
                setProgressPercent(0);
                setDownloadSpeed(0);
              }}
            >
              Clear
            </Button>
          )}

          <Button
            variant="contained"
            onClick={() => {
              setIsTesting(true);
            }}
          >
            Start
          </Button>
        </div>
      </Paper>
    </Box>
  );
};
