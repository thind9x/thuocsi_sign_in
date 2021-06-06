import ArrrowBack from "@material-ui/icons/ArrowBack";
import axios from "axios";
import React, { useEffect } from "react";
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputBase } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
const Newpassword = () => {
  const history = useHistory();
  const location = useLocation();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    console.log(location.state.token.data.toString());
    console.log(location.state);
  }, [location]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { isDirty, isValid, errors }, // here
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log(data);

    axios
      .put(
        "https://api.v2-dev.thuocsi.vn/interview/account/forgot-password/password",
        {
          email: "thind9x@gmail.com",
          password: "Thind9x@P",
          token: "NjBiYTExODQ1NDVmZWZlMDY1NTY5OGMxLjE2MjI5MTI0OTY=",
        },
        {
          headers: {},
        }
      )
      .then(
        (res) => {
          console.log(res);
          history.push("/reset-password-success");
        },
        (error) => {
          console.log(error);
          alert("Đã có lỗi sảy ra");
        }
      );
  };

  return (
    <div className="container">
      <div className="col-lg-12">
        <div id="forgotpass" className="col-lg-6">
          <p
            onClick={(e) => {
              history.goBack();
            }}
          >
            <ArrrowBack style={{ fontSize: 50, marginBottom: 20 }} />
          </p>

          <h3 style={{ textAlign: "left" }}>Tạo lại mật khẩu</h3>
          <hr />
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <FormControl className="col-sm-12" variant="outlined">
                <label>
                  Nhập Mật Khẩu <span style={{ color: "red" }}>*</span>
                </label>
                <InputBase
                  id="outlined-adornment-password"
                  className="form-control"
                  type={values.showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    validate: (value) =>
                      value === watch("confirmpassword") ||
                      "Passwords don't match.",
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@%?])[A-Za-z\d#$@%?]+$/,
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
                {errors.password?.type === "minLength" &&
                  "MK Tối thiểu 8 ký  tự"}
                {errors.password?.type === "pattern" &&
                  "Mật khẩu phải có :1 chữ in hoa, chữ viết thường và 1 ký tự đặc biệt "}
              </p>
            </div>
            <div className="form-group">
              <FormControl className="col-sm-12" variant="outlined">
                <label>
                  Nhập Lại Mật Khẩu <span style={{ color: "red" }}>*</span>
                </label>
                <InputBase
                  className="form-control"
                  type={values.showPassword ? "text" : "password"}
                  placeholder="Nhập lại  mật khẩu"
                  {...register("confirmpassword", {
                    validate: (value) =>
                      value === watch("password") || "Passwords don't match.",
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
                {errors.confirmpassword?.type === "required" &&
                  "Vui lòng nhập lại mật khẩu"}
                {errors.confirmpassword?.type === "validate" &&
                  "Hai mật khẩu không giống nhau"}
              </p>
            </div>

            <button
              disabled={!isDirty || !isValid}
              className="btn btn-success w-100"
              type="submit"
              className="btn btn-success w-100"
            >
              Đặt lại mật khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Newpassword);
