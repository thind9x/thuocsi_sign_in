import React from "react";
import "../login/components/Login.scss";
import { Link } from "react-router-dom";
const SigupSucess = () => {
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
          <h5 style={{ textAlign: "center" }}>Bạn đã đăng ký thành công</h5>
          <p>
            Cảm ơn bạn đã hoàn thành đăng ký, để chứng minh bạn không phải là
            robot chúng tôi đã gửi một liên kết xác nhận trong email của bạn,
            vui lòng kiểm tra và xác nhận
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

export default SigupSucess;
