import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();

// Middleware
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";

    const token = authHeader.split(" ")[1];
    const decodedPayload = await verify(token, c.env.JWT_SECRET);
    console.log('decodedPayload : ', decodedPayload);

    if (!decodedPayload.id) {
        c.status(403);
        return c.json({ error: "unauthorized" });
    }
    c.set("userId", decodedPayload.id as string);
    await next();
});

blogRouter.post("/", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId')

    const { title, content, authorId } = await c.req.json()

    const response = await prisma.post.create({
        data: {
            title,
            content,
            authorId: userId
        }
    })

    console.log(response);
    return c.json({ id: response.id }, 200)

});

// We Need specific PostId and userId to update the post
blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId')
    const { id: postId, title, content } = await c.req.json()
    const response = await prisma.post.update({
        where: {
            id: postId,
            authorId: userId
        },
        data: {
            title,
            content
        }
    })
    console.log(response);

    return c.json({ message: `Blog updated for userId=${userId}` }, 200)
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.findMany();
    return c.json({ blog })

})

blogRouter.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const postId = c.req.param('id')
        const response = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })
        console.log(response);
        return c.json({ response }, 200)

    } catch (err) {
        c.status(411);
        console.log(err);
        return c.json({
            message: "Error while fetching blog post"
        })
    }

});



export { blogRouter };
