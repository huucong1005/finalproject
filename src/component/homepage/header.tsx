import { createElement, useEffect, useState } from "react";
import "../../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/slice/userSlice";
import { getCate } from "../../redux/slice/categorySlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("account");
    navigate(`/`);
  };

  useEffect(() => {
    // get list cate from server
    //@ts-ignore
    dispatch(getCate());
  }, []);
  //@ts-ignore
  const categoryList = useSelector((state) => state.cate).category;

  return (
    <>
      <div className="info-header">
        <div className="text-gray-500">
          {" "}
          Điện thoại: 024 2242 6188. Email: info@meta.vn.
        </div>
        <div>
          <div className="language">
            <select name="lang" id="lang" className="lang-opt">
              <option value="b">English</option>
              <option value="a">Vietnam</option>
            </select>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="logo ml-2 ml-4" onClick={() => navigate(`/homepage`)}>
          <img src="../../../public/logo.png" alt="" />
          <span className="font-mono font-bold text-4xl mt-1">AllQuiZ</span>
        </div>
        <div className="header-item category-relative">
          <span onClick={() => navigate(`/homepage`)} id={window.location.pathname.search('/category') ? "" : "header-active"}>Category</span> 
          <div className="category-dropdown">
            {categoryList.map((item: any) => (
              <li  onClick={() => navigate(`/category?cateId=${item.cateId}`)}>
                {item.cateName}
              </li>
            ))}
          </div>
        </div>

        <div id={window.location.pathname.search('/history') ? "" : "header-active"} className="header-item" onClick={() => navigate(`/history`)} >
          <span >History</span> 
        </div>
        <div className="header-item" onClick={() => navigate(`/about-us`)}>
          <span id={window.location.pathname.search('/about-us') ? "" : "header-active"}>About us</span> 
        </div>
        <div className="mr-10">
          <button className="logout-btn" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    </>
  );
};
