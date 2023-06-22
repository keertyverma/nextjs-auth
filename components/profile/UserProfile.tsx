import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
  const handleChangePassword = async (
    oldPassword: string,
    newPassword: string
  ) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
  };

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={handleChangePassword} />
    </section>
  );
};

export default UserProfile;
