import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  createPlace,
  deletePlace,
  getAllPlaces,
  getPlaceById,
  getPlacesbyUserId,
  updatePlace,
} from "../controllers/places-controller.ts";

const placeRouter = new Router();
placeRouter.get("/places", getAllPlaces)
  .get("/places/:pid", getPlaceById)
  .get("/places/user/:uid", getPlacesbyUserId)
  .post("/places", createPlace)
  .patch("/places/:pid", updatePlace)
  .delete("/places/:pid", deletePlace);
export default placeRouter;
