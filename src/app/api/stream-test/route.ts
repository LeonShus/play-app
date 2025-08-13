import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = ["Row 1", "Row 2", "Row 3", "Row 4", "Row 5", "Row 6"];
  let count = 0;

  const stream = new ReadableStream({
    start(controller) {
      function pushChunk() {
        if (count === data.length) {
          controller.close();
          return;
        }

        const encoder = new TextEncoder();

        const chunk = encoder.encode(data[count]);

        controller.enqueue(chunk);

        count++;

        setTimeout(pushChunk, 1000);
      }
      pushChunk();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "application/octet-stream",
      // Кладем размер файла
      "Content-Length": String(data.join("").length),
      "Content-Disposition": 'attachment; filename="speedtest.bin"',
    },
  });
}
