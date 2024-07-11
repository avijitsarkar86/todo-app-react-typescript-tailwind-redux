import React, { useEffect, useState } from "react";
import {
  PlusIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import TodoItem from "../components/TodoItem";
import TodoModal from "../components/modals/TodoModal";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { getTodos, Todo } from "../redux/slices/todoSlice";
import { Tab, TabList, Tabs, TabPanel } from "react-tabs";

import "./css/react-tabs-custom.css";

const TodoPage: React.FC = () => {
  const [isTodoModalOpen, setIsTodoModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);
  const { status, todos } = useSelector((state: RootState) => state.todos);

  const [selectedTodo, setSelectedTodo] = useState<null | Todo>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = todos.filter((todo) => {
    return (
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    if (token) {
      dispatch(getTodos(token));
    }
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleEdit = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsTodoModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedTodo(null);
    setIsTodoModalOpen(true);
  };

  const handleModalClose = () => {
    setIsTodoModalOpen(false);
    setSelectedTodo(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4 bg-gray-400 shadow-md p-2 rounded-md">
        <h1 className="text-2xl font-bold">My Todo List</h1>
        <button
          className="flex items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          onClick={handleAdd}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Todo
        </button>
        <button
          className="flex items-center bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5 mr-2" />
          Logout
        </button>
      </div>

      <div className="flex-col mx-auto md:max-w-screen-md max-w-sm">
        <input
          type="text"
          placeholder="Search Todos..."
          className="w-full mb-4 p-2 border rounded-md outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {status === "loading" && <p>Loading...</p>}
        {/* <div className="flex h-screen"> */}
        <Tabs className="mx-auto">
          <TabList className="flex space-x-4 border-b">
            <Tab>All</Tab>
            <Tab>Pending</Tab>
            <Tab>Complete</Tab>
          </TabList>

          <TabPanel>
            <div className="space-y-4">
              {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
              ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="space-y-4">
              {filteredTodos
                .filter((todo) => todo.status === "pending")
                .map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="space-y-4">
              {filteredTodos
                .filter((todo) => todo.status === "done")
                .map((todo) => (
                  <TodoItem key={todo.id} todo={todo} onEdit={handleEdit} />
                ))}
            </div>
          </TabPanel>
        </Tabs>
        {/* </div> */}
      </div>

      <TodoModal
        isOpen={isTodoModalOpen}
        closeModal={handleModalClose}
        todo={selectedTodo}
      />
    </div>
  );
};

export default TodoPage;
