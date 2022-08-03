import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Typography,DatePicker,message,Spin} from 'antd';
import moment from 'moment';
import {getUser,editUser} from '../../actions/user';

const {Title} = Typography;


function EditUser({getUser,editUser,user : {currentuser,loading}}) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const {email} = useParams();
    useEffect(() => {
        getUser(email);
        
    },[email,getUser]);
    const onFinish = (values) => {
        values.prevemail = email;
        editUser(values);
        message.success("Successly Update!")
    };
    form.setFieldsValue({
        name : currentuser.name,
        email : currentuser.email,
        expiry : currentuser.expiry ? moment(currentuser.expiry,"YYYY-MM-DD") : ""
    })
    return ( 
        <>
        {
            loading ?

             <Spin/> : <>
             <div className='site-layout-content' style={{marginTop : 20}}>
             <Row >
                <Col span={22}>
                    <Title level={2}>EditUser</Title>
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
            <Form
                name="basic"
                form={form}
                layout='vertical'
                onFinish={onFinish}
                autoComplete="off"
                >
                <Form.Item
                    label="Name"
                    name="name"
                    
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input  />
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
                    <DatePicker style={{width : "100%"}} />
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
                    Edit
                    </Button>
                </Form.Item>
                </Form>
                </div>
             </>
        }
            
        </>
     );
}

EditUser.propTypes = {
    getUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    user : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    currentuser : state.currentuser
});
  

export default connect(mapStateToProps, {getUser,editUser})(EditUser)