import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { deleteTodo, Todo } from "../redux/slices/todoSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit }) => {
  // const [isEditing, setIsEditing] = useState(false);
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteTodo({ token: token as string, todoId: todo.id as string }));
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md hover:bg-gray-50 transition-all duration-200 rounded-lg mb-2">
      <div className="flex items-center">
        <div>
          <h3 className="font-bold text-lg">{todo.title}</h3>
          <p className="text-xs">{todo.description}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <PencilIcon
          className="w-5 h-5 cursor-pointer text-blue-500"
          onClick={() => onEdit(todo)}
        />
        <TrashIcon
          className="w-5 h-5 cursor-pointer text-red-500"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default TodoItem;
