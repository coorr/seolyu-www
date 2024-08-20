import React, { useState, useCallback, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import styles from "../../components/css/User.module.css";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN } from "../../reducers/user";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import AdminNavigation from "../../components/AdminNavigation";

const Login = () => {
  const form = useRef();
  const router = useRouter();
  const dispatch = useDispatch();
  const checkBtn = useRef();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const { logInLoading } = useSelector((state) => state.user);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();

      if (!email) {
        return alert("아이디 항목은 필수 입력값입니다.");
      } else if (!password) {
        return alert("패스워드 항목은 필수 입력값입니다.");
      }

      form.current.validateAll();
      const requestBody = {
        email: email,
        password: password,
      };

      if (checkBtn.current.context._errors.length === 0) {
        dispatch({
          type: LOG_IN.REQUEST,
          data: requestBody,
          history: router,
        });
      }
    },
    [email, password]
  );

  return (
    <>
      <Header />
      <AdminNavigation />
      <div className="col-md-12" id={styles.login_form_layout}>
        <div className="card card-container" id={styles.login_form_box}>
          <h1>LOGIN</h1>
          <br />
          <br />

          <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
              <label htmlFor="email" className={styles.login_font_input}>
                ID
              </label>
              <Input type="text" className="form-control" name="email" value={email} onChange={onChangeEmail} />
            </div>

            <div className="form-group">
              <label htmlFor="password" className={styles.login_font_input}>
                PASSWORD
              </label>
              <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} />
            </div>

            <br />

            <div className="form-group">
              <button className="btn btn-primary btn-block" disabled={logInLoading} type="submit">
                {logInLoading && <span className="spinner-border spinner-border-sm"></span>}
                <span>Login</span>
              </button>
            </div>

            <br />

            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
