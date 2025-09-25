import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { menuId } = await req.json();

    if (!menuId) {
      return NextResponse.json(
        { error: "Menu ID is required" },
        { status: 400 }
      );
    }

    // Check if user already liked this menu
    const existingLike = await prisma.userMenuLike.findUnique({
      where: {
        userId_menuId: {
          userId: session.user.id,
          menuId: menuId,
        },
      },
    });

    if (existingLike) {
      // Unlike: Delete the like
      await prisma.userMenuLike.delete({
        where: {
          id: existingLike.id,
        },
      });

      return NextResponse.json({
        success: true,
        isLiked: false,
        message: "Menu unliked",
      });
    } else {
      // Like: Create new like
      await prisma.userMenuLike.create({
        data: {
          userId: session.user.id,
          menuId: menuId,
        },
      });

      return NextResponse.json({
        success: true,
        isLiked: true,
        message: "Menu liked",
      });
    }
  } catch (error) {
    console.error("Like/Unlike error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
