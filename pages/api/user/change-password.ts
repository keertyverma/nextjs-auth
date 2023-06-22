import { hashPassword, verifyPassword } from "@/helper/auth";
import { connectToDB } from "@/helper/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    // check if user is authenticated
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Not authenticated!" });
    }

    const userEmail = session.user?.email;
    const { oldPassword, newPassword } = req.body;

    const client = await connectToDB();
    const userCollection = client.db().collection("users");

    // find user with given email
    const user = await userCollection.findOne({ email: userEmail });
    if (!user) {
      client.close();
      return res.status(404).json({ message: "User not found" });
    }

    // verify user old password
    const currentPassword = user.password;
    const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);
    if (!passwordAreEqual) {
      client.close();
      return res.status(403).json({ message: "Invalid password." });
    }

    // update user password
    const hasedPassword = await hashPassword(newPassword);
    await userCollection.updateOne(
      { email: userEmail },
      {
        $set: {
          password: hasedPassword,
        },
      }
    );

    client.close();
    return res.status(200).json({ message: "Password updated!" });
  }
  return;
}

export default handler;
