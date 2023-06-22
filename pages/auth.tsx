import AuthForm from "@/components/auth/AuthForm";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AuthPage = () => {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && session) {
      // navigate authenticate user to homepage
      router.push("/");
    }
  }, [status, session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return <AuthForm />;
};

export default AuthPage;
