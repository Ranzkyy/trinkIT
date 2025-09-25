"use client";

import { Heart, Key, Minus, Plus, ShoppingCart } from "lucide-react";
import React from "react";
import Image from "next/image";

import { useEffect, useState } from "react";

type Menu = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  isLiked?: boolean;
};

const CardProduct = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleLike = async (index: number, menuId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/menu/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menuId }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Update local state
        const updatedMenus = [...menus];
        updatedMenus[index].isLiked = result.isLiked;
        setMenus(updatedMenus);
      } else {
        console.error("Like/Unlike failed:", result.error);
        // If unauthorized, redirect to login
        if (response.status === 401) {
          window.location.href = "/auth";
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMenusAndLikes = async () => {
    try {
      // Fetch menus
      const menuResponse = await fetch("/api/menu");
      const menuData = await menuResponse.json();

      // Fetch user's liked menus
      const likedResponse = await fetch("/api/menu/liked");

      if (likedResponse.ok) {
        const likedData = await likedResponse.json();
        const likedMenuIds = likedData.likedMenuIds || [];

        // Combine data
        const menusWithLike = menuData.map((menu: Menu) => ({
          ...menu,
          isLiked: likedMenuIds.includes(menu.id),
        }));

        setMenus(menusWithLike);
      } else {
        // User not logged in, set all menus as not liked
        const menusWithLike = menuData.map((menu: Menu) => ({
          ...menu,
          isLiked: false,
        }));
        setMenus(menusWithLike);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMenusAndLikes();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-center text-sm">
      {menus.map((menu, index) => (
        <div className="bg-white p-4 shadow rounded" key={menu.id}>
          <div className="justify-between flex">
            <p>{menu.name}</p>
            <button
              className=""
              onClick={() => toggleLike(index, menu.id)}
              disabled={isLoading}
            >
              <Heart
                color={menu.isLiked ? "red" : "gray"}
                className="w-4"
                fill={menu.isLiked ? "red" : "none"}
              />
            </button>
          </div>
          <Image
            src={menu.image || "/default.pngg"}
            alt="{menu.name}"
            className="h-64 w-full object-contain mx-auto"
            width={300}
            height={300}
          />
          <div className="mt-2 mx-2">
            <div className="flex justify-between">
              <p className="">{menu.name}</p>
              <p className="text-center">{menu.price}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 justify-items-center items-center">
              <div className="cart flex items-center space-x-2  rounded-full overflow-hidden">
                <button className="w-10 h-8 flex items-center justify-center transition-all ease-in-out text-white bg-green-500 hover:bg-green-900">
                  <Plus className="w-4" />
                </button>
                <p>0</p>
                <button className="w-10 h-8 flex items-center justify-center transition-all ease-in-out text-white bg-red-500 hover:bg-red-900">
                  <Minus className="w-4" />
                </button>
              </div>
              <button className="bg-blue-500 hover:bg-blue-900 size-max py-2 px-8 text-white rounded">
                <ShoppingCart className="w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardProduct;
