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

export const AboutUs = () => {
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
      <br />
      <p className="text-center text-3xl ">About Us</p>
      <br />
      <div className="w-3/5 mx-auto pb-10">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit in
          possimus repellendus libero nam itaque laudantium sed nobis quidem
          optio adipisci, nesciunt nulla praesentium eos porro cum quibusdam
          consequuntur cumque?
        </p>
        <br />
        <img className="w-full" src="../../../public/aboutus.jpg" />
      </div>

      <Footer />
    </div>
  );
};
