import React from "react";
import classes from "./UserProfile.module.css";
import ProfileForm from "./ProfileForm";

const UserProfile = () => {
  // Redirect away if NOT auth

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
