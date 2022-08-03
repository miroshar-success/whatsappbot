import React, { Fragment,useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import {Menu,Layout,Col,Row,Dropdown,Space,Avatar} from 'antd';

import {
  PieChartOutlined,
  DownOutlined,
  UserOutlined
} from '@ant-design/icons';

const {Header} = Layout;

const Navbar = ({ auth: { isAuthenticated,user }, logout }) => {
  const navicate = useNavigate();
  const [role,setrole] = useState("User");
  useEffect(() => {
    user ? setrole(user.role) : setrole("User");
  },[user])
  const onClick = (item) => {
    return item.key == 'logout' ? logout() : navicate('/'+(item.key).split("-")[0]);
  }
  console.log(user);
  const authLinks = [
    {
      key : "dashboard",
      icon : <PieChartOutlined/>,
      label : "Dashboard",
    },
    {
        key : "usermanagement",
        icon : <PieChartOutlined/>,
        label : "User Management",
    },
    {
        key : "data",
        icon : <PieChartOutlined/>,
        label : "Data",
    },
    {
        key : "instance",
        icon : <PieChartOutlined/>,
        label : "Instance",
    },
    {
        key : "addinstances",
        icon : <PieChartOutlined/>,
        label : "AddInstance",
    },
    {
      key : "logout",
      icon : <PieChartOutlined/>,
      label : "Logout",
    },
  ]

  const guestLinks = [
    {
      key : "login",
      icon : <PieChartOutlined/>,
      label : "Login",
    },
    {
      key : "Register",
      icon : <PieChartOutlined/>,
      label : "register",
    },
  ]

  const userLinks = [
    {
      key : "dashboard",
      icon : <PieChartOutlined/>,
      label : "Dashboard",
    },
    {
      key : "instance",
      icon : <PieChartOutlined/>,
      label : "Instance",
    },
    {
        key : "addinstances",
        icon : <PieChartOutlined/>,
        label : "AddInstance",
    },
    {
      key : "logout",
      icon : <PieChartOutlined/>,
      label : "Logout",
    },
  ]

  const menu = (
    <Menu
      onClick={onClick}
      style={{fontSize : 20}}
      items={[
        {
          label: 'My Profile',
          key: 'profile-current',
          path : "profile"
        },
        {
          label: 'Edit Profile',
          key: 'profile-edit',
          path : "profile"
        },
        {
          label: 'LogOut',
          key: 'logout',
          path : "logout"
        },
      ]}
    />
  );

  return (
    <Header>
    <div className="logo" />
    <Row>
      <Col span={20}>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={isAuthenticated ? (role == 'Admin' ? authLinks : userLinks) : guestLinks}
        onClick={(item) => {item.key == 'logout' ? logout() : navicate('/'+item.key)}}
      />
      </Col>
      <Col span={4}>
        <Dropdown overlay={menu} arrow={{ pointAtCenter: true }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
            <Avatar size={40} icon={<UserOutlined />} />
              {/* <DownOutlined /> */}
            </Space>
          </a>
        </Dropdown>
      </Col>
      
    </Row>
      
    </Header>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
