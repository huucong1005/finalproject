import "../../App.css";
import { SiIconfinder } from "react-icons/si";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { validateFieldsNatively } from "@hookform/resolvers";
import { ListItem } from "@mui/material";

const dataSidebar = [
  { link: "/admin-cate", name: "Category" },
  { link: "/admin-test", name: "Test" },
];

export const AdminLeftContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="admin-left">
      <div className="admin-logo flex justify-center pt-2 ">
        <SiIconfinder className="pt-2 pr-2" />
        <b> ADMIN</b>
      </div>
      <hr />

      <div className="admin-left-sidebar">
        <ul className="sidebar-list">
          {dataSidebar.map((item) => {
            return (
              <li
                className="row-item"
                id={window.location.pathname.search(item.link) ? "" : "active"}
                onClick={() => {
                  navigate(item.link);
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
