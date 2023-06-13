import React, {
  createElement,
  useEffect,
  useState,
  useContext,
  FC,
} from "react";
import "../../App.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/slice/userSlice";
import { Header } from "./header";
import { Footer } from "./footer";
import { NavigateFunction, Link, redirect } from "react-router-dom";
import "../../App.css";
import CateTest from "./categoryTest";
import { getTest } from "../../redux/slice/testSlice";
import { getCate } from "../../redux/slice/categorySlice";

export const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  //@ts-ignore
  const auth = JSON.parse(window.localStorage.getItem("account"));

  useEffect(() => {
    if (!auth || auth.userType != 1) {
      navigate(`/`);
    }
  }, []);

  //@ts-ignore
  const testDetail = useSelector((state) => state.test).testdetail;
  //@ts-ignore
  const answer = useSelector((state) => state?.test).answer;
  const combineArray = testDetail.map((item1: { quesId: number }) => ({
    ...item1,
    ...answer.find((item2: { quesId: number }) => item2.quesId == item1.quesId),
  }));

  console.log(combineArray);

  let count = 0;
  combineArray.map((item: { option: string; answer: string }) =>
    item.option == item.answer ? (count += 1) : (count += 0)
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header />
      <br />
      <p>
        Result: {count}/{combineArray.length}
      </p>
      <br />

      <div className="table w-11/12 mt-4 mx-auto">
        <div className="table-row">
          <div className="th-table">Question</div>
          <div className="th-table">Key</div>
          <div className="th-table">Your answer</div>
        </div>

        {combineArray.map(
          (
            item: { quesContent: string; answer: string; option: string },
            index: number
          ) => (
            <div className="table-row text-left">
              <div className="td-table border-r w-3/5">
                <b>Question {index + 1}: </b> {item.quesContent}
              </div>
              <div
                style={
                  item.answer == item.option
                    ? { color: "green" }
                    : { color: "red" }
                }
                className="td-table border-r w-1/5"
              >
                {item.answer}
              </div>
              <div
                style={
                  item.answer == item.option
                    ? { color: "green" }
                    : { color: "red" }
                }
                className="td-table w-1/5"
              >
                {item.option}
              </div>
            </div>
          )
        )}
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};
