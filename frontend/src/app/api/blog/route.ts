import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET() {
  const db = await getDb();
  const posts = await db
    .collection("blog_posts")
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const db = await getDb();

  const doc = {
    title: body.title,
    slug: body.slug,
    summary: body.summary || "",
    content: body.content || "",
    coverImage: body.coverImage || "",
    tags: body.tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const result = await db.collection("blog_posts").insertOne(doc);
  const post = await db.collection("blog_posts").findOne({ _id: result.insertedId });

  return NextResponse.json(post, { status: 201 });
}
