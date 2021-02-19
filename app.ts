import { Application } from "https://deno.land/x/oak/mod.ts";
import userRouter from "./routes/users-route.ts";
import placeRouter from "./routes/places-route.ts";

const env = Deno.env.toObject();
const HOST = env.HOST || "127.0.0.1";
const PORT = env.POST || "8080";

const app = new Application();

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(placeRouter.routes());
app.use(placeRouter.allowedMethods());

console.log(`Listening on port ${PORT}`);
await app.listen(`${HOST}:${PORT}`); 

//deno run --allow-env --allow-net --allow-write --allow-read --allow-plugin --unstable app.ts