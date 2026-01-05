"use client";

import React, { useState } from "react";
import {
  Clock,
  Package,
  CheckCircle,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

type OrderItem = {
  menuId: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
};

type Order = {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: "pending" | "completed" | "cancelled";
  items: OrderItem[];
};

const HistoryPage = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Mock data - dalam implementasi nyata, data akan dari API
  const orders: Order[] = [
    // {
    //   id: "1",
    //   orderNumber: "ORD-2025-001",
    //   date: "2025-01-04",
    //   total: 150000,
    //   status: "completed",
    //   items: [
    //     {
    //       menuId: "1",
    //       name: "Bubble Tea",
    //       quantity: 2,
    //       price: 45000,
    //       image: "/drinks/bubble-tea.png",
    //     },
    //     {
    //       menuId: "2",
    //       name: "Matcha Latte",
    //       quantity: 1,
    //       price: 60000,
    //       image: "/drinks/matcha.png",
    //     },
    //   ],
    // },
  ];

  const getStatusColor = (status: "pending" | "completed" | "cancelled") => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: "pending" | "completed" | "cancelled") => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "cancelled":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: "pending" | "completed" | "cancelled") => {
    switch (status) {
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Order History
          </h1>
          <p className="text-gray-600">
            {orders.length > 0
              ? `You have ${orders.length} order${
                  orders.length !== 1 ? "s" : ""
                }`
              : "You haven't placed any orders yet"}
          </p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Package className="w-24 h-24 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders. Start shopping to see your order
              history here!
            </p>
            <a
              href="/menu"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {/* Order Header */}
                <button
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id
                    )
                  }
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex-grow text-left">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {order.orderNumber}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {new Date(order.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-gray-700">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""} • Total:{" "}
                      <span className="font-bold text-blue-600">
                        Rp {order.total.toLocaleString("id-ID")}
                      </span>
                    </p>
                  </div>

                  <ChevronDown
                    className={`w-6 h-6 text-gray-400 transition-transform ${
                      expandedOrder === order.id ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Order Details */}
                {expandedOrder === order.id && (
                  <div className="border-t px-6 py-6 bg-gray-50">
                    {/* Items */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Order Items
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 bg-white rounded-lg"
                          >
                            {item.image && (
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="w-20 h-20 object-contain rounded"
                              />
                            )}
                            <div className="flex-grow">
                              <p className="font-semibold text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                Rp{" "}
                                {(item.price * item.quantity).toLocaleString(
                                  "id-ID"
                                )}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Rp {item.price.toLocaleString("id-ID")} each
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-700">Subtotal:</span>
                        <span className="font-semibold text-gray-900">
                          Rp {order.total.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-700">Tax (10%):</span>
                        <span className="font-semibold text-gray-900">
                          Rp {(order.total * 0.1).toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-700">Shipping:</span>
                        <span className="font-semibold text-green-600">
                          Free
                        </span>
                      </div>
                      <div className="border-t pt-3 flex justify-between items-center">
                        <span className="font-semibold text-gray-900">
                          Grand Total:
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          Rp {(order.total * 1.1).toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-3">
                      {order.status === "completed" && (
                        <>
                          <button className="flex-1 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg transition">
                            Reorder
                          </button>
                          <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition">
                            Download Invoice
                          </button>
                        </>
                      )}
                      {order.status === "pending" && (
                        <button className="flex-1 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold rounded-lg transition">
                          View Tracking
                        </button>
                      )}
                      <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition">
                        Contact Support
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
