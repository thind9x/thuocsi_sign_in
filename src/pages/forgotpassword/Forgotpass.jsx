import { InputBase } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, withRouter } from "react-router-dom";
import "../register/Register.scss";
import ArrrowBack from "@material-ui/icons/ArrowBack";

const Forgotpass = () => {
  const {
    register,
    handleSubmit,

    formState: { isDirty, isValid, errors }, // here
  } = useForm({ mode: "onChange" });
  const history = useHistory();
  const [error, setError] = useState("");
  const onSubmit = (data) => {
    var email = data.email;
    console.log(data);
    axios
      .post(
        "https://api.v2-dev.thuocsi.vn/interview/account/forgot-password/otp",
        {
          email: email,
        }
      )
      .then(
        (res) => {
          history.push("verify-otp?email=" + email);
        },
        (error) => {
          console.log(error);
          setError("Địa chỉ email không tồn tại");
        }
      );
  };

  return (
    <div className="containter-fluid">
      <div className="col-lg-12 ">
        <div className="row">
          <div id="forgotpass" className="col-lg-6">
            <form
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              id="formforgot"
            >
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
              <h3 style={{ textAlign: "left" }}>Quên mật khẩu </h3>
              <p>Vui lòng nhập email để nhận mã xác thực</p>
              <p>{error}</p>
              <div className="form-group">
                <FormControl variant="outlined" className="col-sm-12">
                  <label for="exampleInputEmail1">
                    Email<span style={{ color: "red" }}>*</span>
                  </label>
                  <InputBase
                    className="form-control"
                    type="text"
                    placeholder="Nhập email"
                    {...register("email", {
                      required: true,

                      pattern: /\S+@\S+\.\S+/,
                    })}
                    labelWidth={70}
                  />
                </FormControl>

                <p style={{ color: "red", fontSize: "13px" }}>
                  {errors.email?.type === "required" && "Vui lòng nhập email"}
                  {errors.email?.type === "pattern" &&
                    "Vui lòng nhập email hợp lệ"}
                </p>
              </div>

              <button
                disabled={!isDirty || !isValid} // here
                className="btn btn-success w-100"
                type="submit"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgotpass;
