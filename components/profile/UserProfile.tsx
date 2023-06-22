import React, { useEffect } from "react";
import classes from "./UserProfile.module.css";
import ProfileForm from "./ProfileForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const UserProfile = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/auth");
    }
  }, [status]);

  if (status === "loading") {
    return <p className={classes.profile}>Loading...</p>;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
