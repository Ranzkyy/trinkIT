import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Home() {
  const dbpass = "ranzkyy1464";
  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="w-10/12">
        <Navbar />
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
