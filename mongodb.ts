// 
import { MongoClient } from "https://deno.land/x/mongo@v0.12.1/mod.ts";

const MONGO_URL = "mongodb+srv://quangdoan:gSV3Ht2eqfTZEzsH@cluster0.f6mbk.mongodb.net/my_deno?retryWrites=true&w=majority";
const client = new MongoClient();
client.connectWithUri(MONGO_URL);

const db = client.database('places');

export default db;