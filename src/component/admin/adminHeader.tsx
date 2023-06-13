import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("account");
    navigate(`/`);
  };

  return (
    <div className="admin-header pt-2 flex justify-end">
      <button className="logout-btn" onClick={logout}>
        Log out
      </button>
    </div>
  );
};
