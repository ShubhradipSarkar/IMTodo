import {prisma} from "@/app/lib/prisma";

export async function GET() {

 const todos = await prisma.todo.findMany({
   orderBy: { createdAt: "asc" }
 });

 return Response.json(todos);

}

export async function POST(req) {

 const body = await req.json();
console.log(body);
 const todo = await prisma.todo.create({
   data: {
     text: body.text,
     createdBy: body.user
   }
 });

 return Response.json(todo);

}