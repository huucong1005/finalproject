import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getCate } from "../../redux/slice/categorySlice";

export type AdminTestType = {
  testId: number;
  cateId: number;
  testName: string;
  createdAt: string;
};

const AdminTestItem: FC<
  AdminTestType & { getIdDelete: (val: number) => void }
> = ({ cateId, testId, testName, createdAt, getIdDelete }) => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  function getIdTest() {
    getIdDelete(testId);
  }

  useEffect(() => {
    //@ts-ignore
    dispatch(getCate());
  }, []);
  //@ts-ignore
  const categoryList = useSelector((state) => state.cate).category;
  const getCategory = categoryList.find((item: any) => item.cateId == cateId);

  return (
    <div className="table-row">
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        {testId}
      </div>
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        {testName}
      </div>
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        {getCategory?.cateName}
      </div>
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        {createdAt}
      </div>
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        <button
          className="btn btn-view"
          onClick={() => navigate(`/admin-test-detail?testId=${testId}`)}
        >
          Detail
        </button>
        <button
          className="btn btn-edit"
          onClick={() => navigate(`/admin-test-edit?testId=${testId}`)}
        >
          Edit
        </button>
        <button className="btn btn-delete" onClick={getIdTest}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminTestItem;
