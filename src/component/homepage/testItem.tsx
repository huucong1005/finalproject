import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getTest } from "../../redux/slice/testSlice";
import HomeCateTestItem, { TestType } from "./homeCateTestItem";

export type QuestionType = {
  quesId: number;
  quesContent: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  testId: number;
};

const TestItem: FC<
  QuestionType & { stt: number; onChange: (e: any) => void }
> = ({
  quesId,
  quesContent,
  option1,
  option2,
  option3,
  option4,
  answer,
  testId,
  stt,
  onChange,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="question-item">
      <div className="text-left mb-3">
        {stt}. {quesContent}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-left ml-16">
          <input
            onChange={onChange}
            type="radio"
            name={"ques" + quesId}
            value={option1}
          />{" "}
          {option1}
        </div>
        <div className="text-left ml-16">
          <input
            onChange={onChange}
            type="radio"
            name={"ques" + quesId}
            value={option2}
          />{" "}
          {option2}
        </div>
        <div className="text-left ml-16">
          <input
            onChange={onChange}
            type="radio"
            name={"ques" + quesId}
            value={option3}
          />{" "}
          {option3}
        </div>
        <div className="text-left ml-16">
          <input
            onChange={onChange}
            type="radio"
            name={"ques" + quesId}
            value={option4}
          />{" "}
          {option4}
        </div>
      </div>
    </div>
  );
};

export default TestItem;
