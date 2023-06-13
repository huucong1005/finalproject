import { createElement, useEffect, useMemo, useState } from "react";
import "../../App.css";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/slice/userSlice";
import { Header } from "./header";
import { Footer } from "./footer";
import CateTest from "./categoryTest";
import { getTest } from "../../redux/slice/testSlice";
import { getCate } from "../../redux/slice/categorySlice";
import Pagination from "../pagination";

let PageSize = 5;

export const Category = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let getCateId = searchParams.get("cateId");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //@ts-ignore
  const auth = JSON.parse(window.localStorage.getItem("account"));
  useEffect(() => {
    if (!auth || auth.userType != 1) {
      navigate(`/`);
    }
    //@ts-ignore
    dispatch(getTest());
    //@ts-ignore
    dispatch(getCate());
  }, []);
  //@ts-ignore
  const testList = useSelector((state) => state.test).test.filter((item) => item.cateId == getCateId);
  //@ts-ignore
  const category = useSelector((state) => state.cate).category.find((item) => item.cateId == getCateId);

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return testList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, testList]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header />
      <br />
      <p className="text-2xl mt-2 font-bold">Category: {category?.cateName}</p>
      <div className="category-test-list">
        {currentTableData?.map(
          (
            item: {
              testId: number;
              cateId: number;
              testName: string;
              createdAt: string;
            },
            index: number
          ) => (
            <CateTest
              key={index}
              testId={item.testId}
              cateId={item.cateId}
              testName={item.testName}
              createdAt={item.createdAt}
            />
          )
        )}
      </div>
      <Pagination
        className="pl-2 pagination-bar pb-10 flex justify-center"
        currentPage={currentPage}
        totalCount={testList.length}
        pageSize={PageSize}
        onPageChange={(page: React.SetStateAction<number>) =>
          setCurrentPage(page)
        }
        siblingCount={1}
      />
      <br />

      <Footer />
    </div>
  );
};
