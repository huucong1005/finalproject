import "../../App.css";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <hr />
      <div className="footer-content">
        <div className="footer-logo" onClick={() => navigate(`/homepage`)}>
          <img src="../../../public/logo.png" alt="" />
          <div>
            <p className="font-mono font-bold text-4xl  mt-1 ml-5">AllQuiZ</p>
            <p className=" mt-1 ml-5"> Number one about quiz</p>
          </div>
        </div>
        <div className="footer-sitemap">
          <p className="mt-3">
            <a
              className="text-center"
              href=""
              onClick={() => navigate(`/homepage`)}
            >
              Home Page
            </a>
          </p>
          <p className="mt-3">
            <a className="text-center" onClick={() => navigate(`/about-us`)}>
              About us
            </a>
          </p>
          <p className="mt-3">
            <a className="text-center" onClick={() => navigate(`/history`)}>
              Point History
            </a>
          </p>
          <p className="mt-3">
            <a className="text-center" onClick={() => navigate(`/`)}>
              Login
            </a>
          </p>
          <p className="mt-3">
            <a className="text-center" onClick={() => navigate(`/homepage`)}>
              Qiuz Category
            </a>
          </p>
          <p className="mt-3">
            Follow:{" "}
            <a className="text-center" href="">
              Facebook
            </a>{" "}
            <a className="text-center" href="">
              Twitter
            </a>
          </p>
        </div>
      </div>
      <hr />
      <br />
      <p className="text-center pb-4">Copyright content ©2023 by .</p>
    </div>
  );
};
