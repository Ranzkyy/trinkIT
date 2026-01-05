"use client";

import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
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

type CartItem = {
  menuId: string;
  quantity: number;
};

const CardProduct = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Increase quantity
  const increaseQuantity = (menuId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [menuId]: (prev[menuId] || 0) + 1,
    }));
  };

  // Decrease quantity
  const decreaseQuantity = (menuId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [menuId]: Math.max(0, (prev[menuId] || 0) - 1),
    }));
  };

  // Add to cart
  const addToCart = async (menu: Menu) => {
    const quantity = quantities[menu.id] || 0;

    if (quantity === 0) {
      alert("Please select quantity");
      return;
    }

    setIsLoading(true);

    try {
      // Check if item already in cart
      const existingItem = cart.find((item) => item.menuId === menu.id);

      if (existingItem) {
        // Update existing cart item
        const updatedCart = cart.map((item) =>
          item.menuId === menu.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        // Add new cart item
        const newCartItem: CartItem = {
          menuId: menu.id,
          quantity,
        };
        const updatedCart = [...cart, newCartItem];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }

      // Reset quantity for this menu
      setQuantities((prev) => ({
        ...prev,
        [menu.id]: 0,
      }));

      alert(`${menu.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLike = async (index: number, menuId: string) => {
    // Optimistic Update: Update UI immediately
    const updatedMenus = [...menus];
    const previousState = updatedMenus[index].isLiked;
    const newState = !previousState;

    // Update UI first for instant feedback
    updatedMenus[index].isLiked = newState;
    setMenus(updatedMenus);

    try {
      // Send request to backend in background
      const response = await fetch("/api/menu/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menuId }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        // Rollback if API call failed
        const rollbackMenus = [...menus];
        rollbackMenus[index].isLiked = previousState;
        setMenus(rollbackMenus);

        console.error("Like/Unlike failed:", result.error);

        // Show error feedback (optional)
        if (response.status === 401) {
          window.location.href = "/auth";
        }
      }
    } catch (error) {
      // Rollback on network error
      const rollbackMenus = [...menus];
      rollbackMenus[index].isLiked = previousState;
      setMenus(rollbackMenus);

      console.error("Error toggling like:", error);
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

      // Load cart from localStorage
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
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
        <div
          className="bg-white p-4 shadow rounded-lg hover:shadow-lg transition"
          key={menu.id}
        >
          <div className="justify-between flex mb-2">
            <p className="font-semibold text-gray-800">{menu.name}</p>
            <button
              className="hover:scale-110 transition"
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
            src={menu.image || "/default.png"}
            alt={menu.name}
            className="h-64 w-full object-contain mx-auto rounded"
            width={300}
            height={300}
          />
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-gray-900">{menu.name}</p>
              <p className="font-bold text-blue-600">
                Rp {menu.price.toLocaleString("id-ID")}
              </p>
            </div>

            {/* Quantity Selector and Cart Button */}
            <div className="grid grid-cols-3 gap-2">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 col-span-2">
                <button
                  onClick={() => decreaseQuantity(menu.id)}
                  disabled={isLoading}
                  className="w-8 h-8 flex items-center justify-center rounded bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 transition"
                >
                  <Minus className="w-4" />
                </button>
                <p className="flex-1 text-center font-semibold">
                  {quantities[menu.id] || 0}
                </p>
                <button
                  onClick={() => increaseQuantity(menu.id)}
                  disabled={isLoading}
                  className="w-8 h-8 flex items-center justify-center rounded bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 transition"
                >
                  <Plus className="w-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(menu)}
                disabled={isLoading || (quantities[menu.id] || 0) === 0}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:opacity-50 text-white rounded-lg p-2 flex items-center justify-center gap-1 font-semibold transition"
              >
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
