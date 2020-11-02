import React from 'react';
import style from './Post.module.css';

const Post = (props) => {
    return (
        <div className={style.post}>
            <img src="https://cdn2.iconfinder.com/data/icons/avatar-2/512/Fred_man-512.png" alt=""/>
            {props.message}
            <span>like</span> {props.likesCount}
        </div>);
}

export default Post;
