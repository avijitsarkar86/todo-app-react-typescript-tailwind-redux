import {
  AsyncThunkAction,
  configureStore,
  UnknownAction,
} from "@reduxjs/toolkit";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { AppDispatch } from "../store";
import todoReducer, { addTodo, Todo, TodoState } from "./todoSlice";
import { createTodo } from "../apis/todoApi";

const mock = new MockAdapter(axios);

const initialState: TodoState = {
  todos: [],
  status: "idle",
  error: null,
};

describe("todoSlice", () => {
  let store: ReturnType<typeof configureStore>;
  let dispatch: AppDispatch;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todos: todoReducer,
      },
    });
    dispatch = store.dispatch as AppDispatch;
  });

  it("should handle initial state", () => {
    expect(todoReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });
});
