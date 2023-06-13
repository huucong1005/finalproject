import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../App.css";
import { AdminTestType } from "./adminTestItem";
import {
  getQuestionDetail,
  getTestDetail,
  testSlice,
} from "../../redux/slice/testSlice";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const FormAddQues: FC<{
  testId: any;
  finish: (testId: number) => void;
}> = ({ finish, testId }) => {
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");

  const input = document.getElementById("valueoption1") as HTMLInputElement;
  const inputAnswer = () => {
    setAnswer(input.value);
  };
  console.log(answer);
  const schema = yup
    .object({
      quesContent: yup.string().min(3),
      answer: yup.string(),
      option1: yup.string().min(1),
      option2: yup.string().min(1),
      option3: yup.string().min(1),
      option4: yup.string().min(1),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    if (answer != "") {
      setValue("answer", answer);
    }

    fetch(
      "https://646cfa217b42c06c3b2c5ef7.mockapi.io/test/" +
        testId +
        "/question",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        finish(testId);
      });
  };

  return (
    <div className="mt-3">
      <h2 className="text-2xl font-bold px-3 py-4">Add new question</h2>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="pl-4">
        <label style={{ width: "40%" }} htmlFor="quesContent">
          Question
        </label>
        <input
          style={{
            marginLeft: "20px",
            padding: "2px 0 2px 5px",
            width: "80%",
            marginBottom: "20px",
          }}
          {...register("quesContent")}
        />
        <p className="text-red-600">
          {errors.quesContent ? "*" + errors.quesContent.message : ""}
        </p>

        <p className="text-green-500">
          {" "}
          ( Right answer is <b>option 1</b> for default ){" "}
        </p>
        <label style={{ width: "40%" }} htmlFor="option1">
          Option 1:
        </label>
        <input
          onKeyUp={inputAnswer}
          id="valueoption1"
          style={{
            marginLeft: "20px",
            padding: "2px 0 2px 5px",
            width: "80%",
            marginBottom: "20px",
          }}
          {...register("option1")}
        />
        <p className="text-red-600">
          {errors.option1 ? "*" + errors.option1.message : ""}
        </p>
        <label style={{ width: "40%" }} htmlFor="option2">
          Option 2:
        </label>
        <input
          style={{
            marginLeft: "20px",
            padding: "2px 0 2px 5px",
            width: "80%",
            marginBottom: "20px",
          }}
          {...register("option2")}
        />
        <p className="text-red-600">
          {errors.option2 ? "*" + errors.option2.message : ""}
        </p>
        <label style={{ width: "40%" }} htmlFor="option3">
          Option 3:
        </label>
        <input
          style={{
            marginLeft: "20px",
            padding: "2px 0 2px 5px",
            width: "80%",
            marginBottom: "20px",
          }}
          {...register("option3")}
        />
        <p className="text-red-600">
          {errors.option3 ? "*" + errors.option3.message : ""}
        </p>
        <label style={{ width: "40%" }} htmlFor="option4">
          Option 4:
        </label>
        <input
          style={{
            marginLeft: "20px",
            padding: "2px 0 2px 5px",
            width: "80%",
            marginBottom: "20px",
          }}
          {...register("option4")}
        />
        <p className="text-red-600">
          {errors.option4 ? "*" + errors.option4.message : ""}
        </p>

        <input
          type="button"
          className="cancel mr-5"
          onClick={() => finish(testId)}
          value="Cancel"
        />
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const FormEditQues: FC<{
  testId: number;
  quesId: number;
  finish: (testId: number) => void;
}> = ({ finish, testId, quesId }) => {
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");

  const input = document.getElementById("valueoption1") as HTMLInputElement;
  const inputAnswer = () => {
    setAnswer(input.value);
  };
  console.log(answer);
  const schema = yup
    .object({
      quesContent: yup.string().min(4),
      answer: yup.string(),
      option1: yup.string(),
      option2: yup.string(),
      option3: yup.string(),
      option4: yup.string(),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      const response = await fetch(
        "https://646cfa217b42c06c3b2c5ef7.mockapi.io/test/" +
          testId +
          "/question/" +
          quesId
      );
      const data = await response.json();
      return {
        quesContent: data.quesContent,
        option1: data.option1,
        answer: data.answer,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
      };
    },
  });

  const onSubmit = (data: any) => {
    if (answer != "") {
      setValue("answer", answer);
    }

    fetch(
      "https://646cfa217b42c06c3b2c5ef7.mockapi.io/test/" +
        testId +
        "/question/" +
        quesId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        finish(testId);
      });
  };

  return (
    <div className="mt-3">
      <h2 className="text-2xl font-bold px-3 py-4">Edit question</h2>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="pl-4">
        <label style={{ width: "40%" }} htmlFor="quesContent">
          Question
        </label>
        <input
          style={{
            marginLeft: "20px",
            padding: "2px 0 2px 5px",
            width: "80%",
            marginBottom: "20px",
          }}
          {...register("quesContent")}
        />
        <p className="text-red-600">
          {errors.quesContent ? "*" + errors.quesContent.message : ""}
        </p>

        <p className="text-green-500">
          {" "}
          ( Right answer is <b>option 1</b> for default ){" "}
        </p>
        <label style={{ width: "40%" }} htmlFor="option1">
          Option 1:
        </label>
        <input
          onKeyUp={inputAnswer}
          id="valueoption1"
          style={{
            marginLeft: "20px",
            padding: "2px 0 2px 5px",
            width: "80%",
            marginBottom: "20px",
          }}
          {...register("option1")}
        />
        <p className="text-red-600">
          {errors.option1 ? "*" + errors.option1.message : ""}
        </p>
        <label style={{ width: "40%" }} htmlFor="option2">
          Option 2:
        </label>
        <input
          style={{
            marginLeft: "20px",
            padding: "2px 0 2px 5px",
            width: "80%",
            marginBottom: "20px",
          }}
          {...register("option2")}
        />
        <p className="text-red-600">
          {errors.option2 ? "*" + errors.option2.message : ""}
        </p>
        <label style={{ width: "40%" }} htmlFor="option3">
          Option 3:
        </label>
        <input
          style={{
            marginLeft: "20px",
            padding: "2px 0 2px 5px",
            width: "80%",
            marginBottom: "20px",
          }}
          {...register("option3")}
        />
        <p className="text-red-600">
          {errors.option3 ? "*" + errors.option3.message : ""}
        </p>
        <label style={{ width: "40%" }} htmlFor="option4">
          Option 4:
        </label>
        <input
          style={{
            marginLeft: "20px",
            padding: "2px 0 2px 5px",
            width: "80%",
            marginBottom: "20px",
          }}
          {...register("option4")}
        />
        <p className="text-red-600">
          {errors.option4 ? "*" + errors.option4.message : ""}
        </p>

        <input
          type="button"
          className="cancel mr-5"
          onClick={() => finish(testId)}
          value="Cancel"
        />
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const FormEditAnswer: FC<{
  testId: number;
  quesId: number;
  finish: (testId: number) => void;
}> = ({ finish, testId, quesId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(getQuestionDetail(testId, quesId));
  }, []);
  //@ts-ignore
  const questionDetail = useSelector((state) => state.test).questiondetail;

  const schema = yup
    .object({
      quesContent: yup.string().min(4),
      answer: yup.string(),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: async () => {
      const response = await fetch(
        "https://646cfa217b42c06c3b2c5ef7.mockapi.io/test/" +
          testId +
          "/question/" +
          quesId
      );
      const data = await response.json();
      return {
        quesContent: data.quesContent,
        answer: data.answer,
      };
    },
  });

  const onSubmit = (data: any) => {
    fetch(
      "https://646cfa217b42c06c3b2c5ef7.mockapi.io/test/" +
        testId +
        "/question/" +
        quesId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        finish(testId);
      });
  };

  return (
    <div className="mt-3">
      <h2 className="text-2xl font-bold px-3 py-4">Change answer</h2>
      <br />
      <form onSubmit={handleSubmit(onSubmit)} className="pl-4">
        <label style={{ width: "40%" }} htmlFor="quesContent">
          Question
        </label>
        <input
          readOnly
          style={{
            marginLeft: "20px",
            padding: "2px 0 2px 5px",
            width: "80%",
            marginBottom: "20px",
          }}
          {...register("quesContent")}
        />
        <p className="text-red-600">
          {errors.quesContent ? "*" + errors.quesContent.message : ""}
        </p>

        <label style={{ width: "40%" }} htmlFor="option1">
          Answer
        </label>
        <select
          {...register("answer")}
          style={{
            border: "solid 1px grey",
            borderRadius: "5px",
            marginLeft: "28px",
            padding: "0px 2px 2px 5px",
            width: "80%",
            height: "30px",
            marginBottom: "20px",
          }}
        >
          <option value={questionDetail.option1}>
            {questionDetail.option1}
          </option>
          <option value={questionDetail.option2}>
            {questionDetail.option2}
          </option>
          <option value={questionDetail.option3}>
            {questionDetail.option3}
          </option>
          <option value={questionDetail.option4}>
            {questionDetail.option4}
          </option>
        </select>
        <p className="text-red-600">
          {errors.answer ? "*" + errors.answer.message : ""}
        </p>

        <input
          type="button"
          className="cancel mr-5"
          onClick={() => finish(testId)}
          value="Cancel"
        />
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};
