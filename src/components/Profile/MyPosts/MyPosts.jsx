import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {

    let posts = [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 23}
    ]

    let postsElements = posts.map( p => <Post message={p.message} likesCount={p.likesCount} /> );

    return (
        <div>
            <h2>My posts</h2>
            <div>
                <textarea></textarea>
            </div>
            <button>Add post</button>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>);
}

export default MyPosts;
