"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";

type CartItem = {
  menuId: string;
  quantity: number;
};

type MenuDetail = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [menuDetails, setMenuDetails] = useState<{ [key: string]: MenuDetail }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage and fetch menu details
  useEffect(() => {
    const loadCart = async () => {
      try {
        // Get cart from localStorage
        const savedCart = localStorage.getItem("cart");
        const cart = savedCart ? JSON.parse(savedCart) : [];
        setCartItems(cart);

        if (cart.length > 0) {
          // Fetch all menus
          const response = await fetch("/api/menu");
          const menus = await response.json();

          // Create a map of menu details
          const details: { [key: string]: MenuDetail } = {};
          menus.forEach((menu: MenuDetail) => {
            details[menu.id] = menu;
          });
          setMenuDetails(details);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Update quantity
  const updateQuantity = (menuId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(menuId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.menuId === menuId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from cart
  const removeItem = (menuId: string) => {
    const updatedCart = cartItems.filter((item) => item.menuId !== menuId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Clear entire cart
  const clearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  };

  // Calculate totals
  const calculateSubtotal = (menuId: string, quantity: number) => {
    const menu = menuDetails[menuId];
    return menu ? menu.price * quantity : 0;
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + calculateSubtotal(item.menuId, item.quantity),
    0
  );

  const taxAmount = totalAmount * 0.1; // 10% tax
  const grandTotal = totalAmount + taxAmount;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-800">Loading...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-400 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Start shopping to add items to your cart
            </p>
            <Link
              href="/menu"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {cartItems.map((item) => {
                const menu = menuDetails[item.menuId];
                if (!menu) return null;

                return (
                  <div
                    key={item.menuId}
                    className="border-b last:border-b-0 p-6 flex gap-6 hover:bg-gray-50 transition"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={menu.image || "/default.png"}
                        alt={menu.name}
                        width={120}
                        height={120}
                        className="w-24 h-24 object-contain rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {menu.name}
                      </h3>
                      <p className="text-blue-600 font-bold text-lg mb-4">
                        Rp {menu.price.toLocaleString("id-ID")}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.menuId, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded bg-red-500 hover:bg-red-600 text-white transition"
                        >
                          <Minus className="w-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.menuId, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded bg-green-500 hover:bg-green-600 text-white transition"
                        >
                          <Plus className="w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal and Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.menuId)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                        <p className="text-xl font-bold text-gray-900">
                          Rp{" "}
                          {calculateSubtotal(
                            item.menuId,
                            item.quantity
                          ).toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Shopping Button */}
            <div className="mt-6">
              <Link
                href="/menu"
                className="inline-block text-blue-600 hover:text-blue-700 font-semibold transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (10%)</span>
                  <span className="font-semibold">
                    Rp {taxAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Grand Total
                  </span>
                  <span className="text-3xl font-bold text-blue-600">
                    Rp {grandTotal.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mb-3 transition shadow-md hover:shadow-lg">
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-lg transition"
              >
                Clear Cart
              </button>

              {/* Order Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">💳 Secure Checkout</span>
                  <br />
                  Your payment information is encrypted and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
