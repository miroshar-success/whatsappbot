import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/layout/NotFound';
import Profile from './components/profile/index';

import UserManagement from './components/usermanagement/User';
import AddUser from './components/usermanagement/AddUser';
import EditUser from './components/usermanagement/EditUser';

import Data from './components/Data/index';

import Instance from './components/instance/Instance';
import Train from './components/instance/Train';
import EditData from './components/instance/EditData';
import Bot from './components/instance/Bot/index';
import EditKeyWord from './components/instance/Bot/EditKeyWord';
import AddData from './components/instance/AddData';

import SetMessage from './components/instance/SetMessage';

import PrivateRoute from './components/routing/PrivateRoute';
import { LOGOUT } from './actions/types';

import { Layout} from 'antd';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Router>
          <Navbar />
          <Alert />
          <div className='layout'>

          
          <Content>
            
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="dashboard" element={<PrivateRoute component={Dashboard} />}/>
              <Route path='usermanagement'  element={<PrivateRoute component={UserManagement}/>}/>
              <Route path='adduser' element={<PrivateRoute component={AddUser}/>}/>
              <Route path='edituser/:email' element={<PrivateRoute component={EditUser}/>}/>
              <Route path="data" element={<PrivateRoute component={Data}/>}/>
              <Route path="instance" element={<PrivateRoute component={Instance}/>}/>
              <Route path='addinstances' element={<PrivateRoute component={AddData}/>}/>
              <Route path='profile' element={<PrivateRoute component={Profile}/>} />
              
              <Route path="/:in_id/train"  element={<PrivateRoute component={Train}/>}/>
              <Route path='/:in_id/:id/train' element={<PrivateRoute component={EditData}/>}/>
              <Route path='/:instance_id/bot' element={<PrivateRoute component={Bot}/>}/>
              <Route path='/:instance_id/message' element={<PrivateRoute component={SetMessage}/>}/>
              <Route path='/:instance_id/:id/editkeyword' element={<PrivateRoute component={EditKeyWord}/>} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Content>
          </div>
        </Router>
        <Footer
          style={{
            textAlign: 'center',
          }}>
          Ant Design ©2018 Created by Ant UED
          </Footer>
      </Layout>
    </Provider>
  );
};

export default App;
