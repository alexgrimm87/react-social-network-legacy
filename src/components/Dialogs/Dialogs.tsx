import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

import {Textarea} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {initialStateType} from "../../redux/dialogs-reducer";

import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

import styles from './Dialogs.module.css';

const maxLength50 = maxLengthCreator(50);

type PropsType = {
  dialogsPage: initialStateType,
  sendMessage: (messageText: string) => void
}

type NewMessageFormValuesType = {
  newMessageBody: string
}

const Dialogs: React.FC<PropsType> = (props) => {
    let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);

    let addNewMessage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    }

    //TODO if (!props.isAuth) return <Navigate to={'/login'} />;

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogs_items}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    );
}

type FormPropsType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, FormPropsType> & FormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       name="newMessageBody"
                       validate={[required, maxLength50]}
                       placeholder="Enter your message" />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;
