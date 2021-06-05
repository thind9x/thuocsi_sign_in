import ArrrowBack from "@material-ui/icons/ArrowBack";
import axios from "axios";
import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import "../login/components/Login.scss";

const Verify = () => {
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const history = useHistory();

  //   var otpm = []; // array for push when user on change
  var query = window.location.search.substring(1);
  var vars = query.split("=");

  var email = vars[1];
  var otp = parseInt(otp1 + otp2 + otp3 + otp4 + otp5);

  const handlSubmit = (e) => {
    console.log(otp);
    if (isNaN(otp)) {
      // setError(true);
      e.preventDefault();
      return false;
    } else {
      axios
        .put(
          "https://api.v2-dev.thuocsi.vn/interview/account/forgot-password/otp",
          {
            email: email,
            otp: otp,
          }
        )
        .then(
          (res) => {
            console.log(res.data);
            history.push({
              pathname: "/reset-password",
              state: { email: email, token: res.data },
            });
          },
          (error) => {
            alert("Vui lòng nhập mã OTP hợp lệ");

            console.log(error);
          }
        );
      e.preventDefault();
      return true;
    }
  };
  return (
    <div className="back">
      <div className="div-center">
        <div className="content">
          <p
            onClick={(e) => {
              history.goBack();
            }}
          >
            {" "}
            <ArrrowBack
              style={{ fontSize: 50, marginBottom: 20, cursor: "pointer" }}
            />
          </p>
          <h3 style={{ textAlign: "left" }}>Valid OTP</h3>
          <p>Vui lòng nhập mã OTP vừa được gửi đến {email} của bạn</p>
          <div
            id="otp"
            className="inputs d-flex flex-row justify-content-center mt-4"
          >
            {" "}
            <input
              className="m-3 text-center form-control rounded"
              type="text"
              id="first"
              maxlength="1"
              required={true}
              onChange={(e) => {
                setOtp1(e.target.value);
              }}
            />{" "}
            <input
              className="m-3 text-center form-control rounded"
              type="text"
              id="second"
              maxlength="1"
              required={true}
              onChange={(e) => {
                setOtp2(e.target.value);
                // otpm.push(otp);
              }}
            />{" "}
            <input
              className="m-3 text-center form-control rounded"
              type="text"
              id="third"
              maxlength="1"
              required={true}
              onChange={(e) => {
                setOtp3(e.target.value);
                // otpm.push(otp);
              }}
            />{" "}
            <input
              className="m-3 text-center form-control rounded"
              type="text"
              id="fourth"
              maxlength="1"
              required={true}
              onChange={(e) => {
                setOtp4(e.target.value);
                // otpm.push(otp);
              }}
            />{" "}
            <input
              className="m-3 text-center form-control rounded"
              type="text"
              id="fifth"
              maxlength="1"
              required={true}
              onChange={(e) => {
                setOtp5(e.target.value);
                // otpm.push(otp);
              }}
            />{" "}
          </div>
          <div className="mt-4">
            {" "}
            <button
              disabled={isNaN(otp) ? true : false}
              onClick={handlSubmit}
              className="btn btn-success w-100"
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Verify);
