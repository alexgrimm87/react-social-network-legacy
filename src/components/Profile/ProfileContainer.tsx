import React, { useEffect } from "react";
import {compose} from "redux";
import {connect, useSelector} from "react-redux";
import {Navigate, useNavigate, useParams} from "react-router-dom";

import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";
import {selectIsAuth} from "../../redux/auth-selectors";

import Profile from "./Profile";

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
  userId: string
}

type PropsType = MapPropsType & DispatchPropsType;

function ProfileContainer(props: PropsType) {
    const isAuth = useSelector(selectIsAuth)
    let { userId } = useParams<PathParamsType>();
    let navigate = useNavigate();

    useEffect(() =>{
      if (!userId) {
        userId = String(props.authorizedUserId);
        if (!userId) {
          navigate('/login');
        }
      }

      if (!userId) {
        console.error("ID should exists in URI params or in state ('authorizedUserId')");
      } else {
        props.getUserProfile(Number(userId));
        props.getStatus(Number(userId));
      }
    },[userId]);

    if (!isAuth) return <Navigate to={'/login'} />;

    return (
        <div>
            <Profile
              isOwner={!userId}
              profile={props.profile}
              status={props.status}
              updateStatus={props.updateStatus}
              savePhoto={props.savePhoto}
              saveProfile={props.saveProfile}
            />
        </div>
    );
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.id
});

export default compose<React.ComponentType>(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile })
)(ProfileContainer);
