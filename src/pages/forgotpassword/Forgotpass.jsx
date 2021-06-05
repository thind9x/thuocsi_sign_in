import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../login/components/Login.scss";
import ArrrowBack from "@material-ui/icons/ArrowBack";

class Forgotpass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      error: "",
      buttondis: true,
    };

    this.handeSubmit = this.handeSubmit.bind(this);
  }
  handeSubmit = (e) => {
    axios
      .post(
        "https://api.v2-dev.thuocsi.vn/interview/account/forgot-password/otp",
        {
          email: this.state.email,
        }
      )
      .then(
        (res) => {
          console.log(res);
          this.props.history.push("/verify-otp?email=" + this.state.email);
        },
        (error) => {
          console.log(error);
          this.setState({
            error: "Địa chỉ email không tồn tại",
          });
        }
      );
    e.preventDefault();
  };
  render() {
    return (
      <div className="back">
        <div className="div-center">
          <div className="content">
            <p
              onClick={(e) => {
                this.props.history.goBack();
              }}
            >
              {" "}
              <ArrrowBack
                style={{ fontSize: 50, marginBottom: 20, cursor: "pointer" }}
              />
            </p>
            <h3 style={{ textAlign: "left" }}>Quên mật khẩu</h3>
            <hr />
            <form method="post" onSubmit={this.handeSubmit}>
              <p style={{ fontSize: "12px", color: "red" }}>
                {this.state.error}
              </p>
              <div className="form-group">
                <label for="exampleInputEmail1">
                  Vui lòng nhập email để nhận mã xác thực
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Email"
                  required={true}
                  onChange={(e) => {
                    var re = /\S+@\S+\.\S+/;
                    if (re.test(e.target.value) === false) {
                      this.setState({
                        error: "Vui lòng nhập email hợp lê",
                        buttondis: true,
                      });
                    } else {
                      this.setState({
                        error: "",
                        email: e.target.value,
                        buttondis: false,
                      });
                    }
                  }}
                />
              </div>

              <button
                className="btn btn-success w-100"
                disabled={this.state.buttondis}
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Forgotpass);
