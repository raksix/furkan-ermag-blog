import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const db = await getDb();
  const post = await db.collection("blog_posts").findOne({ slug });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const body = await req.json();
  const db = await getDb();

  const result = await db.collection("blog_posts").findOneAndUpdate(
    { slug },
    {
      $set: {
        ...(body.title && { title: body.title }),
        ...(body.slug && { slug: body.slug }),
        ...(body.summary !== undefined && { summary: body.summary }),
        ...(body.content !== undefined && { content: body.content }),
        ...(body.coverImage !== undefined && { coverImage: body.coverImage }),
        ...(body.tags && { tags: body.tags }),
        updatedAt: new Date().toISOString(),
      },
    },
    { returnDocument: "after" }
  );

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const db = await getDb();

  const result = await db.collection("blog_posts").deleteOne({ slug });
  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
