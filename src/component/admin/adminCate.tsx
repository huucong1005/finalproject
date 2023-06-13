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
import { getTest } from "../../redux/slice/testSlice";

import Pagination from "../pagination";

import AdminCateItem, { AdminCateType } from "./adminCateItem";
import { AdminHeader } from "./adminHeader";
import { AdminLeftContent } from "./adminLeft";

let PageSize = 5;

const AdminCateList = () => {
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
    dispatch(getCate());
    //@ts-ignore
    dispatch(getTest());
  }, []);

  //@ts-ignore
  const categoryList = useSelector((state) => state.cate).category;
  //@ts-ignore
  const testList = useSelector((state) => state.test).test;

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return categoryList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, categoryList]);

  const deleteCate = (cateId: number) => {
    if (testList.find((item: any) => item.cateId == cateId)) {
      alert(
        "this category instance any test inside, can not delete until remove all test!"
      );
    } else {
      axios
        .delete(
          "https://646cf9a37b42c06c3b2c5e0b.mockapi.io/category/" + cateId
        )
        .then(() => {
          window.location.reload();
        });
    }
  };

  return (
    <div className="admin-content">
      <AdminLeftContent />
      <div className="admin-right">
        <AdminHeader />
        <h2 className="text-2xl font-bold px-3 py-4">List Category</h2>

        <button
          className="btn btn-add px-3 py-1 "
          onClick={() => navigate("/admin-cate-add")}
        >
          Create new category
        </button>

        <div className="table w-full pt-4 px-3">
          <div className="table-header-group">
            <div className="table-row">
              <div className="th-table">ID</div>
              <div className="th-table">Name</div>
              <div className="th-table">Created date</div>
              <div className="th-table">Action</div>
            </div>
          </div>

          <div className="table-row-group">
            {/* {categoryList.map((item: { cateId: number; cateName: string; createdAt: string; }, index:number) => <AdminCateItem  key={index} 
              getIdDelete={(cateId: number)=> deleteCate(cateId)}
              cateId={item.cateId}    cateName={item.cateName}  createdAt={item.createdAt}/>)} */}
            {currentTableData?.map(
              (
                item: { cateId: number; cateName: string; createdAt: string },
                index: number
              ) => (
                <AdminCateItem
                  key={index}
                  getIdDelete={(cateId: number) => deleteCate(cateId)}
                  cateId={item.cateId}
                  cateName={item.cateName}
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
          totalCount={categoryList.length}
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

export default AdminCateList;
