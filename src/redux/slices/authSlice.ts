import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../apis/loginApi";

const TOKEN_KEY = "todo:token";

interface AuthState {
  token: string | null;
  status: "idle" | "loading" | "succeed" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: "idle",
  error: null,
};

export const doLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await login(username, password);
    return response;
  }
);

export const doRegister = createAsyncThunk(
  "auth/register",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await register(username, password);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
    checkIfLoggedin(state) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        state.token = token;
        state.status = "succeed";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doLogin.fulfilled, (state, action) => {
        state.status = "succeed";
        state.token = action.payload.access_token;
        localStorage.setItem(TOKEN_KEY, state.token as string);
      })
      .addCase(doLogin.rejected, (state, action) => {
        console.log(action.error);
        state.status = "failed";
        state.error = action.error.message ?? "login failed";
      })
      .addCase(doRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(doRegister.fulfilled, (state, action) => {
        state.status = "succeed";
        state.token = action.payload.access_token;
        localStorage.setItem(TOKEN_KEY, state.token as string);
      })
      .addCase(doRegister.rejected, (state, action) => {
        console.log(action.error);
        state.status = "failed";
        state.error = action.error.message ?? "registration failed";
      });
  },
});

export const { logout, checkIfLoggedin } = authSlice.actions;
export default authSlice.reducer;
