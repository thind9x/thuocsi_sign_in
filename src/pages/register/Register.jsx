import { InputBase } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./Register.scss";
const Register = () => {
  // const [level, setLevel] = useState("");

  const [errorReg, setErrorReg] = useState("");
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const history = useHistory();
  const [selectedValue, setSelectedValue] = useState("INTERNSHIP");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // setLevel(event.target.value);
  };

  const {
    register,
    formState: { isDirty, isValid, errors },
    handleSubmit,
    watch,
  } = useForm({ mode: "all" });
  const onSubmit = (data) => {
    console.log(data.confirmpassword);
    var username = data.username;
    var name = data.name;
    var email = data.email;
    var phone = data.phone;
    var sex = data.gender;
    var password = data.password;
    axios
      .post("https://api.v2-dev.thuocsi.vn/interview/account", {
        username: username,
        displayName: name,
        email: email,
        phone: phone,
        sex: sex,
        class: selectedValue,
        password: password,
      })
      .then(
        (res) => {
          console.log(res);
          history.push("/sign-up-success");
        },
        (error) => {
          console.log(error);
          setErrorReg("Đăng ký thất bại, email hoặc tên người dùng đã tồn tại");
        }
      );
  };

  return (
    <div className="container">
      <div className="col-lg-12">
        <div className="row">
          <div id="formboxshad" className="col-lg-8 ">
            <form
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              id="formlogin"
            >
              <h3 style={{ textAlign: "center" }}>Đăng ký tài khoản</h3>

              <p style={{ textAlign: "center", color: "red" }}>{errorReg}</p>
              <div className="col-sm-12">
                <div className="form-group">
                  <FormControl className="col-sm-12" variant="outlined">
                    <label>
                      Tên Đăng nhập <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputBase
                      style={{ width: 100 }}
                      fullWidth={true}
                      id="outlined-adornment-password"
                      type="text"
                      placeholder="Nhập tên tài khoản"
                      rows="3"
                      className="form-control w-100"
                      {...register("username", {
                        required: true,
                        maxLength: 20,
                        minLength: 5,
                        pattern: /^[a-z0-9_.]+$/,
                      })}
                    />
                  </FormControl>

                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    {errors.username?.type === "required" &&
                      "Vui lòng nhập tên tài khoản"}
                    {errors.username?.type === "minLength" &&
                      "Tối thiểu 5 ký  tự"}
                    {errors.username?.type === "pattern" &&
                      "Tài khoản chỉ chấp nhận chữ viết thường, chữ số và dấu _ "}
                  </p>
                </div>
                <div className="row">
                  <div class="col-sm-6 ">
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

                  <div className="col-sm-6">
                    <FormControl className="col-sm-12" variant="outlined">
                      <label>
                        Nhập Lại Mật Khẩu{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <InputBase
                        className="form-control"
                        type={values.showPassword ? "text" : "password"}
                        placeholder="Nhập lại  mật khẩu"
                        {...register("confirmpassword", {
                          validate: (value) =>
                            value === watch("password") ||
                            "Passwords don't match.",
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
                </div>

                <div className="form-group">
                  <label>
                    Giới tính <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    className="form-control"
                    id="selectgender"
                    {...register("gender", {
                      required: true,
                    })}
                  >
                    <option value="">--</option>

                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    {errors.gender?.type === "required" &&
                      "Vui lòng chọn giới tính"}
                  </p>
                </div>
                <div className="form-group" inputProps={{ "aria-label": "A" }}>
                  <label>Bạn là: </label>
                  <br />
                  <span className="col-sm-6" style={{ paddingLeft: "5%" }}>
                    <Checkbox
                      checked={selectedValue === "INTERNSHIP"}
                      value="INTERNSHIP"
                      onChange={handleChange}
                      style={{ color: "green" }}
                      name="radio-button-demo"
                    />
                    Thực tập sinh
                  </span>
                  <span className="col-sm-6" style={{ paddingLeft: "5%" }}>
                    <Checkbox
                      checked={selectedValue === "FRESHER"}
                      value="FRESHER"
                      name="radio-button-demo"
                      onChange={handleChange}
                      style={{ color: "green", paddingLeft: "5%" }}
                    />
                    Mới ra trường
                  </span>
                  <span className="col-sm-6" style={{ paddingLeft: "5%" }}>
                    <Checkbox
                      checked={selectedValue === "JUNIOR"}
                      value="JUNIOR"
                      onChange={handleChange}
                      name="radio-button-demo"
                      style={{ color: "green" }}
                    />
                    Đã có Kinh Nghiệm
                  </span>
                </div>

                <div className="form-group">
                  <FormControl className="col-sm-12" variant="outlined">
                    <label>
                      Tên Hiện Thị <span style={{ color: "red" }}>*</span>
                    </label>
                    <InputBase
                      id="outlined-adornment-password"
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên hiện thị."
                      className="form-control"
                      {...register("name", { required: true })}
                    />
                  </FormControl>
                  <p style={{ color: "red", fontSize: "13px" }}>
                    {" "}
                    {errors.name?.type === "required" && "Vui lòng nhập tên"}
                  </p>{" "}
                </div>
                <div className="row">
                  <div className="col-sm-6 ">
                    <FormControl className="col-sm-12" variant="outlined">
                      <label>
                        Email <span style={{ color: "red" }}>*</span>
                      </label>
                      <InputBase
                        id="outlined-adornment-password"
                        type="text"
                        placeholder="Nhập email"
                        rows="3"
                        className="form-control"
                        {...register("email", {
                          required: true,

                          pattern: /\S+@\S+\.\S+/,
                        })}
                      />
                    </FormControl>

                    <p style={{ color: "red", fontSize: "13px" }}>
                      {errors.email?.type === "required" &&
                        "Vui lòng nhập email"}
                      {errors.email?.type === "pattern" &&
                        "Vui lòng nhập email hợp lệ"}
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <FormControl variant="outlined" className="col-sm-12">
                      <label>
                        Số điện thoại <span style={{ color: "red" }}>*</span>
                      </label>
                      <InputBase
                        type="text"
                        placeholder="Nhập số điện thoại"
                        className="form-control"
                        {...register("phone", {
                          required: true,

                          pattern: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                        })}
                      />
                    </FormControl>
                    <p style={{ color: "red", fontSize: "13px" }}>
                      {errors.phone?.type === "required" &&
                        "Vui lòng nhập số điện thoại"}
                      {errors.phone?.type === "pattern" &&
                        "Vui lòng nhập sđt hợp lệ"}
                    </p>{" "}
                  </div>
                </div>
                <button
                  disabled={!isDirty || !isValid}
                  className="btn btn-success w-100"
                >
                  Đăng ký
                </button>
                <hr />
                <p style={{ textAlign: "center" }}>
                  {" "}
                  Bạn đã có tài khoản ? :{" "}
                  <Link
                    style={{ color: "#3fc35f", textDecoration: "none" }}
                    to="/login"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
