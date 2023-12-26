import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {PostType} from "../../../types/types";

import Post from "./Post/Post";

import style from './MyPosts.module.css';

const maxLength10 = maxLengthCreator(10);

export type MapPropsType = {
  posts: Array<PostType>
}
export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
  let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);

  let onAddPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  }

  return (
    <div>
      <h2>My posts</h2>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={style.posts}>
        {postsElements}
      </div>
    </div>
  );
}

const MyPostsMemorized = React.memo(MyPosts);

type FormPropsType = {};

export type AddPostFormValuesType = {
  newPostText: string
};

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, FormPropsType> & FormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPostText"
                       component={Textarea}
                       validate={[required, maxLength10]}
                       placeholder={"Post message"} />
            </div>
            <button>Add post</button>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm<AddPostFormValuesType, FormPropsType>({form: 'profileAddNewPostForm'})(AddNewPostForm);

export default MyPostsMemorized;
