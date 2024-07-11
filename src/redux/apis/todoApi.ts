import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getHeaders = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchTodos = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/todos`, getHeaders(token));
  return response.data;
};

export const createTodo = async (token: string, newTodo: any) => {
  const response = await axios.post(
    `${API_BASE_URL}/todos`,
    newTodo,
    getHeaders(token)
  );
  return response.data;
};

export const updateTodo = async (token: string, updatedTodo: any) => {
  const response = await axios.patch(
    `${API_BASE_URL}/todos/${updatedTodo.id}`,
    updatedTodo,
    getHeaders(token)
  );
  return response.data;
};

export const removeTodo = async (token: string, todoId: string) => {
  const response = await axios.delete(
    `${API_BASE_URL}/todos/${todoId}`,
    getHeaders(token)
  );
  return response.data;
};
