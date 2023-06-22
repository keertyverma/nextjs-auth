import { useRouter } from "next/router";
import React, { useRef } from "react";
import classes from "./ProfileForm.module.css";

interface Props {
  onChangePassword: (oldPassword: string, newPassword: string) => void;
}

const ProfileForm = ({ onChangePassword }: Props) => {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const oldPassword = oldPasswordRef.current?.value || "";
    const newPassword = newPasswordRef.current?.value || "";

    try {
      await onChangePassword(oldPassword, newPassword);
      // navigate user to homepage
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
