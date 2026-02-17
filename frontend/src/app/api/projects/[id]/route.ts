import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import getDb from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = await getDb();

  let project;
  try {
    project = await db.collection("projects").findOne({ _id: new ObjectId(id) });
  } catch {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const db = await getDb();

  let result;
  try {
    result = await db.collection("projects").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(body.title && { title: body.title }),
          ...(body.description !== undefined && { description: body.description }),
          ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
          ...(body.techStack && { techStack: body.techStack }),
          ...(body.githubUrl !== undefined && { githubUrl: body.githubUrl }),
          ...(body.liveUrl !== undefined && { liveUrl: body.liveUrl }),
        },
      },
      { returnDocument: "after" }
    );
  } catch {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = await getDb();

  let result;
  try {
    result = await db.collection("projects").deleteOne({ _id: new ObjectId(id) });
  } catch {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
