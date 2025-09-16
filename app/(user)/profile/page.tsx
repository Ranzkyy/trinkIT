import React from "react";
import ProfileClient from "./profile-client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }
  return (
    <div>
      <ProfileClient session={session} />
    </div>
  );
};

export default ProfilePage;
