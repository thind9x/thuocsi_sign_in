import React from "react";
import { Link } from "react-router-dom";

const LoginSuccess = () => {
  return (
    <div className="back">
      <div className="div-center">
        <div className="content">
          <p style={{ textAlign: "center" }}>
            <i
              style={{
                textAlign: "center",
                fontSize: "50px",
                color: "green",
              }}
              className="fa fa-check-circle"
            ></i>
          </p>
          <h5 style={{ textAlign: "center" }}>Bạn đã đăng nhập thành công</h5>
          <p style={{ textAlign: "center" }}>
            Xin chào {window.localStorage.getItem("username")} Cảm ơn bạn đã
            hoàn thành đăng nhập
          </p>
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <Link to="/">
                  <button className="btn btn-success">Trở về trang chủ</button>
                </Link>{" "}
              </div>
            </div>
          </div>

          <hr />
        </div>
      </div>
    </div>
  );
};

export default LoginSuccess;
