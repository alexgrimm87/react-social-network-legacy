import React from 'react';
import style from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <aside className={style.sidebar}>
            <ul className={style.navigation}>
                <li>
                    <NavLink to="/profile" activeClassName={style.active}>Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/dialogs" activeClassName={style.active}>Messages</NavLink>
                </li>
                <li>
                    <NavLink to="/news" activeClassName={style.active}>News</NavLink>
                </li>
                <li>
                    <NavLink to="/music" activeClassName={style.active}>Music</NavLink>
                </li>
                <li>
                    <NavLink to="/settings" activeClassName={style.active}>Settings</NavLink>
                </li>
            </ul>
        </aside>);
}

export default Navbar;
