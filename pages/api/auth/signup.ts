import { hashPassword } from "@/helper/auth";
import { connectToDB } from "@/helper/db";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // validate input
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      return res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters.",
      });
    }

    let client, db;
    try {
      client = await connectToDB();
      db = client.db();
    } catch (err) {
      return res.status(500).json({ message: "Could not connect to db!" });
    }

    // check if user exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      client.close();
      return res.status(422).json({ message: "User already registed!!" });
    }

    // create new user
    try {
      const hashedPassword = await hashPassword(password);
      const result = await db
        .collection("users")
        .insertOne({ email, hashedPassword });
      console.log("result = ", result);

      return res.status(201).json({ message: "User is created" });
    } catch (err) {
      return res.status(500).json({ message: "Failed to create user" });
    } finally {
      client.close();
    }
  }
}

export default handler;
