import { FC, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { TestType } from "./homeCateTestItem";

const CateTest: FC<TestType> = ({ testId, cateId, testName, createdAt }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <div
        className="category-content"
        onClick={() => navigate(`/test?testId=${testId}`)}
      >
        Test {testId}. {testName}
      </div>
      <hr />
    </>
  );
};

export default CateTest;
