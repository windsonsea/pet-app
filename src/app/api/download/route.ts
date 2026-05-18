import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  const file = readFileSync(join(process.cwd(), "..", "..", "pet-app.tar.gz"));
  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/gzip",
      "Content-Disposition": 'attachment; filename="pet-app.tar.gz"',
    },
  });
}
