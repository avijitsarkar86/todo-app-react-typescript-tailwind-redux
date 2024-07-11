import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  checkIfLoggedin,
  doLogin,
  doRegister,
} from "../redux/slices/authSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) dispatch(doLogin({ username, password }));
    else dispatch(doRegister({ username, password }));
  };

  dispatch(checkIfLoggedin());

  if (auth.token) {
    // console.log("token : ", auth.token);
    return <Navigate to="/todos" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          {isLogin ? "Login" : "Register"}
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border rounded mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
            disabled={
              username === "" || password === "" || auth.status === "loading"
            }
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        {auth.error && <p className="text-red-500 mt-4">{auth.error}</p>}
        <button
          className="w-full mt-4 text-blue-500"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an Account" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
