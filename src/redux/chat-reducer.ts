import {Dispatch} from "redux";
import {v1} from 'uuid'

import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";

export type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED':
            return {
                ...state,
              messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1() }))]
                .filter((m, index, array) => index >= array.length - 100 )
            }
        case 'chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}

//Action Creators
export const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) => ({
    type: 'chat/MESSAGES_RECEIVED', payload: {messages}
  } as const),
  statusChanged: (status: StatusType) => ({
    type: 'chat/STATUS_CHANGED', payload: {status}
  } as const)
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages))
    }
  }
  return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = ():ThunkType => async (dispatch) => {
  chatAPI.start()
  // @ts-ignore
  chatAPI.subscribeOnNewMessages('messages-received', newMessageHandlerCreator(dispatch))
  // @ts-ignore
  chatAPI.subscribeOnNewMessages('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  // @ts-ignore
  chatAPI.unsubscribeFromNewMessages('messages-received', newMessageHandlerCreator(dispatch))
  // @ts-ignore
  chatAPI.unsubscribeFromNewMessages('status-changed', statusChangedHandlerCreator(dispatch))
  chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message)
}

export default chatReducer;
