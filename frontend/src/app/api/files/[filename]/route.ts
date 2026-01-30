import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename;
  const uploadDir = process.env.LOCAL_UPLOAD_DIR;

  if (!uploadDir) {
    return new NextResponse('Server configuration error', { status: 500 });
  }

  // Prevent path traversal
  const filepath = path.join(uploadDir, filename);
  
  // Basic security check: ensure the resolved path starts with the uploadDir
  if (!filepath.startsWith(uploadDir)) {
      return new NextResponse('Invalid filename', { status: 400 });
  }

  if (!fs.existsSync(filepath)) {
     return new NextResponse('File not found', { status: 404 });
  }

  try {
    const fileBuffer = await readFile(filepath);

    // Determine content type based on extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';
    const mimeTypes: {[key: string]: string} = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.webp': 'image/webp',
        '.pdf': 'application/pdf',
        '.txt': 'text/plain',
    };

    if (mimeTypes[ext]) {
        contentType = mimeTypes[ext];
    }

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
      console.error("Error reading file:", error);
      return new NextResponse('Error reading file', { status: 500 });
  }
}
