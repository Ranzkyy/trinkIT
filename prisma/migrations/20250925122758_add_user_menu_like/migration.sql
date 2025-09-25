-- CreateTable
CREATE TABLE "public"."user_menu_like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "menuId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_menu_like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_menu_like_userId_menuId_key" ON "public"."user_menu_like"("userId", "menuId");

-- AddForeignKey
ALTER TABLE "public"."user_menu_like" ADD CONSTRAINT "user_menu_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_menu_like" ADD CONSTRAINT "user_menu_like_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "public"."menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
