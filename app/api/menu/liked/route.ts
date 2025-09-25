import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's liked menu IDs
    const userLikes = await prisma.userMenuLike.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        menuId: true,
      },
    });

    const likedMenuIds = userLikes.map((like) => like.menuId);

    return NextResponse.json({
      success: true,
      likedMenuIds,
    });
  } catch (error) {
    console.error("Get liked menus error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
