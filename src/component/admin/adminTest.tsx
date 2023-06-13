import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "../../App.css";
import { getCate } from "../../redux/slice/categorySlice";
import { getTest, getTestDetail } from "../../redux/slice/testSlice";
import Pagination from "../pagination";
import { AdminHeader } from "./adminHeader";
import { AdminLeftContent } from "./adminLeft";

import AdminTestItem, { AdminTestType } from "./adminTestItem";

const PageSize = 5;

const AdminTestList = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //@ts-ignore
  const auth = JSON.parse(window.localStorage.getItem("account"));
  useEffect(() => {
    if (!auth || auth.userType != 2) {
      navigate(`/`);
    }
    //@ts-ignore
    dispatch(getTest());
  }, []);
  //@ts-ignore
  const testList = useSelector((state) => state.test).test;

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return testList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, testList]);

  const deleteTest = (testId: number) => {
    axios
      .delete("https://646cfa217b42c06c3b2c5ef7.mockapi.io/test/" + testId)
      .then(() => {
        window.location.reload();
      });
  };

  return (
    <div className="admin-content">
      <AdminLeftContent />
      <div className="admin-right">
        <AdminHeader />
        <h2 className="text-2xl font-bold px-3 py-4">List Test</h2>
        <button
          className="btn btn-add px-3 py-1"
          onClick={() => navigate("/admin-test-add")}
        >
          Create new test
        </button>

        <div className="table w-full pt-4 px-3">
          <div className="table-header-group">
            <div className="table-row">
              <div className="th-table">ID</div>
              <div className="th-table">Name</div>
              <div className="th-table">Category</div>
              <div className="th-table">Created date</div>
              <div className="th-table">Action</div>
            </div>
          </div>

          <div className="table-row-group">
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
                <AdminTestItem
                  key={index}
                  getIdDelete={(testId: number) => deleteTest(testId)}
                  testId={item.testId}
                  cateId={item.cateId}
                  testName={item.testName}
                  createdAt={item.createdAt}
                />
              )
            )}
          </div>
        </div>
        <br />
        <Pagination
          className="pl-2 pagination-bar"
          currentPage={currentPage}
          totalCount={testList.length}
          pageSize={PageSize}
          onPageChange={(page: React.SetStateAction<number>) =>
            setCurrentPage(page)
          }
          siblingCount={1}
        />
      </div>
    </div>
  );
};

export default AdminTestList;
