import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Message } from "@/models/message";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get("limit") || "30", 10), 100);
  const cursor = searchParams.get("cursor");

  await connectToDatabase();

  const query = cursor ? { _id: { $lt: cursor } } : {};
  const docs = await Message.find(query)
    .sort({ _id: -1 })
    .limit(limit)
    .lean();

  const nextCursor = docs.length > 0 ? String(docs[docs.length - 1]._id) : null;

  return NextResponse.json({ messages: docs.reverse(), nextCursor });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.text !== "string" || !body.text.trim()) {
    return NextResponse.json({ error: "Invalid 'text'" }, { status: 400 });
  }

  const author = typeof body.author === "string" && body.author.trim() ? body.author.trim() : "Anonymous";
  const text = body.text.trim();

  await connectToDatabase();

  const created = await Message.create({ author, text });
  return NextResponse.json({ message: created }, { status: 201 });
}


