import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = async (username: string, password: string) => {
  // console.log("API_BASE_URL : ", API_BASE_URL);
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    username,
    password,
  });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    username,
    password,
  });
  return response.data;
};
