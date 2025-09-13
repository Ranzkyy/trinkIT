import React from "react";
import Navbar from "../../components/Navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="w-10/12">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
