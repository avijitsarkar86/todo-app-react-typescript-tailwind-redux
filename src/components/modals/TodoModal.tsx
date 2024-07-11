import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addTodo,
  modifyTodo,
  Todo,
  TodoStatus,
} from "../../redux/slices/todoSlice";
import { useSelector } from "react-redux";

interface TodoModalProps {
  isOpen: boolean;
  closeModal: () => void;
  todo: Todo | null;
}

interface IFormInput {
  title: string;
  description: string;
  status: TodoStatus;
}

const schema = yup.object().shape({
  title: yup.string().required("please provide title"),
  description: yup.string().required("please provide description"),
  status: yup
    .string()
    .oneOf(["pending", "done"])
    .required("please select status"),
});

const TodoModal: React.FC<TodoModalProps> = ({ isOpen, closeModal, todo }) => {
  console.log({ "TodoModal:todo": todo });
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  const defaultValues: IFormInput = {
    title: "",
    description: "",
    status: "pending",
  };
  const values = (todo as IFormInput) || defaultValues;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: { title: "", description: "", status: "pending" },
    values,
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log({ data });
    if (todo) {
      console.log("updating the todo");
      dispatch(modifyTodo({ token: token as string, updatedTodo: data }));
    } else {
      console.log("creating new todo");
      dispatch(addTodo({ token: token as string, newTodo: data }));
    }

    reset();
    closeModal();
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={closeModal}
    >
      <div className="min-h-screen px-4 text-center">
        <DialogBackdrop transition className="fixed inset-0 bg-black/30" />
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <DialogPanel
          transition
          className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
        >
          <DialogTitle
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            {todo ? "Update Todo" : "Add New Todo"}
          </DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-2">
              <input
                type="text"
                className={`w-full p-2 border rounded mb-2 ${
                  errors.title ? "border-red-500" : ""
                } `}
                placeholder="Title"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 pb-2">{errors.title.message}</p>
              )}

              <textarea
                className={`w-full p-2 border rounded mb-2 ${
                  errors.description ? "border-red-500" : ""
                } `}
                placeholder="Description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-500 pb-2">
                  {errors.description.message}
                </p>
              )}

              <select
                className={`w-full p-2 border rounded mb-2 ${
                  errors.description ? "border-red-500" : ""
                } `}
                {...register("status")}
              >
                <option value="pending">Pending</option>
                {/* <option value="in-progress">In-Progress</option> */}
                <option value="done">Complete</option>
              </select>
              {errors.status && (
                <p className="text-red-500">{errors.status.message}</p>
              )}
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                // onClick={(e) => handleSubmit(e)}
              >
                {todo ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TodoModal;
