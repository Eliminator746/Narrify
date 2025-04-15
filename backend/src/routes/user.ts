import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from '@anish_kumar113/narrify-common'

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    };
}>();

// PrismaClient initialization inside route handler. We are creating new database connections on every request

userRouter.post("/signup", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        //Here c.env was giving error due to typescript so we have to specify in typescript that DATABASE_URL is string.
    }).$extends(withAccelerate());

    /*
        We don't get environment variable's access outside, why do we get it in c (context), the reason
        is that every route in hono might be deployed independently, and that is why we don't get access to our environment variable globally 
        
        and we have to do it everytime using c as at each endpoint which may be deployed at some random place independently, have to access the env variables for them, and gloal one do not work. So you have to do it everytime at each points.

    */
    const body = await c.req.json();
    const { email, password, name }=body

    const { success } = signupInput.safeParse(body);

    if (!success) {
        c.status(411);
        return c.json({
            message: "Incorrect Inputs",
        })
    }

    const doesUserExists = await prisma.user.findUnique({
        where: {
            email,
        }
    })

    if (doesUserExists)
        return c.json({ error: 'User already exists' }, 403);


    const user = await prisma.user.create({
        data: {
            email,
            password,
            name,
        },
    });


    return c.json({ email, name });

});

userRouter.post("/signin", async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json()
    const { email, password } = body

    const { success }= signinInput.safeParse(body)

    if (!success) {
        c.status(411);
        return c.json({
            message: "Incorrect Inputs",
        })
    }

    const validUser = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!validUser)
        return c.json({ error: 'User already exists' }, 403);

    const payload = { id: validUser.id }
    const secret = c.env.JWT_SECRET
    const token = await sign(payload, secret)

    return c.json({ email, token });

});

export { userRouter };


