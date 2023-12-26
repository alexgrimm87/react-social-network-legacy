import './App.css';
import 'antd/dist/antd.min.css';

import React, {Component, Suspense} from "react";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {Routes, Route, BrowserRouter, Navigate, Link} from "react-router-dom";
import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';

import store, {AppStateType} from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";
import {LoginPage} from "./components/Login/LoginPage";
import {Header} from "./components/Header/Header";
import {UsersPage} from "./components/Users/UsersContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Preloader from "./components/common/Preloader/Preloader";

const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode,
                        children?: MenuItem[]): MenuItem {
    return {key, icon, children, label} as MenuItem
}

const itemsSideMenu: MenuItem[] = [
  getItem('My Profile', 'MyProfile', <UserOutlined />, [
    getItem(<Link to='/profile'>Profile</Link>,'Profile'),
    getItem(<Link to='/dialogs'>Messages</Link>,'Messages')
  ]),

  getItem('Users', 'Users', <TeamOutlined />, [
    getItem(<Link to='/users'>Users list</Link>,'UsersList'),
    getItem(<Link to='/chat'>Users chat</Link>, 'UsersChat')
  ])
]

class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    const { Content, Footer, Sider } = Layout;

    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <Layout>
        <Header />
        <Content className="main-content" >
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                style={{ height: '100%' }}
                items={itemsSideMenu}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Routes>
                <Route path={'/'} element={<Navigate to="profile/" />}/>
                <Route path="/dialogs/*" element={<DialogsContainer />}/>
                <Route path={'profile/:userId?'} element={<ProfileContainer/>}/>
                <Route path="/users" element={<UsersPage pageTitle={"Users"} />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/chat" element={
                  <Suspense fallback={<Preloader />}>
                    <ChatPage />
                  </Suspense>
                }/>
                <Route path="*" element={<div>404</div>}/>
              </Routes>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Social network ©</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
});

let AppContainer = compose<React.ComponentType>(
  connect(mapStateToProps, {initializeApp}))(App);

const SocialApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default SocialApp;
