import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../App.css";
import {
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AdminCateType } from "./adminCateItem";
import { AdminLeftContent } from "./adminLeft";
import { AdminHeader } from "./adminHeader";

const AdminCateEdit = () => {
  const navigate: NavigateFunction = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let getCateId = searchParams.get("cateId");

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
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      const response = await fetch(
        "https://646cf9a37b42c06c3b2c5e0b.mockapi.io/category/" + getCateId
      );
      const data = await response.json();
      return { cateName: data.cateName };
    },
  });

  const onSubmit = (data: any) => {
    fetch("https://646cf9a37b42c06c3b2c5e0b.mockapi.io/category/" + getCateId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/admin-cate");
      });
  };

  return (
    <div className="admin-content">
      <AdminLeftContent />
      <div className="admin-right">
        <AdminHeader />
        <h2 className="text-2xl font-bold px-3 py-4">Edit category</h2>
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
export default AdminCateEdit;
