import React from "react";
import Navbar from "../../components/Navbar";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="w-10/12">
        <Navbar session={session} />
        {children}
      </div>
    </div>
  );
}
