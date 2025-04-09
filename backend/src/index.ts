import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


const app = new Hono();



export interface Env {
  DATABASE_URL: string;
}

export default {
  async fetch(request, env, ctx) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    const users = await prisma.user.findMany();
    const result = JSON.stringify(users);
    return new Response(result);
  },
} satisfies ExportedHandler<Env>;





app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)


export {app};
