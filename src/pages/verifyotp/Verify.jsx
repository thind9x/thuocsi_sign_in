import ArrrowBack from "@material-ui/icons/ArrowBack";
import axios from "axios";
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import "../login/components/Login.scss";
import { useForm } from "react-hook-form";

const Verify = () => {
  const history = useHistory();

  //   var otpm = []; // array for push when user on change
  var query = window.location.search.substring(1);
  var vars = query.split("=");

  var email = vars[1];
  const {
    register,
    handleSubmit,

    formState: { isDirty, isValid }, // here
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    console.log(data);
    var otp = parseInt(
      data.otp1 + data.otp2 + data.otp3 + data.otp4 + data.otp5
    );
    console.log(otp);
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
  };
  return (
    <div className="container-fluid">
      <div className="col-lg-6" id="formboxshad">
        <div className="content" style={{ marginTop: "5%" }}>
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
          <h3 style={{ textAlign: "left" }}>Xác thực OTP</h3>
          <p>Vui lòng nhập mã OTP vừa được gửi đến {email} của bạn</p>
          <div
            id="otp"
            className="inputs d-flex flex-row justify-content-center mt-4"
          >
            {" "}
            <form
              className="inputs d-flex flex-row justify-content-center mt-4"
              id="myform1"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="m-3 text-center form-control rounded"
                type="text"
                id="first"
                maxlength="1"
                {...register("otp1", {
                  required: true,
                  maxLength: 1,
                })}
              />{" "}
              <input
                className="m-3 text-center form-control rounded"
                type="text"
                id="second"
                maxlength="1"
                {...register("otp2", {
                  required: true,
                  maxLength: 1,
                })}
              />{" "}
              <input
                className="m-3 text-center form-control rounded"
                type="text"
                id="third"
                maxlength="1"
                {...register("otp3", {
                  required: true,
                  maxLength: 1,
                })}
              />{" "}
              <input
                className="m-3 text-center form-control rounded"
                type="text"
                id="fourth"
                maxlength="1"
                {...register("otp4", {
                  required: true,
                  maxLength: 1,
                })}
              />{" "}
              <input
                className="m-3 text-center form-control rounded"
                type="text"
                id="fifth"
                maxlength="1"
                {...register("otp5", {
                  required: true,
                  maxLength: 1,
                })}
              />{" "}
            </form>
          </div>
          <div className="mt-4">
            {" "}
            <button
              disabled={!isDirty || !isValid} // here
              form="myform1"
              className="btn btn-success w-100"
            >
              Gửi
            </button>
            <p style={{ textAlign: "center" }}>
              Bạn chưa nhận được mã? Gửi lại sau :{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Verify);
