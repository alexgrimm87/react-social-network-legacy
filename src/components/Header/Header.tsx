import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Layout, Menu, Row} from "antd";
import {AppstoreOutlined, ShareAltOutlined, UserOutlined} from '@ant-design/icons';

import {selectCurrentUserLogin, selectIsAuth} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";
import {AppDispatch} from "../../redux/redux-store";
import {getItem, MenuItem} from "../../App";

import styles from './Header.module.css';

export type MapPropsType = {}

export const Header: React.FC<MapPropsType> = (props) => {
    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);
    const dispatch: AppDispatch = useDispatch();

    const logoutCallback = () => {
      dispatch(logout());
    }

    const { Header} = Layout;

    const itemsHeader: MenuItem[] = [
        getItem(
          <Link to='/users'>
            Users
          </Link>,
          'UsersHeader',
          <AppstoreOutlined />
        )
    ];

    return (
        <Header className={styles.header}>
          <Row>
            <Col span={5} style={{ display: 'flex'}}>
              <Link to={'/'} style={{ display: 'flex', fontSize: '26px', fontWeight: '500', color: 'rgb(0, 119, 255)', textTransform: 'uppercase'}}>
                <ShareAltOutlined style={{ fontSize: '30px', color: 'rgb(0, 119, 255)' }} />
                Social network
              </Link>
            </Col>
            <Col span={13}>
              <Menu className={styles.headerMenu} theme="dark" mode="horizontal" defaultSelectedKeys={['UsersHeader']} items={itemsHeader} />
            </Col>
            <Col span={6}>
              { isAuth
                ? <div>
                  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                  {login} <Button onClick={logoutCallback}>Log out</Button>
                  </div>
                : <Button><Link to={'/login'}>Login</Link></Button>
              }
            </Col>
          </Row>
        </Header>
    );
}
