import React from "react";
import {NavLink} from "react-router-dom";

import styles from './Navbar.module.css';

const activeLink = ({isActive}: { isActive: boolean }) => isActive ? styles.active : '';

const Navbar: React.FC = () => {
    return (
        <div className={styles.sidebar}>
            <ul className={styles.navigation}>
                <li>
                    <NavLink to="/profile" className={activeLink}>Profile</NavLink>
                </li>
                <li>
                    <NavLink to="/dialogs" className={activeLink}>Messages</NavLink>
                </li>
                <li>
                    <NavLink to="/users" className={activeLink}>Users</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
