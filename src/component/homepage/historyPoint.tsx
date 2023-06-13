import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "../../App.css";
import { getCate } from "../../redux/slice/categorySlice";
import { getTest } from "../../redux/slice/testSlice";
import { getUserMark } from "../../redux/slice/userSlice";
import { Footer } from "./footer";
import { Header } from "./header";
import HomeCateItem, { CateType } from "./homeCateItem";
import Pagination from "../pagination";

let PageSize = 5;

const HomeHistoryPoint = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  //@ts-ignore
  const auth = JSON.parse(window.localStorage.getItem("account"));
  useEffect(() => {
    // get list mark from server
    if (!auth || auth.userType != 1) {
      navigate(`/`);
    }
    // @ts-ignore
    dispatch(getTest());
    // @ts-ignore
    dispatch(getCate());
    // @ts-ignore
    dispatch(getUserMark());
  }, []);
  //@ts-ignore
  const testList = useSelector((state) => state.test).test;
  //@ts-ignore
  const cateList = useSelector((state) => state.cate).category;
  //@ts-ignore
  const markList = useSelector((state) => state.user).mark;

  const combineArrayTestCate = testList.map((item1: { cateId: number }) => ({
    ...item1,
    ...cateList.find(
      (item2: { cateId: number }) => item2.cateId == item1.cateId
    ),
  }));
  const combineArrayMarkTest = markList.map((item1: { testId: number }) => ({
    ...item1,
    ...combineArrayTestCate.find(
      (item2: { testId: number }) => item2.testId == item1.testId
    ),
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return combineArrayMarkTest.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, combineArrayMarkTest]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header />
      <br />
      <p>History point</p>
      <br />
      <div className="table w-11/12 mt-4 mx-auto">
        <div className="table-row">
          <div className="th-table">. . .</div>
          <div className="th-table">Test name</div>
          <div className="th-table">Category</div>
          <div className="th-table">Quantity question</div>
          <div className="th-table">Quantity true answer</div>
          <div className="th-table">Point</div>
        </div>

        {currentTableData?.map((item: any, index: number) => (
          <div className="table-row text-left">
            <div className="td-table border-r w-1/12">
              <b>{(currentPage - 1) * PageSize + index + 1}.</b>
            </div>
            <div className="td-table border-r w-1/6">{item.testName}</div>
            <div className="td-table border-r w-1/6">{item.cateName}</div>
            <div className="td-table border-r w-1/6">
              {item.testQuantityQues}
            </div>
            <div className="td-table border-r w-1/6">{item.testTrueQues}</div>
            <div className="td-table w-1/6">
              {Math.round((item.testTrueQues / item.testQuantityQues) * 100)} %
            </div>
          </div>
        ))}
      </div>{" "}
      <br />
      <Pagination
        className="pl-2 pagination-bar pb-10 flex justify-center"
        currentPage={currentPage}
        totalCount={combineArrayMarkTest.length}
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

export default HomeHistoryPoint;
