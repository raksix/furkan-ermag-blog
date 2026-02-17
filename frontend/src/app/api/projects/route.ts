import { NextRequest, NextResponse } from "next/server";
import getDb from "@/lib/db";

export async function GET() {
  const db = await getDb();
  const projects = await db.collection("projects").find().toArray();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const db = await getDb();

  const doc = {
    title: body.title,
    description: body.description || "",
    imageUrl: body.imageUrl || "",
    techStack: body.techStack || [],
    githubUrl: body.githubUrl || "",
    liveUrl: body.liveUrl || "",
  };

  const result = await db.collection("projects").insertOne(doc);
  const project = await db.collection("projects").findOne({ _id: result.insertedId });

  return NextResponse.json(project, { status: 201 });
}
