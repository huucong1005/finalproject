import React, { useEffect, useState } from "react";
import "../../App.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/slice/userSlice";
import { Header } from "./header";
import { Footer } from "./footer";
import {
  getAnswers,
  getTest,
  getTestDetail,
} from "../../redux/slice/testSlice";
import TestItem from "./testItem";
import axios from "axios";

export const Test = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let getTestId = searchParams.get("testId");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //@ts-ignore
  const auth = JSON.parse(window.localStorage.getItem("account"));
  useEffect(() => {
    if (!auth || auth.userType != 1) {
      navigate(`/`);
    }
    //@ts-ignore
    dispatch(getTestDetail(getTestId));
  }, []);

  let getUserId = auth.userId;
  //@ts-ignore
  const testDetail = useSelector((state) => state.test).testdetail;

  // ===================================================================================================

  const [resultChange, setResultChange] = useState<any>([]);

  const changeResult = (quesId: number, option: string) => {
    let copyChangeResult = [...resultChange];
    if (
      resultChange.find((item: { quesId: number }) => item.quesId === quesId)
    ) {
      copyChangeResult = copyChangeResult.filter(
        (item) => item.quesId !== quesId
      );
      copyChangeResult = [...copyChangeResult, { quesId, option }];
    } else {
      copyChangeResult = [...copyChangeResult, { quesId, option }];
    }
    setResultChange(copyChangeResult);
  };

  console.log(resultChange);

  async function redirectToResultPage() {
    //handle logic check user
    if (resultChange.length < testDetail.length) {
      alert("vui lòng chon full dap an");
    } else {
      dispatch(getAnswers(resultChange));
      const combineArray = testDetail.map((item1: { quesId: number }) => ({
        ...item1,
        ...resultChange.find(
          (item2: { quesId: number }) => item2.quesId == item1.quesId
        ),
      }));

      let count = 0;
      combineArray.map((item: any) =>
        item.option == item.answer ? (count += 1) : (count += 0)
      );

      await axios
        .post(
          "https://646cf8c57b42c06c3b2c5cbe.mockapi.io/user/" +
            getUserId +
            "/mark",
          {
            userId: getUserId,
            testId: getTestId,
            testQuantityQues: combineArray.length,
            testTrueQues: count,
          }
        )
        .then((response) => {
          console.log(response);
        });

      navigate(`/result?testId=${getTestId}`);
    }
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header />
      <br />

      {/* <p className="text-2xl mt-2 font-bold">{category?.name}</p> */}
      <div className="test-content">
        {testDetail.map(
          (
            item: {
              quesId: number;
              testId: number;
              quesContent: string;
              option1: string;
              option2: string;
              option3: string;
              option4: string;
              answer: string;
            },
            index: number
          ) => (
            <TestItem
              key={index}
              stt={index + 1}
              quesId={item.quesId}
              testId={item.testId}
              quesContent={item.quesContent}
              option1={item.option1}
              option2={item.option2}
              option3={item.option3}
              option4={item.option4}
              answer={item.answer}
              onChange={(e) => changeResult(item.quesId, e.target.value)}
            />
          )
        )}
      </div>

      <button onClick={redirectToResultPage}>Finish !</button>
      <br />
      <br />
      <br />

      <Footer />
    </div>
  );
};
