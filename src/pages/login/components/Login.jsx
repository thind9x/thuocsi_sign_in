import { InputBase } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, withRouter } from "react-router-dom";
import "../../register/Register.scss";
import Checkbox from "@material-ui/core/Checkbox";

const Login = () => {
  const {
    register,
    handleSubmit,

    formState: { isDirty, isValid, errors }, // here
  } = useForm({ mode: "onChange" });
  const history = useHistory();
  const [error, setError] = useState("");
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    var username = data.username;
    var password = data.password;
    console.log(data);
    axios
      .post("https://api.v2-dev.thuocsi.vn/interview/authorization", {
        username: username,
        password: password,
      })
      .then(
        (res) => {
          console.log(res);
          window.localStorage.setItem("username", username);
          history.push("/login-success");
        },
        (error) => {
          console.log(error);
          setError("Sai tên tài khoản hoặc mật khẩu");
        }
      );
  };

  return (
    <div className="containter">
      <div className="col-lg-12 ">
        <div className="row">
          <div id="formboxshad" className="col-lg-6 ">
            <form
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              id="formlogin"
            >
              <h3 style={{ textAlign: "center" }}>Đăng nhập</h3>

              <p>{error}</p>
              <div className="form-group">
                <FormControl variant="outlined" className="col-sm-12">
                  <label for="exampleInputEmail1">
                    Tên đăng nhập<span style={{ color: "red" }}>*</span>
                  </label>
                  <InputBase
                    className="form-control"
                    type="text"
                    placeholder="Tên tài khoản"
                    {...register("username", {
                      required: true,

                      minLength: 5,
                    })}
                    labelWidth={70}
                  />
                </FormControl>

                <p style={{ color: "red", fontSize: "13px" }}>
                  {" "}
                  {errors.username?.type === "required" &&
                    "Vui lòng nhập tên tài khoản"}
                </p>
              </div>
              <div className="form-group">
                <FormControl className="col-sm-12" variant="outlined">
                  <label>
                    Mật Khẩu <span style={{ color: "red" }}>*</span>
                  </label>
                  <InputBase
                    id="outlined-adornment-password"
                    className="form-control"
                    type={values.showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>

                <p style={{ color: "red", fontSize: "13px" }}>
                  {" "}
                  {errors.password?.type === "required" &&
                    "Vui lòng nhập mật khẩu"}
                </p>
              </div>
              <div className="row">
                <span style={{ fontSize: "14px", marginLeft: "3%" }}>
                  <input
                    style={{
                      fontSize: "14px",

                      filter: " hue-rotate(240deg)",
                    }}
                    type="checkbox"
                  />{" "}
                  Giữ tôi luôn đăng nhập
                </span>
                <Link
                  to="/forgot-password"
                  style={{
                    marginLeft: "55%",
                    textDecoration: "none",
                    fontSize: "14px",
                    color: "#3fc35f",
                  }}
                >
                  <p>Quên mật khẩu</p>
                </Link>
              </div>
              <button
                disabled={!isDirty || !isValid} // here
                className="btn btn-success w-100"
                type="submit"
              >
                Đăng nhập
              </button>
              <hr />
              <p style={{ textAlign: "center" }}>
                {" "}
                Bạn chưa có tài khoản ? :{" "}
                <Link
                  style={{ color: "#3fc35f", textDecoration: "none" }}
                  to="/sign-up"
                >
                  Đăng ký
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
