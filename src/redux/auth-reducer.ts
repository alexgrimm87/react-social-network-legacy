import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA':
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

//Action Creators
export const actions = {
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl: string | null) => ({
    type: 'auth/SET_USER_DATA', payload: {id, email, login, isAuth, captchaUrl}
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
  } as const)
}

//Thunk Creators
export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
      let {id, email, login} = meData.data;
      dispatch(actions.setAuthUserData(id, email, login, true, null));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe);

    if (loginData.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some error";
      dispatch( stopSubmit("login", {_error: message}) );
    }
}

export const getCaptchaUrl = ():ThunkType  => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captcha = data.url;

  dispatch( actions.getCaptchaUrlSuccess(captcha) );
}

export const logout = ():ThunkType  => async (dispatch) => {
  let response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false, null));
  }
}

export default authReducer;
