"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

function Navbar({ session }: { session: Session | null }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Cart", href: "/cart" },
  ];

  const activeMenu =
    menuItems.find((item) => item.href === pathname)?.name || "Home";

  return (
    // Navbar container
    <div className="flex justify-center">
      <div className="w-full">
        <nav className="my-5 rounded-lg shadow-lg p-4 flex justify-between">
          <div className="font-bold text-xl">
            Trink<span className="text-green-600">IT</span>
          </div>
          <div className="space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative transition-all ease-in-out px-3 py-1 rounded 
                  ${
                    pathname === item.href
                      ? "text-green-600 font-semibold bg-green-100"
                      : "text-gray-600 hover:text-green-600 hover:bg-gray-100"
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              key={session ? "Profile" : "Sign In"}
              href={session ? "/profile" : "/auth"}
              className={`relative transition-all ease-in-out px-3 py-1 rounded 
                ${
                  pathname === (session ? "/profile" : "/auth")
                    ? "text-green-600 font-semibold bg-green-100"
                    : "text-gray-600 hover:text-green-600 hover:bg-gray-100"
                }`}
            >
              {session ? "Profile" : "Sign In"}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
