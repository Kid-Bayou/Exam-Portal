import axios from "axios";

const API_BASE_URL = "https://localhost:44304/api/Account";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
});


export const aSignup = async (formData) => {
  try {
    const response = await axiosInstance.post("/signup?admin=true", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const eSignup = async (formData) => {
  try {
    const response = await axiosInstance.post("/signup?admin=false", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post("/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const logout = async () => {
  try {
    localStorage.removeItem("accessToken");
    return true;
  } catch (error) {
    throw error;
  }
};

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export default axiosInstance;
