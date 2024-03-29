import styles from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import React from "react";

type PropsType = {
  id: number
  name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id;

    return (
        <div className={styles.dialog + ' ' + styles.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;
