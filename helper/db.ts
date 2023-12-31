import { MongoClient } from "mongodb";

export async function connectToDB() {
  return await MongoClient.connect(process.env.NEXT_MONGODB_URI || "");
}
