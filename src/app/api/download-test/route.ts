import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // Размер в байтах
  const size = Number(searchParams.get("size"));

  // Создаем поток для чтения данных
  const stream = new ReadableStream({
    start(controller) {
      const chunkSize = 1024 * 1024; // 1MB chunks
      let sent = 0;

      const pushData = () => {
        if (sent >= size) {
          controller.close();
          return;
        }

        const chunk = Buffer.alloc(Math.min(chunkSize, size - sent));
        controller.enqueue(chunk);
        sent += chunk.length;

        // Имитация задержки для более плавного прогресса
        setTimeout(pushData, 10);
      };

      pushData();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "application/octet-stream",
      // Кладем размер файла
      "Content-Length": size.toString(),
      "Content-Disposition": 'attachment; filename="speedtest.bin"',
    },
  });
}
