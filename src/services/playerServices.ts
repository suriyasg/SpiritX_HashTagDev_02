import axios from "axios";
import { Player } from "../../datamodel/types";

export const getAllPlayers = async () => {
  try {
    const response = await axios.get("/api/getAllPlayers");
    return response.data;
  } catch (error) {
    console.error("Error in getAllPlayers", error);
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};

export const getPlayerByCataegory = async (category: string) => {
  try {
    const response = await axios.post("/api/getPlayerByCategory", { category });
    return response.data;
  } catch (error) {
    console.error("Error in getPlayerByCataegory", error);
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};

export const AddPayer = async (player: Player) => {
  try {
    const response = await axios.post("/api/createPlayer", player);
    return response.data;
  } catch (error) {
    console.error("Error in AddPayer", error);
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};

export const updatePlayer = async (player_id: string, player: Player) => {
  try {
    const response = await axios.post("/api/updatePlayer", {
      player_id,
      player,
    });
    return response.data;
  } catch (error) {
    console.error("Error in updatePlayer", error);
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};

export const deletePlayer = async (player_id: string) => {
  try {
    const response = await axios.post("/api/deletePlayer", { player_id });
    return response.data;
  } catch (error) {
    console.error("Error in deletePlayer", error);
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};
export const removePlayerFromTeam = async (
  player_id: string,
  user_id: string
) => {
  try {
    const response = await axios.post("/api/removePlayerFromUser", {
      player_id,
      user_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error in removePlayerFromTeam", error);
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};

export const addPlayerToTeam = async (player_id: string, user_id: string) => {
  try {
    const response = await axios.post("/api/addPlayerToUser", {
      player_id,
      user_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error in addPlayerToTeam", error);
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};
