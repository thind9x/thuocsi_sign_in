import Radio from "@material-ui/core/Radio";
import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./Register.scss";

function isUserNameValid(username) {
  const res = /^[a-z0-9_.]+$/.exec(username);
  const valid = !!res;
  return valid;
}

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [repassword, setRepassword] = useState("");
  const [sex, setGender] = useState("");
  // const [level, setLevel] = useState("");
  const [errorusername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPass] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorSex, setErrorSex] = useState("");
  const [errorReg, setErrorReg] = useState("");

  const history = useHistory();
  const [selectedValue, setSelectedValue] = useState("INTERNSHIP");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    // setLevel(event.target.value);
  };
  const handleUsername = (e) => {
    e.preventDefault();

    var usename = isUserNameValid(e.target.value);
    if (e.target.value.length === 0) {
      setErrorUsername("Vui lòng nhập tên tài khoản");
    } else if (usename === false) {
      setErrorUsername("Tên tài khoản chỉ chấp nhận chữ viết thường và dấu_");
    } else if (e.target.value.length < 5) {
      setErrorUsername("Tài khoản ít nhất 5 ký tự");
    } else {
      setUsername(e.target.value);
      setErrorUsername("");
    }
  };
  const hanldePassword = (e) => {
    e.preventDefault();

    var regx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%_])[A-Za-z\d!@#$%_]{8,}$/;
    if (e.target.value.length === 0) {
      setErrorPass("Vui lòng nhập mật khẩu");
    } else if (e.target.value.length < 8) {
      setErrorPass("Mật khẩu ít nhất 8 ký tự");
    } else if (regx.test(e.target.value) === false) {
      setErrorPass(
        "Bao gồm 1 ký tự đặc biệt,1 chữ số,1 chữ in hoa,1 chữ thường"
      );
    } else {
      setErrorPass("");
      setPassword(e.target.value);
    }
  };
  const handlRenterpass = (e) => {
    e.preventDefault();

    if (e.target.value !== password) {
      setErrorPass("Nhập lại mật khẩu không khớp");
    } else if (e.target.value.length < 8) {
      setErrorPass("Mật khẩu ít nhất 8 ký tự");
    } else {
      setErrorPass("");
      setRepassword(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    // console.log(e.target[0].value);
    e.preventDefault();

    // let nam = e.target;
    // let val = e.target.value;
    // console.log(nam);
    // console.log(val);
    if (username === "" || username === null) {
      setErrorUsername("Vui lòng nhập tên tài khoản");
    } else if (password === "" || password === null) {
      setErrorPass("Vui lòng nhập mật mã hợp lệ");
    } else if (repassword !== password) {
      setErrorPass("Hai mật khẩu không giống nhau");
    } else if (sex === "" || sex === null) {
      setErrorSex("Vui lòng chọn giới tính");
    } else if (email === "" || email === null) {
      setErrorEmail("Vui lòng nhập email");
    } else if (phone === "" || phone === null) {
      setErrorPhone("Vui lòng nhập số điện thoại");
    } else {
      // console.log("a");
      axios
        .post("https://api.v2-dev.thuocsi.vn/interview/account", {
          username: username,
          displayName: name,
          email: email,
          phone: phone,
          sex: sex,
          class: selectedValue,
          password: repassword,
        })
        .then(
          (res) => {
            console.log(res);
            history.push("/sign-up-success");
          },
          (error) => {
            console.log(error);
            setErrorReg(
              "Đăng ký thất bại, email hoặc tên người dùng đã tồn tại"
            );
          }
        );
    }
  };

  return (
    <div className="container">
      <div className="col-lg-12 well">
        <div className="row" id="div-center">
          <h3 className="well" style={{ textAlign: "center" }}>
            Đăng ký tài khoản
          </h3>

          <p className="well" style={{ textAlign: "center", color: "red" }}>
            {errorReg}
          </p>
          <form method="post" onSubmit={handleSubmit}>
            <div className="col-sm-12">
              <div className="form-group">
                <label>Tên Tài khoản</label>
                <p
                  className="danger"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {errorusername}
                </p>
                <input
                  placeholder="Nhập tên tài khoản."
                  rows="3"
                  className="form-control"
                  onChange={handleUsername}
                />
              </div>
              <div className="row">
                <div className="col-sm-6 form-group">
                  <label>Mật khẩu</label>

                  <input
                    type="text"
                    placeholder="Enter password"
                    className="form-control"
                    onChange={hanldePassword}
                  />
                </div>
                <div className="col-sm-6 form-group">
                  <label>Nhập Lại Mật Khẩu:</label>
                  <input
                    type="text"
                    placeholder="Re enter password"
                    className="form-control"
                    onChange={handlRenterpass}
                  />
                </div>
                <p
                  className="danger"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {errorPassword}
                </p>
              </div>
              <div className="form-group">
                <label>Giới tính</label>
                <select
                  className="form-control"
                  style={{ width: "50%" }}
                  onChange={(e) => {
                    setErrorSex("");
                    setGender(e.target.value);
                  }}
                >
                  <option value="">SELECT</option>

                  <option value="male">MALE</option>
                  <option value="fmale">FEMALE</option>
                  <option value="other">OTHER</option>
                </select>
                <p
                  className="danger"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {errorSex}
                </p>
              </div>
              <div className="form-group">
                <label>Bạn là: </label>
                <br />
                <Radio
                  checked={selectedValue === "INTERNSHIP"}
                  value="INTERNSHIP"
                  onChange={handleChange}
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                Thực tập sinh
                <Radio
                  checked={selectedValue === "FRESHER"}
                  value="FRESHER"
                  name="radio-button-demo"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "B" }}
                />
                Mới ra trường
                <Radio
                  checked={selectedValue === "JUNIOR"}
                  value="JUNIOR"
                  onChange={handleChange}
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "C" }}
                />
                Đã có Kinh Nghiệm
              </div>
              <div className="form-group">
                <label>Tên Hiện thị</label>

                <input
                  placeholder="Nhập tên tài hiện thi."
                  rows="3"
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="row">
                <div className="col-sm-6 form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Nhập email"
                    className="form-control"
                    onChange={(e) => {
                      var re = /\S+@\S+\.\S+/;
                      if (re.test(e.target.value) === false) {
                        setErrorEmail("Vui lòng nhập email hợp lệ");
                      } else {
                        setErrorEmail("");
                        setEmail(e.target.value);
                      }
                    }}
                  />
                  <p style={{ color: "red", fontSize: "12px" }}>{errorEmail}</p>
                </div>
                <div className="col-sm-6 form-group">
                  <label>Số điện thoại:</label>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại"
                    className="form-control"
                    onChange={(e) => {
                      var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                      if (vnf_regex.test(e.target.value) === false) {
                        setErrorPhone("Vui lòng nhập sdt hợp lệ");
                      } else {
                        setErrorPhone("");
                        setPhone(e.target.value);
                      }
                    }}
                  />
                  <p style={{ color: "red", fontSize: "12px" }}>{errorPhone}</p>
                </div>
              </div>
              <button className="btn btn-success w-100">Đăng ký</button>
              <hr />
              <p style={{ textAlign: "center" }}>
                {" "}
                Bạn đã có tài khoản ? : <Link to="/login">Đăng nhập</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
