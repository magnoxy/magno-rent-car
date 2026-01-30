import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename to prevent overwrites
    // Clean the original filename to avoid path traversal or weird characters
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}-${originalName}`;
    
    const uploadDir = process.env.LOCAL_UPLOAD_DIR;
    
    if (!uploadDir) {
         console.error('LOCAL_UPLOAD_DIR is not defined in .env');
         return NextResponse.json({ success: false, message: 'Upload directory not configured' }, { status: 500 });
    }

    // Ensure directory exists
    if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);
    
    // Return the URL that can be used to access this file via our other API route
    // The backend might expect a full URL or just the path. 
    // Based on user request "mandamos somente os links para o backend salvar"
    // We will send the relative URL that the frontend can use to display it.
    const fileUrl = `/api/files/${filename}`;
    
    return NextResponse.json({ success: true, url: fileUrl, filename: filename });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
