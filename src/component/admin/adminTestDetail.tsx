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
import Modal from "react-modal";
import { getCate } from "../../redux/slice/categorySlice";
import { getTest, getTestDetail } from "../../redux/slice/testSlice";
import Pagination from "../pagination";
import { AdminHeader } from "./adminHeader";
import { AdminLeftContent } from "./adminLeft";
import AdminQuesItem, { AdminQuesType } from "./adminTestDetailItem";
import { FormAddQues } from "./adminFormQues";

const PageSize = 5;

const AdminTestDetail = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let getTestId = searchParams.get("testId");

  const [isOpenModalAdd, setOpenModalAdd] = useState(false);

  //@ts-ignore
  const auth = JSON.parse(window.localStorage.getItem("account"));
  useEffect(() => {
    if (!auth || auth.userType != 2) {
      navigate(`/`);
    }
    //@ts-ignore
    dispatch(getTest());
    //@ts-ignore
    dispatch(getCate());
    //@ts-ignore
    dispatch(getTestDetail(getTestId));
  }, []);
  //@ts-ignore
  const getTestInfo = useSelector((state) => state.test).test.find(
    (item: any) => item.testId == getTestId
  );
  //@ts-ignore
  const getTestCategory = useSelector((state) => state.cate).category.find(
    (item: any) => item.cateId == getTestInfo?.cateId
  );
  //@ts-ignore
  const testDetail = useSelector((state) => state.test).testdetail;

  const deleteQues = (quesId: number, testId: number) => {
    axios
      .delete(
        "https://646cfa217b42c06c3b2c5ef7.mockapi.io/test/" +
          testId +
          "/question/" +
          quesId
      )
      .then(() => {
        window.location.reload();
      });
  };

  function openModalAdd() {
    if (testDetail.length >= 5) {
      alert("number of test is maximum");
    } else {
      setOpenModalAdd(true);
    }
  }
  function finishAddQues(testId: number) {
    setOpenModalAdd(false);
    //@ts-ignore
    dispatch(getTestDetail(testId));
  }

  console.log(getTestInfo?.testName, getTestCategory?.cateName);

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return testDetail.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, testDetail]);

  return (
    <div className="admin-content">
      <AdminLeftContent />
      <div className="admin-right">
        <AdminHeader />
        <h2 className="text-2xl font-bold px-3 py-4">Detail Test </h2>

        <div className="table w-full py-2 px-3 border border-blue-200">
          <div className="table-row  ">
            <div className="table-cell text-left font-bold pl-2 ">
              Info test:
            </div>
            <div className="table-cell text-left pl-2 ">
              Test id: {getTestId}
            </div>
            <div className="table-cell text-left pl-2 ">
              Test name: {getTestInfo?.testName}
            </div>
            <div className="table-cell text-left pl-2 ">
              By category: {getTestCategory?.cateName}
            </div>
          </div>
        </div>
        <br />

        <div className="table w-full pt-4 px-3">
          <div className="table-header-group">
            <div className="table-row">
              <div className="th-table">Question</div>
              <div className="th-table">Option</div>
              <div className="th-table">Answer</div>
              <div className="th-table">Action</div>
            </div>
          </div>

          <div className="table-row-group">
            {currentTableData?.map(
              (
                item: {
                  quesId: number;
                  testId: number;
                  quesContent: string;
                  answer: string;
                  option1: string;
                  option2: string;
                  option3: string;
                  option4: string;
                },
                index: number
              ) => (
                <AdminQuesItem
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
                  getIdDelete={(testId: number, quesId: number) =>
                    deleteQues(quesId, testId)
                  }
                />
              )
            )}
          </div>
        </div>
        <br />
        <Pagination
          className="pl-2 pagination-bar"
          currentPage={currentPage}
          totalCount={testDetail.length}
          pageSize={PageSize}
          onPageChange={(page: React.SetStateAction<number>) =>
            setCurrentPage(page)
          }
          siblingCount={1}
        />

        <button className="btn btn-add mb-10" onClick={openModalAdd}>
          Add new question
        </button>

        <Modal
          isOpen={isOpenModalAdd}
          onRequestClose={() => setOpenModalAdd(false)}
          contentLabel="Example Modal"
          className="w-3/5 mx-auto my-10 pl-5 pb-10 bg-white border-2 border-stone-500 "
        >
          <button
            type="button"
            className="modal-close-button float-right mr-5 mt-3 text-xl"
            aria-label="Close"
            onClick={() => setOpenModalAdd(false)}
          >
            &times;
          </button>
          <FormAddQues
            finish={(testId: number) => finishAddQues(testId)}
            testId={getTestId}
          />
        </Modal>
      </div>
    </div>
  );
};

export default AdminTestDetail;
