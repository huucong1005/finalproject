import { FC, Key, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getTest } from "../../redux/slice/testSlice";
import HomeCateTestItem, { TestType } from "./homeCateTestItem";

export type CateType = {
  cateId: number;
  cateName: string;
  createdAt: string;
};

const HomeCateItem: FC<CateType> = ({ cateId, cateName, createdAt }) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // get list cate from server
    //@ts-ignore
    dispatch(getTest());
  }, []);
  //@ts-ignore
  const testList = useSelector((state) => state.test).test.filter(
    (item: { cateId: number }) => item.cateId == cateId
  );

  return (
    <>
      <div className="category-item">
        <div
          className="category-title"
          onClick={() => navigate(`/category?cateId=${cateId}`)}
        >
          {cateName}
        </div>
        {testList.map(
          (
            item: { testId: number; testName: string; cateId: number },
            index: number
          ) =>
            index < 4 && (
              <HomeCateTestItem
                key={index}
                testId={item.testId}
                testName={item.testName}
                cateId={item.cateId}
                createdAt={""}
              />
            )
        )}
      </div>
    </>
  );
};

export default HomeCateItem;
