import Navbar from "../components/Navbar";
import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

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
            <h1 className="text-9xl font-bold">
              Trink<span className="text-green-500">IT</span>
            </h1>
            <p className="text-lg text-gray-600 my-2">
              Smooth, delightful, and refreshing drinks at your fingertips.
            </p>
            <Link
              href="/menu"
              className="bg-green-500 text-white my-2 py-2 px-4 rounded"
            >
              GET YOUT DRINK NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
