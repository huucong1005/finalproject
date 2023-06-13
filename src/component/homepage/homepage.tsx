import { createElement, useEffect, useState } from "react";
import "../../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/slice/userSlice";
import { Carousel } from "./carousel";
import { Header } from "./header";
import { Footer } from "./footer";
import HomeCateList from "./homeCateList";

export const HomePage = () => {
  const navigate = useNavigate();
  //@ts-ignore
  const auth = JSON.parse(window.localStorage.getItem("account"));
  useEffect(() => {
    if (!auth || auth.userType != 1) {
      navigate(`/`);
    }
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header />
      <Carousel />

      <HomeCateList />

      <Footer />
    </div>
  );
};
