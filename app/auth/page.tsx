import React from "react";
import AuthClient from "./auth-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <AuthClient />
    </div>
  );
};

export default LoginPage;
