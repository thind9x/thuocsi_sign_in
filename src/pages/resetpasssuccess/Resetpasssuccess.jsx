import React from "react";
import "../login/components/Login.scss";
import { Link } from "react-router-dom";
const Resetpasssuccess = () => {
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
          <h5 style={{ textAlign: "center" }}>Đặt lại mật khẩu thành công</h5>
          <p>
            Tuyệt vời,bạn vừa đặt lại mật khẩu thành công. Vui lòng đăng nhập để
            tiếp tục sử dụng
          </p>
          <div className="container">
            <div className="row">
              <div className="col text-center">
                <Link to="/">
                  <button className="btn btn-success w-100">Đăng nhập</button>
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

export default Resetpasssuccess;
