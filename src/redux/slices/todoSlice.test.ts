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

  it('should handle "addTodo"', () => {
    const prevState = { ...initialState };
    const newTodo: Todo = {
      id: "1",
      title: "test",
      description: "test desc",
      status: "pending",
    };

    // const afterAddAction = addTodo({ token: "fake-token", newTodo });
    // store.dispatch(addTodo({ token: "fake-token", newTodo }));
    // expect(todoReducer(prevState, afterAddAction)).toEqual({
    //   ...initialState,
    //   todos: [newTodo],
    // });
    // jest.spyOn(createTodo)
  });
});
