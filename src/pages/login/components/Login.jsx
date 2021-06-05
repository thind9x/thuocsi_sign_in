import axios from "axios";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      error: "",
      buttondis: true,
      errorusername: true,
      errorpassword: true,
    };

    this.handeSubmit = this.handeSubmit.bind(this);
  }
  handeSubmit = (e) => {
    axios
      .post("https://api.v2-dev.thuocsi.vn/interview/authorization", {
        username: this.state.username,
        password: this.state.password,
      })
      .then(
        (res) => {
          console.log(res);
          window.localStorage.setItem("username", this.state.username);
          this.props.history.push("/login-success");
        },
        (error) => {
          console.log(error);
          this.setState({
            error: "Sai tên tài khoản hoặc mật khẩu",
          });
        }
      );
    e.preventDefault();
  };

  render() {
    const { errorusername, errorpassword } = this.state;
    return (
      <div className="back">
        <div className="div-center">
          <div className="content">
            <h3 style={{ textAlign: "center" }}>Đăng nhập</h3>
            <hr />
            <form method="post" onSubmit={this.handeSubmit}>
              <p>{this.state.error}</p>
              <div className="form-group">
                <label for="exampleInputEmail1">Tên tài khoản</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Tên tài khoản"
                  required={true}
                  onChange={(e) => {
                    if (e.target.value.length < 5) {
                      this.setState({
                        buttondis: true,
                        errorusername: true,
                      });
                    } else {
                      this.setState({
                        username: e.target.value,
                        // buttondis: false,
                        errorusername: false,
                      });
                    }
                  }}
                />
              </div>
              <div className="form-group">
                <label for="password">Mật khẩu</label>

                <input
                  type="password"
                  className="form-control "
                  placeholder="Mật khẩu"
                  required={true}
                  onChange={(e) => {
                    if (e.target.value.length < 8) {
                      this.setState({
                        buttondis: true,
                        errorpassword: true,
                      });
                    } else {
                      this.setState({
                        password: e.target.value,
                        errorpassword: false,
                      });
                    }
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "12px",
                  paddingLeft: 10,
                  marginTop: "5px",
                }}
              >
                <input type="checkbox" /> Giữ tôi luôn đăng nhập
                <Link
                  to="/forgot-password"
                  style={{ marginLeft: "55%", textDecoration: "none" }}
                >
                  <p>Quên mật khẩu</p>
                </Link>
              </div>
              <button
                className="btn btn-success w-100"
                type="submit"
                disabled={errorusername || errorpassword ? true : false}
              >
                Đăng nhập
              </button>
              <hr />
              <p style={{ textAlign: "center" }}>
                {" "}
                Bạn chưa có tài khoản ? : <Link to="/sign-up">Đăng ký</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
