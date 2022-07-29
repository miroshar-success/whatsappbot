import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import {Form,Button,Row,Col,Input} from 'antd';
import  './login.css';


const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (values) => {
    const {email,password} = values;
    console.log(values);
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="Login">
      <Form
        onFinish={onSubmit}
      >
      <Form.Item name="email" 
        rules={[{ required: true }]} hasFeedback>
          <Input
            placeholder={`email`}
          />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]} hasFeedback>
        <Input type='password' placeholder={""} required />
        </Form.Item>
      <Row>
        <Button
          type="primary"
          htmlType="submit"
          // loading={loading.effects.login}
        >
          Sign in
        </Button>
        <p>
          <span className="margin-right">
            Username
            ：guest
          </span>
          <span>
            Password
            ：guest
          </span>
        </p>
      </Row>
    </Form>
    <p className="my-1">
      Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
  </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
