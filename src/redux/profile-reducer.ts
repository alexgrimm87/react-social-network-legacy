import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: 'It\'s my first post', likesCount: 23}
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: ''
};

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'profile/ADD-POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case 'profile/SET_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }
        case 'profile/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            };
        }
        case 'profile/DELETE_POST': {
            return {
              ...state,
              posts: state.posts.filter(p => p.id !== action.postId)
            }
        }
        case 'profile/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }
            default:
                return state;
    }
}

//Action Creators
export const actions = {
  addPostActionCreator: (newPostText: string) => ({type: 'profile/ADD-POST', newPostText} as const),
  setUserProfile: (profile: ProfileType) => ({type: 'profile/SET_USER_PROFILE', profile} as const),
  setStatus: (status: string) => ({type: 'profile/SET_STATUS', status} as const),
  deletePost: (postId: number) => ({type: 'profile/DELETE_POST', postId} as const),
  savePhotoSuccess: (photos: PhotosType) => ({type: 'profile/SAVE_PHOTO_SUCCESS', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setStatus(data));
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    const data = await profileAPI.updateStatus(status);

    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {
    console.log(error);
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);

  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos));
  }
}

const getErrorsFromMessages = (messages: any) => {
  let errors = Object.keys(messages).reduce((acc, key) => {
    let errorMessage = messages[key].split("->");
    errorMessage = errorMessage[1]
      .slice(0, errorMessage[1].length - 1)
    errorMessage = errorMessage.charAt(0).toLowerCase() + errorMessage.slice(1);
    return { ...acc, [errorMessage]: messages[key] };
  }, {});

  return errors;
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.id;
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === 0) {
    if (userId != null) {
      dispatch(getUserProfile(userId));
    } else {
      throw new Error("userId can't be null");
    }
  } else {
    dispatch( stopSubmit("edit-profile", { contacts: getErrorsFromMessages(data.messages)}));
  }
}

export default profileReducer;
