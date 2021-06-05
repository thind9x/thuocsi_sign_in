import ArrrowBack from "@material-ui/icons/ArrowBack";
import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../login/components/Login.scss";

class Newpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmpassword: "",
      errorpass: "",
      errorpassconfirm: "",
      email: "",
      tokenvalue: "",
      errorpassbutton: true,
      errorpassconfirmbutton: true,
    };
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmpass = this.handleConfirmpass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount = () => {
    var dt = this.props.location.state;

    this.setState({
      email: dt.email,
      tokenvalue: dt.token.data[0],
    });
  };

  handlePassword = (e) => {
    var regx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%_])[A-Za-z\d!@#$%_]{8,}$/;
    if (e.target.value.length < 8) {
      this.setState({
        errorpass: "Mật khẩu ít nhất 8 ký tự",
        errorpassbutton: true,
        errorpassconfirmbutton: true,
      });
      e.preventDefault();
      return false;
    } else if (regx.test(e.target.value) === false) {
      this.setState({
        errorpass:
          "Bao gồm 1 ký tự đặc biệt,1 chữ số,1 chữ in hoa,1 chữ thường",
        errorpassbutton: true,
        errorpassconfirmbutton: true,
      });
      e.preventDefault();
      return false;
    } else {
      this.setState({
        errorpass: "",
        password: e.target.value,
        errorpassbutton: false,
        errorpassconfirmbutton: false,
      });
      e.preventDefault();

      return true;
    }
  };
  handleConfirmpass = (e) => {
    const { password } = this.state;
    if (e.target.value !== password) {
      this.setState({
        errorpassconfirm: "Nhập lại mật khẩu không khớp",
        errorpassbutton: true,
        errorpassconfirmbutton: true,
      });
      e.preventDefault();
      return false;
    } else if (e.target.value.length < 8) {
      this.setState({
        errorpassconfirm: "Mật khẩu ít nhất 8 ký tự",
        errorpassbutton: true,
        errorpassconfirmbutton: true,
      });
      e.preventDefault();
      return false;
    } else {
      this.setState({
        errorpassconfirm: "",
        confirmpassword: e.target.value,
        errorpassbutton: false,
        errorpassconfirmbutton: false,
      });
      e.preventDefault();
      return true;
    }
  };

  handleSubmit(event) {
    // alert("A name was submitted: " + this.state.email);
    const { email, tokenvalue, confirmpassword } = this.state;
    console.log(email);
    console.log(tokenvalue);
    console.log(confirmpassword);
    axios
      .put(
        "https://api.v2-dev.thuocsi.vn/interview/account/forgot-password/password",
        {
          email: email,
          password: confirmpassword,
          token: tokenvalue,
        }
      )
      .then(
        (res) => {
          console.log(res);
          this.props.history.push("/reset-password-success");
        },
        (error) => {
          console.log(error);
          alert("Đã có lỗi sảy ra");
        }
      );
    event.preventDefault();
  }

  render() {
    const {
      errorpass,
      errorpassconfirm,
      errorpassbutton,
      errorpassconfirmbutton,
    } = this.state;
    return (
      <div className="back">
        <div className="div-center">
          <div className="content">
            <p
              onClick={(e) => {
                this.props.history.goBack();
              }}
            >
              <ArrrowBack style={{ fontSize: 50, marginBottom: 20 }} />
            </p>

            <h3 style={{ textAlign: "left" }}>Tạo lại mật khẩu</h3>
            <hr />
            <form method="post" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="exampleInputEmail1">Mật khẩu mới</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Re Enter password"
                  required={true}
                  onChange={this.handlePassword}
                />
                <p>{errorpass}</p>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Nhập lại Mật khẩu mới</label>

                <input
                  type="password"
                  className="form-control "
                  placeholder="Enter password"
                  required={true}
                  onChange={this.handleConfirmpass}
                />
                <p>{errorpassconfirm}</p>
              </div>

              <button
                disabled={
                  errorpassbutton || errorpassconfirmbutton ? true : false
                }
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
  }
}

export default withRouter(Newpassword);
