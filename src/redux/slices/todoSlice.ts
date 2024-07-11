import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createTodo,
  fetchTodos,
  removeTodo,
  updateTodo,
} from "../apis/todoApi";

export type TodoStatus = "pending" | "done";

export interface Todo {
  id?: string;
  title: string;
  description: string;
  status: TodoStatus;
}

export interface TodoState {
  todos: Todo[];
  status: "idle" | "loading" | "succeed" | "failed";
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: null,
};

export const getTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (token: string) => {
    const response = await fetchTodos(token);
    return response;
  }
);

export const addTodo = createAsyncThunk(
  "todo/createTodo",
  async ({ token, newTodo }: { token: string; newTodo: Todo }) => {
    const response = await createTodo(token, newTodo);
    return response;
  }
);

export const modifyTodo = createAsyncThunk(
  "todo/modifyTodo",
  async ({ token, updatedTodo }: { token: string; updatedTodo: Todo }) => {
    const response = await updateTodo(token, updatedTodo);
    return response;
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async ({ token, todoId }: { token: string; todoId: string }) => {
    const response = await removeTodo(token, todoId);
    return todoId;
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = "succeed";
        state.todos = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.status = "succeed";
        state.todos.push(action.payload);
      })
      .addCase(modifyTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(modifyTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        state.status = "succeed";
      })
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        console.log(action.payload);
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        state.status = "succeed";
      });
  },
});

export default todoSlice.reducer;
