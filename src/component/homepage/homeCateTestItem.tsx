import { FC, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export type TestType = {
  testId: number;
  cateId: number;
  testName: string;
  createdAt: string;
};

const HomeCateTestItem: FC<TestType> = ({
  testId,
  cateId,
  testName,
  createdAt,
}) => {
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

export default HomeCateTestItem;
