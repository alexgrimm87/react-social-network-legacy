import React, {ChangeEvent, useState} from "react";

import {ContactsType, ProfileType} from "../../../types/types";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataReduxForm from "./ProfileDataForm";

import userPhoto from './../../../assets/images/user.png'
import styles from './ProfileInfo.module.css';

type PropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length) {
        savePhoto(e.target.files[0]);
      }
    }

    const onSubmit = (formData: ProfileType) => {
      saveProfile(formData).then(response => {
        if (!response) return setEditMode(false)});
    }

    return (
        <div>
            <div className={styles.user}>
                <div className={styles.avatar}>
                    <img src={profile.photos.large || userPhoto} alt=""/>
                    {isOwner && <div className={styles.changeAvatar}><input type={"file"} onChange={onMainPhotoSelected} /></div>}
                </div>


                { editMode
                  ? <ProfileDataReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                  : <ProfileData goToEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner} /> }
            </div>
            <br/>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    );
}

type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
  return <div>
    <div>
      {isOwner && <button onClick={goToEditMode}>edit</button>}
    </div>
    <div className={styles.description}>
      Full name: {profile.fullName}
    </div>

    <div>
      Looking for a job: {profile.lookingForAJob ? "yes" : "no"}
    </div>

    { profile.lookingForAJob &&
      <div>
        lookingForAJobDescription: {profile.lookingForAJobDescription}
      </div>
    }

    <div>
      About me: {profile.aboutMe}
    </div>

    <div>
      Contacts: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
      })}
    </div>
  </div>
}

type ContactsPropsType = {
  contactTitle: string
  contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return <div className={styles.contact}><b>{contactTitle}</b>: <a href={contactValue}>{contactValue}</a></div>
}

export default ProfileInfo;
