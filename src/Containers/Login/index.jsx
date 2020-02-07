import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import "./index.sass";
import LoginForm from "../../Components/LoginForm";
import { login } from "../../Actions/loginActions";

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory()
  const { loading } = useSelector(state => state.loginReducer);

  const handleForm = data => {
    dispatch(login(data)).then(() => {
      history.push('/dashboard')
    })
  };
  return (
    <div className="login-container">
      <div className="login-container__form">
        <LoginForm loading={loading} handleForm={handleForm} />
      </div>
    </div>
  );
}
