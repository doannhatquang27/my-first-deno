import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from "../mongodb.ts";

const placesCollection = db.collection("places");

interface IPlace {
  _id: { $oid: string };
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  creator: string;
}

const getAllPlaces = async (ctx: RouterContext) => {
  const places = await placesCollection.find();
  ctx.response.body = places;
};

const getPlaceById = async (ctx: RouterContext) => {
  const placeId = ctx.params.pid;
  const place = await placesCollection.findOne({ _id: { $oid: placeId } });
  ctx.response.body = place;
};

const getPlacesbyUserId = async (ctx: RouterContext) => {
  const userId = ctx.params.uid;
  const places = await placesCollection.find({ creator: userId });
  ctx.response.body = places;
};

const createPlace = async (ctx: RouterContext) => {
  const { value } = ctx.request.body();
  const createdPlace: IPlace = await value;

  const id = await placesCollection.insertOne(createdPlace);
  createdPlace._id = id;

  ctx.response.status = 201;
  ctx.response.body = createdPlace;
};

const updatePlace = async (ctx: RouterContext) => {
  const id = ctx.params.pid;
  const { value } = ctx.request.body();
  
  const { title, description } = await value;
  const { modifiedCount } = await placesCollection.updateOne(
    { _id: { $oid: id } },
    {
      $set: {
        title,
        description
      },
    },
  );

  if (!modifiedCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Place does not exist" };
  }

  ctx.response.body = await placesCollection.findOne({ _id: { $oid: id } });
};

const deletePlace = async (ctx: RouterContext) => {
  const id = ctx.params.pid;
  const count = await placesCollection.deleteOne({ _id: { $oid: id } });
  if (!count) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Place does not exist" };
  }

  ctx.response.status = 204;
};

export {
  createPlace,
  getAllPlaces,
  getPlaceById,
  getPlacesbyUserId,
  updatePlace,
  deletePlace,
};
