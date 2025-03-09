"use client";
import TeamSelect from "@/components/TeamSelect";
import React, { useEffect, useState } from "react";
import { currUser } from "../page";
import { Player } from "../../../../../datamodel/types";
import { getAllPlayers } from "@/services/playerServices";

const Page = () => {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  useEffect(() => {
    const fetchPlayers = async () => {
      console.log("Fetching players...");
      try {
        const response: Player[] = await getAllPlayers();
        console.log("Fetched response:", response, typeof response);

        if (!response || response.length === 0) {
          console.warn("No players returned from API");
        }

        setPlayerData(response);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <TeamSelect playerData={playerData} userData={currUser} />
    </div>
  );
};

export default Page;
