import axios from "axios";

export const userLogin = async (username: string, password: string) => {
  try {
    const response = await axios.post("api/auth/user/login", {
      username,
      password,
    });
    console.log("response", response.data);
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

export const UserSignup = async (username: string, password: string) => {
  try {
    const response = await axios.post("/api/auth/user/signup", {
      username,
      password,
    });
    console.log("response", response.data);
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

export const adminLogin = async (admin_name: string, password: string) => {
  try {
    const response = await axios.post("/api/auth/admin/login", {
      admin_name,
      password,
    });
    console.log("response", response.data);
    return response.data.statusCode;
  } catch (error) {
    console.error("Error in login", error);
    throw error;
  }
};
