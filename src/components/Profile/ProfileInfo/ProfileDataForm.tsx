import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

import {ProfileType} from "../../../types/types";
import {Input, Textarea} from "../../common/FormsControls/FormsControls";

import formsStyles from './../../common/FormsControls/FormsControls.module.css';
import styles from "./ProfileInfo.module.css";

type PropsType = {
  profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
  return <form onSubmit={handleSubmit}>
    <div>
      <button>save</button>
    </div>
    {error && <div className={formsStyles.formSummaryError}>
      {error}
    </div>
    }
    <div>
      Full name: <Field component={Input} name={"fullName"}  placeholder={"Full name"} />
    </div>

    <div>
      Looking for a job: <Field component={Input} type="checkbox" name={"lookingForAJob"}  />
    </div>

    <div>
      lookingForAJobDescription:
      <Field component={Textarea} name={"lookingForAJobDescription"} placeholder={"lookingForAJobDescription"} />
    </div>

    <div>
      About me:
      <Field component={Textarea} name={"aboutMe"}  placeholder={"about Me"} />
    </div>

    <div>
      Contacts: { Object.keys(profile.contacts).map(key => {
      return <div key={key} className={styles.contact}>
        <b>{key}: <Field component={Input} name={`contacts.${key}`}  placeholder={key} /></b>
      </div>
    }) }
    </div>
  </form>
}

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({
  form: 'edit-profile',
  destroyOnUnmount: false
})(ProfileDataForm);

export default ProfileDataReduxForm;
