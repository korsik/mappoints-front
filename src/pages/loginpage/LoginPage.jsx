import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { loginUser } from "../../services/authService";
import { useAuthStore } from "../../state/AppState";
import Cookies from "js-cookie";
import mainLogo from "../../assets/exalogo.png";

const LoginPage = () => {
  const isLoggedIn = useAuthStore((state) => state.updateIsLoggedIn);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const isBtnActive =
    username.trim().length !== 0 && password.trim().length !== 0;

  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      Cookies.set("jwtToken", data.access_token, { expires: 1 });
      Cookies.set("user_role", data.user.role, { expires: 1 });
      sessionStorage.setItem("user", JSON.stringify(data.user));
      isLoggedIn(true);
    },
  });

  const handleLogin = async () => {
    try {
      const credentials = {
        username,
        password,
      };
      await loginMutation.mutateAsync(credentials);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex justify-center items-center">
        <img className="w-2/4" src={mainLogo} alt="exa logo" />
      </div>
      <div className="">
        <h1 className="text-5xl text-center font-semibold">Καλώς ήρθατε</h1>
        <p className="font-normal text-center text-md mt-4">
          Παρακαλούμε συνδεθείτε για να χρησιμοποιήσετε την υπηρεσία
        </p>
        <div className="w-full p-4">
          <div className="flex flex-col justify-center items-center my-8">
            <input
              type="text"
              placeholder="Όνομα χρήστη"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              autoComplete="off"
              className="input input-bordered input-primary-content focus:input-primary w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col justify-center items-center my-8">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Κωδικός πρόσβασης"
              className="input input-bordered input-primary-content focus:input-primary w-full max-w-xs"
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            {!isBtnActive ? (
              <button className="btn btn-primary btn-disabled w-2/4">
                ΕΙΣΟΔΟΣ
              </button>
            ) : (
              <button className="btn w-3/4 btn-primary" onClick={handleLogin}>
                ΕΙΣΟΔΟΣ
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
