import axios from "axios";
import {UserType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "0c2e4034-c7ef-44e2-9030-ed99474a7f30" //Demo API-KEY
    }
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>,
  totalCount: number,
  error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D,
  messages: Array<string>,
  resultCode: RC
}
