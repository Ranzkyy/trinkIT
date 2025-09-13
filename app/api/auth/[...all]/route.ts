import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

// Handler BetterAuth default
export const { GET } = toNextJsHandler(auth);

// Custom sign in handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Contoh: ambil email & password dari body
    const { email, password } = body;

    // TODO: Integrasi validasi user, misal ke database atau BetterAuth
    // Contoh validasi sederhana
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Di sini kamu bisa panggil fungsi BetterAuth atau custom logic
    // Misal: auth.emailAndPassword.signIn({ email, password })
    // Untuk demo, kita return sukses
    return NextResponse.json({ message: "Sign in berhasil", email });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan sign in" },
      { status: 500 }
    );
  }
}
