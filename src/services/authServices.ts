import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post("/api/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error in login", error);
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};

export const signup = async (username: string, password: string) => {
  try {
    const response = await axios.post("/api/auth/signup", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error in signup", error);
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};
