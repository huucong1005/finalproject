import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../App.css";
import {
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AdminTestType } from "./adminTestItem";
import { getCate } from "../../redux/slice/categorySlice";
import { testSlice } from "../../redux/slice/testSlice";
import { AdminLeftContent } from "./adminLeft";
import { AdminHeader } from "./adminHeader";

const AdminTestEdit = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  let getTestId = searchParams.get("testId");

  //@ts-ignore
  const auth = JSON.parse(window.localStorage.getItem("account"));
  useEffect(() => {
    if (!auth || auth.userType != 2) {
      navigate(`/`);
    }
    //@ts-ignore
    dispatch(getCate());
  }, []);
  //@ts-ignore
  const categoryList = useSelector((state) => state.cate).category;

  const schema = yup
    .object({
      testName: yup.string().min(4).max(20),
      cateId: yup.number(),
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
        "https://646cfa217b42c06c3b2c5ef7.mockapi.io/test/" + getTestId
      );
      const data = await response.json();
      return { testName: data.testName, cateId: data.cateId };
    },
  });

  const onSubmit = (data: any) => {
    fetch("https://646cfa217b42c06c3b2c5ef7.mockapi.io/test/" + getTestId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/admin-test");
      });
  };

  return (
    <div className="admin-content">
      <AdminLeftContent />
      <div className="admin-right">
        <AdminHeader />
        <h2 className="text-2xl font-bold px-3 py-4">Edit test</h2>
        <br />
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label style={{ width: "40%" }} htmlFor="testName">
            Test name:
          </label>
          <input
            style={{
              marginLeft: "20px",
              padding: "2px 0 2px 5px",
              width: "60%",
              marginBottom: "20px",
            }}
            {...register("testName")}
          />
          <p className="text-red-600">
            {errors.testName ? "*" + errors.testName.message : ""}
          </p>
          <br />

          <label style={{ width: "40%" }} htmlFor="cateId">
            Category:
          </label>
          <select
            {...register("cateId")}
            style={{
              border: "solid 1px grey",
              borderRadius: "5px",
              marginLeft: "28px",
              padding: "0px 2px 2px 5px",
              width: "60%",
              height: "30px",
              marginBottom: "20px",
            }}
          >
            <option value="">---</option>
            {categoryList.map((item: any) => (
              <option value={item.cateId}>{item.cateName}</option>
            ))}
          </select>
          <p className="text-red-600">
            {errors.cateId ? "*Undefined category" : ""}
          </p>
          <br />

          <input
            type="button"
            className="cancel mr-5"
            onClick={() => navigate(`/admin-test`)}
            value="Cancel"
          />
          <input className="submit" type="submit" />
        </form>
      </div>
    </div>
  );
};
export default AdminTestEdit;
