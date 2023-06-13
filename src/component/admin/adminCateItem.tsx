import { FC, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export type AdminCateType = {
  cateId: number;
  cateName: string;
  createdAt: string;
};

const AdminCateItem: FC<
  AdminCateType & { getIdDelete: (val: number) => void }
> = ({ cateId, cateName, createdAt, getIdDelete }) => {
  const navigate: NavigateFunction = useNavigate();
  function getIdCate() {
    getIdDelete(cateId);
  }

  return (
    <div className="table-row">
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        {cateId}
      </div>
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        {cateName}
      </div>
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        {createdAt}
      </div>
      <div className="table-cell text-left pl-2 border-b border-blue-200">
        <button
          className="btn btn-edit"
          onClick={() => navigate(`/admin-cate-edit?cateId=${cateId}`)}
        >
          Edit
        </button>
        <button className="btn btn-delete" onClick={getIdCate}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminCateItem;
