import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { FC } from "react";
import "../../App.css";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AdminLeftContent } from "./adminLeft";
import { AdminHeader } from "./adminHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const AdminCateAdd = () => {
  const navigate: NavigateFunction = useNavigate();
  //@ts-ignore
  const auth = JSON.parse(window.localStorage.getItem("account"));
  useEffect(() => {
    if (!auth || auth.userType != 2) {
      navigate(`/`);
    }
  }, []);
  const schema = yup
    .object({
      cateName: yup.string().min(4).max(10),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const onSubmit = (data: any) => {
    fetch("https://646cf9a37b42c06c3b2c5e0b.mockapi.io/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/admin-cate"); //router
      });
  };

  return (
    <div className="admin-content">
      <AdminLeftContent />
      <div className="admin-right">
        <AdminHeader />
        <h2 className="text-2xl font-bold px-3 py-4">Add new category</h2>
        <br />
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label style={{ width: "40%" }} htmlFor="cateName">
            Name:
          </label>
          <input
            style={{
              marginLeft: "20px",
              padding: "2px 0 2px 5px",
              width: "60%",
              marginBottom: "20px",
            }}
            {...register("cateName")}
          />
          <p className="text-red-600">
            {errors.cateName ? "*" + errors.cateName.message : ""}
          </p>
          <br />
          <input
            type="button"
            className="cancel mr-5"
            onClick={() => navigate(`/admin-cate`)}
            value="Cancel"
          />
          <input className="submit" type="submit" />
        </form>
      </div>
    </div>
  );
};
export default AdminCateAdd;
