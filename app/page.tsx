import Navbar from "../components/Navbar";
import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
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
        <div className="grid grid-cols-2 justify-items-center place-items-center border">
          <div>
            <Image
              src="/images/full.png"
              alt="Description"
              width={300}
              height={300}
              priority
            />
          </div>
          <div className="w-full text-start">
            <h1>kanan</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
