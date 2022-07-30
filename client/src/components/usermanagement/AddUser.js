import React, { useEffect, useState } from 'react';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,Checkbox,DatePicker,message,Space} from 'antd';
import {columns} from './data';
import {insertUser} from '../../actions/user';

const {Title} = Typography;


function AddUser({insertUser}) {
    const navigate = useNavigate();
    useEffect(() => {
        insertUser()
    },[insertUser]);

    const onFinish = (values) => {
        console.log(values);
        insertUser(values);
        message.success("Successly Insert!")
    };
    

    return ( 
        <>
             <div className='site-layout-content' style={{marginTop : 20}}>
            <Row >
                <Col span={22}>
                    <Title level={2}>User Management</Title>
                </Col>
                <Col span={2}>
                    <Button type='primary' onClick={() => navigate("/usermanagement")}>Back to List</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Title level={5}>USER INFORMATION</Title>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form
                    name="basic"
                    layout='vertical'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Expire Date"
                        name="expiry"
                        rules={[{ required: true, message: 'Please input expire date!' }]}
                    >
                    <Row>
                    <DatePicker style={{width : "100%"}} />

                    </Row>

                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                    </Form>
                </Col>
            </Row>
            
                </div>
        </>
     );
}

AddUser.propTypes = {
    insertUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user
});
  

export default connect(mapStateToProps, {insertUser})(AddUser)