import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

import {Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {login} from "../../redux/auth-reducer";
import {AppDispatch, AppStateType} from "../../redux/redux-store";

import styles from './../common/FormsControls/FormsControls.module.css';

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
  = ({handleSubmit, error, captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
          <Field component={Input} name={"email"} validate={[required]} placeholder={"Email"} />
      </div>
      <div>
          <Field component={Input} name={"password"} type={"password"} validate={[required]} placeholder={"Password"} />
      </div>
      <div>
          <Field component={Input} name={"rememberMe"} type={"checkbox"} /> remember me
      </div>
      <div>
        <button>Login</button>
      </div>

      { captchaUrl && <img src={captchaUrl} alt="" />}
      { captchaUrl && <Field component={Input} name={"captcha"} validate={[required]} placeholder={"Symbols from image"} />}

      {error && <div className={styles.formSummaryError}>
        {error}
      </div>
      }
      <div>
        <p><strong>Try Demo Customer Access</strong></p>
        <p><span>Email: </span>yokap88236@vip4e.com</p>
        <p><span>Password: </span>yokap88236</p>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login'
})(LoginForm);

type LoginFormValuesType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
}

export const LoginPage: React.FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
  }

  if (isAuth) {
    return <Navigate to={'/profile'}/>
  }

  return <div>
    <h1>Login</h1>
    <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
  </div>
}
