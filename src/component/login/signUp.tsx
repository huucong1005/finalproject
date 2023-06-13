import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../App.css";
import { FaArrowLeft } from "react-icons/fa";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/slice/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //@ts-ignore
    dispatch(getUsers());
  }, []);
  //@ts-ignore
  const userList = useSelector((state) => state.user).users;

  const schema = yup
    .object({
      userName: yup.string().required(),
      userEmail: yup.string().email(),
      userPassword: yup.string().min(6).max(10),
      userType: yup.number().min(1).max(2),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const navigate: NavigateFunction = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const onSubmit = (data: any) => {
    if (userList.find((item: any) => item.userEmail == data.userEmail)) {
      alert("Email.is existed. PLEASE INPUT OTHER EMAIL !!!");
    } else {
      fetch("https://646cf8c57b42c06c3b2c5cbe.mockapi.io/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      })
        .then((res) => res.json())
        .then((res) => {
          alert("create account successfully!");
          navigate("/"); //router
        });
    }
  };

  return (
    <>
      {" "}
      <div className="login-form">
        <div className="border-login">
          <div className="sign-up">
            <br />
            <div className="flex">
              <FaArrowLeft
                className="ml-3 mt-2 flex-start w-25 h-5"
                onClick={() => navigate("/")}
              />
              <span className="text-center text-xl mt-2 font-bold flex-auto w-55">
                Create new account
              </span>
            </div>
            <br />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <tr>
                <td className="pl-5">Username:</td>
                <td>
                  <input className="my-2 ml-5" {...register("userName")} />
                  <p>{errors.userName?.message}</p>
                </td>
              </tr>
              <tr>
                <td className="pl-5">Email:</td>
                <td>
                  <input className="my-2 ml-5" {...register("userEmail")} />
                  <p>{errors.userEmail?.message}</p>
                </td>
              </tr>
              <tr>
                <td className="pl-5">Password:</td>
                <td>
                  <input
                    type="password"
                    className="my-2 ml-5"
                    {...register("userPassword")}
                  />
                  <p>{errors.userPassword?.message}</p>
                </td>
              </tr>
              <input type="hidden" defaultValue={1} {...register("userType")} />

              <input className="signup-btn" type="submit" />
              <p style={{ width: "60%", margin: "0 auto" }}>
                By clicking submit you agree to the Terms and Conditions of us.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
