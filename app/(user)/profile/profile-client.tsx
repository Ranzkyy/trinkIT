"use client";

import React from "react";
import { signOut } from "../../auth/auth-actions";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { useClearSession, useInvalidateSession } from "@/hooks/use-session";
import { LogOut, User, Mail, Calendar, Edit2 } from "lucide-react";
import Image from "next/image";

type Session = typeof auth.$Infer.Session;

const ProfileClient = ({ session }: { session: Session }) => {
  const router = useRouter();
  const clearSession = useClearSession();
  const invalidateSession = useInvalidateSession();

  const handleSignOut = async () => {
    clearSession();

    try {
      await signOut();
      router.push("/auth");
    } catch (error) {
      invalidateSession();
      console.error("Sign out error:", error);
    }
  };

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const createdDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* User Avatar and Basic Info */}
              <div className="flex items-start gap-6 mb-8 pb-8 border-b-2">
                <div className="flex-shrink-0">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name}
                      width={120}
                      height={120}
                      className="w-28 h-28 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                      <span className="text-4xl font-bold text-white">
                        {initials}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{user.email}</p>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-lg transition">
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Account Information
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-blue-600" />
                      <label className="text-sm font-semibold text-gray-600">
                        Full Name
                      </label>
                    </div>
                    <p className="text-gray-900 font-semibold text-lg">
                      {user.name}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <label className="text-sm font-semibold text-gray-600">
                        Email Address
                      </label>
                    </div>
                    <p className="text-gray-900 font-semibold text-lg">
                      {user.email}
                    </p>
                  </div>

                  {/* Email Verified Status */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-green-500"></div>
                      <label className="text-sm font-semibold text-gray-600">
                        Email Verification
                      </label>
                    </div>
                    <p className="text-gray-900 font-semibold text-lg">
                      {user.emailVerified ? (
                        <span className="text-green-600">Verified</span>
                      ) : (
                        <span className="text-orange-600">Pending</span>
                      )}
                    </p>
                  </div>

                  {/* Member Since */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <label className="text-sm font-semibold text-gray-600">
                        Member Since
                      </label>
                    </div>
                    <p className="text-gray-900 font-semibold text-lg">
                      {createdDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preferences Section */}
              <div className="mb-8 pb-8 border-t-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 mt-8">
                  Preferences
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Email Notifications
                      </p>
                      <p className="text-sm text-gray-600">
                        Receive updates about your orders
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Marketing Emails
                      </p>
                      <p className="text-sm text-gray-600">
                        Receive promotions and special offers
                      </p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/history")}
                  className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition"
                >
                  View Order History
                </button>
                <button className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition">
                  Download Invoice
                </button>
                <button className="w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg transition">
                  Support Center
                </button>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Account Status
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Status</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Total Orders</span>
                  <span className="font-semibold text-gray-900">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Loyalty Points</span>
                  <span className="font-semibold text-gray-900">0</span>
                </div>
              </div>
            </div>

            {/* Sign Out Section */}
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition shadow-lg hover:shadow-xl"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;
