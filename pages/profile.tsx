import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

import UserProfile from "@/components/profile/UserProfile";

const profile = () => {
  return <UserProfile />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default profile;
