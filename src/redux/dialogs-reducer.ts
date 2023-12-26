import {InferActionsTypes} from "./redux-store";

type DialogType = {
  id: number,
  name: string
}

type MessageType = {
  id: number,
  message: string
}

let initialState = {
  dialogs: [
    {id: 1, name: 'Dimich'},
    {id: 2, name: 'Andrew'},
    {id: 3, name: 'Alex'},
    {id: 4, name: 'Maxim'}
  ] as Array<DialogType>,
  messages: [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'Test'}
  ] as Array<MessageType>
};

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'dialogs/SEND-MESSAGE':
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 5, message: body}]
            };
        default:
            return state;
    }
}

//Action Creators
export const actions = {
  sendMessage: (newMessageBody: string) => ({type: 'dialogs/SEND-MESSAGE', newMessageBody} as const)
}

export default dialogsReducer;
