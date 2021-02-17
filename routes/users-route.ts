import { Router } from "https://deno.land/x/oak/mod.ts";
import { getUsers, login } from "../controllers/users-controller.ts";

const userRouter = new Router();
userRouter.get("/users", getUsers)
  .post("/login", login);

export default userRouter;
