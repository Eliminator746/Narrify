import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/signup", (c) => {
  return c.status(200).json({
    message: "Signup Successful",
  });
});

app.post("/signin", (c) => {
  return c.status(200).json({
    message: "Signin Successful",
  });
});
export default app;
