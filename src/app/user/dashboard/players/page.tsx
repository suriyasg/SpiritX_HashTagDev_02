"use client";
import { playerData } from "@/app/admin/dashboard/page";
import UserPlayerTable from "@/components/UserPlayerTable";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 p-8 flex flex-col items-center justify-center space-y-4">
      <div className="w-full max-w-6xl bg-white p-6 rounded-xl shadow-xl overflow-x-auto">
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => router.push("/user/dashboard")}
            className="py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
          >
            Back to Dashboard
          </button>
        </div>
        <UserPlayerTable playerData={playerData} />
      </div>
    </div>
  );
};

export default Page;
