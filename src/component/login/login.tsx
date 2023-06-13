import { createElement, useEffect, useState } from "react";
import "../../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(getUsers());
  }, []);
  //@ts-ignore
  const userList = useSelector((state) => state.user).users;

  const signIn = () => {
    //handle logic check user
    if (username && pass) {
      const Auth = userList.find(
        (item: any) => item.userEmail == username && item.userPassword == pass
      );

      if (Auth) {
        localStorage.setItem("account", JSON.stringify(Auth));
        if (Auth.userType == 1) {
          navigate(`/homepage`);
        } else {
          navigate(`/admin-cate`);
        }
      } else {
        alert("username or password incorrect");
      }
    } else {
      alert("please type full username and password");
    }
  };

  return (
    <div className="login-form">
      <div className="border-login">
        <div className="login">
          <p className="text-xl mt-2 font-bold">Login</p>
          <br />
          <p>Email</p>
          <input
            type="text"
            className="form-control"
            placeholder=" Email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <p>Password</p>
          <input
            type="text"
            className="form-control"
            placeholder=" Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button className="login-btn" onClick={signIn}>
            Login
          </button>
          <br />
          <p>
            Not a remember? <a onClick={() => navigate("/sign-up")}>Signup </a>
            now
          </p>
        </div>
      </div>
    </div>
  );
};
