import { NavigateFunction, useNavigate } from "react-router-dom";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { FormEditQues, FormEditAnswer } from "./adminFormQues";
import { getTestDetail } from "../../redux/slice/testSlice";
import { useDispatch } from "react-redux";

export type AdminQuesType = {
  testId: number;
  quesId: number;
  quesContent: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
};

const AdminQuesItem: FC<
  AdminQuesType & {
    stt: number;
    getIdDelete: (quesId: number, testId: number) => void;
  }
> = ({
  testId,
  quesId,
  quesContent,
  answer,
  option1,
  option2,
  option3,
  option4,
  getIdDelete,
  stt,
}) => {
  const [isOpenModalEdit, setOpenModalEdit] = useState(false);
  const [isOpenModalChange, setOpenModalChange] = useState(false);

  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  function getIdQuesDelete() {
    getIdDelete(quesId, testId);
  }

  function openModalEdit() {
    setOpenModalEdit(true);
  }
  function finishEditQues(testId: number) {
    setOpenModalEdit(false);
    //@ts-ignore
    dispatch(getTestDetail(testId));
  }

  function openModalChange() {
    setOpenModalChange(true);
  }
  function finishChangeAnswer(testId: number) {
    setOpenModalChange(false);
    //@ts-ignore
    dispatch(getTestDetail(testId));
  }

  return (
    <div className="table-row">
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        {stt}. {quesContent}
      </div>
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        a. {option1} <br />
        b. {option2} <br />
        c. {option3} <br />
        d. {option4}
      </div>
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        <p className="pl-2">{answer}</p>
        <button className="btn btn-edit" onClick={openModalChange}>
          Change
        </button>
      </div>

      <div className="table-cell text-left pl-2 border-b border-blue-200">
        <button className="btn btn-edit" onClick={openModalEdit}>
          Edit
        </button>
        <br />
        <button className="btn btn-delete" onClick={getIdQuesDelete}>
          Delete
        </button>
      </div>

      <Modal
        isOpen={isOpenModalEdit}
        onRequestClose={() => setOpenModalEdit(false)}
        contentLabel="Example Modal"
        className="w-3/5 mx-auto my-10 pl-5 pb-10 bg-white border-2 border-stone-500 "
      >
        <button
          type="button"
          className="modal-close-button float-right mr-5 mt-3 text-xl"
          aria-label="Close"
          onClick={() => setOpenModalEdit(false)}
        >
          &times;
        </button>
        <FormEditQues
          finish={(testId: number) => finishEditQues(testId)}
          testId={testId}
          quesId={quesId}
        />
      </Modal>

      <Modal
        isOpen={isOpenModalChange}
        onRequestClose={() => setOpenModalChange(false)}
        contentLabel="Example Modal"
        className="w-3/5 mx-auto my-10 pl-5 pb-10 bg-white border-2 border-stone-500 "
      >
        <button
          type="button"
          className="modal-close-button float-right mr-5 mt-3 text-xl"
          aria-label="Close"
          onClick={() => setOpenModalChange(false)}
        >
          &times;
        </button>
        <FormEditAnswer
          finish={(testId: number) => finishChangeAnswer(testId)}
          testId={testId}
          quesId={quesId}
        />
      </Modal>
    </div>
  );
};

export default AdminQuesItem;
