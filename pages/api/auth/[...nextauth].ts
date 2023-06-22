import { verifyPassword } from "@/helper/auth";
import { connectToDB } from "@/helper/db";
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const client = await connectToDB();
        const userCollection = client.db().collection("users");

        // check if user exists
        const user = await userCollection.findOne({
          email,
        });
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        // check password
        const isValid = await verifyPassword(password || "", user.password);
        if (!isValid) {
          client.close();
          throw new Error("Could not log you in !");
        }

        client.close();
        const authUser: User = {
          email: email,
          id: user._id.toString(),
        };

        return authUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};

export default NextAuth(authOptions);
