import style from './Post.module.css';
import React from "react";

type PropsType = {
  message: string
  likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={style.post}>
            <img src="https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-512.png" alt=""/>
            <p>{props.message}</p>
            <p>{props.likesCount}</p>
            <span>like</span>
        </div>);
}

export default Post;
