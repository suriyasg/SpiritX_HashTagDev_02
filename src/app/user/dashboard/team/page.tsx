"use client";
import { playerData } from "@/app/admin/dashboard/page";
import TeamSelect from "@/components/TeamSelect";
import React from "react";
import { currUser } from "../page";

const Page = () => {
  return (
    <div>
      <TeamSelect playerData={playerData} userData={currUser} />
    </div>
  );
};

export default Page;
