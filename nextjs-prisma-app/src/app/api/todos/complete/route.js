import { prisma } from "@/app/lib/prisma";

export async function POST(req) {

  const body = await req.json();

  // 1. Mark todo complete

  const todo = await prisma.todo.update({

    where: { id: body.id },

    data: {
      completed: true,
      completedBy: body.user,
      // completedAt: new Date()
    }

  });


  // 2. Keep only last 3 completed (delete rest)

  await prisma.todo.deleteMany({

    where: {

      completed: true,

      id: {

        notIn: (

          await prisma.todo.findMany({

            where: { completed: true },

            orderBy: { createdAt: "desc" },

            take: 3,

            select: { id: true }

          })

        ).map(t => t.id)

      }

    }

  });


  return Response.json(todo);

}