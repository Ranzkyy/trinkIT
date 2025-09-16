"use client";

import React from "react";
import { signOut } from "../../auth/auth-actions";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { useClearSession, useInvalidateSession } from "@/hooks/use-session";

type Session = typeof auth.$Infer.Session;

const ProfileClient = ({ session }: { session: Session }) => {
  const router = useRouter();
  const clearSession = useClearSession();
  const invalidateSession = useInvalidateSession();

  const handleSignOut = async () => {
    // Clear cache terlebih dahulu
    clearSession();

    try {
      await signOut();
      router.push("/auth");
    } catch (error) {
      // Jika error, invalidate cache untuk sync ulang
      invalidateSession();
      console.error("Sign out error:", error);
    }
  };

  const user = session.user;
  return (
    <div>
      <h1 className="text-2xl font-bold">Profile Page</h1>
      <h1> hello {user.name} </h1>
      <p>Email: {user.email}</p>
      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={handleSignOut}
      >
        sign out
      </button>
    </div>
  );
};

export default ProfileClient;
