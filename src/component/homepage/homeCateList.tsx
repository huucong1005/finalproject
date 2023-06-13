import React, { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "../../App.css";
import { getCate } from "../../redux/slice/categorySlice";
import HomeCateItem, { CateType } from "./homeCateItem";
import Pagination from "../pagination";

let PageSize = 6;

const HomeCateList = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // get list cate from server
    //@ts-ignore
    dispatch(getCate());
  }, []);
  //@ts-ignore
  const categoryList = useSelector((state) => state.cate).category;

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return categoryList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, categoryList]);

  return (
    <>
      <p className="text-center text-4xl">Category</p>
      <div className="category">
        {currentTableData?.map(
          (
            item: { cateId: any; cateName: any; createdAt: string },
            index: number
          ) => (
            <HomeCateItem
              key={index}
              cateId={item.cateId}
              cateName={item.cateName}
              createdAt={item.createdAt}
            />
          )
        )}
      </div>
      <Pagination
        className="pl-2 pagination-bar pb-10 flex justify-center"
        currentPage={currentPage}
        totalCount={categoryList.length}
        pageSize={PageSize}
        onPageChange={(page: React.SetStateAction<number>) =>
          setCurrentPage(page)
        }
        siblingCount={1}
      />
    </>
  );
};

export default HomeCateList;
