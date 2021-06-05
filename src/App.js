import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/components/Login";
import SigupSucess from "./pages/signupsuccess/SigupSucess";
import Forgotpass from "./pages/forgotpassword/Forgotpass";
import LoginSuccess from "./pages/login/components/LoginSuccess";
import Verify from "./pages/verifyotp/Verify";
import Newpassword from "./pages/newpassword/Newpassword";
import Resetpasssuccess from "./pages/resetpasssuccess/Resetpasssuccess";

const Menu = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/forgot-password" exact component={Forgotpass} />
        <Route path="/login-success" exact component={LoginSuccess} />
        <Route path="/verify-otp" exact component={Verify} />
        <Route path="/reset-password" exact component={Newpassword} />
        <Route
          path="/reset-password-success"
          exact
          component={Resetpasssuccess}
        />

        <Route path="/sign-up" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/sign-up-success" exact component={SigupSucess} />
      </Switch>
    </Router>
  );
};

const App = () => {
  return <Menu />;
};

export default App;
