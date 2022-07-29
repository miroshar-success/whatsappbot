import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,Card, Avatar,Divider} from 'antd';
import {
    SettingOutlined,
    DownloadOutlined,
    UserOutlined
  } from '@ant-design/icons';
import {setInfo,setPassword} from '../../actions/auth'; 

const {Title} = Typography;


const Profile = ({setInfo,setPassword,auth : {user,loading}}) => {
    const {in_id,id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const setinfo = (values) => {
        setInfo(values);
    }
    console.log(user);
    form.setFieldsValue({
        name : user ? user.name : "",
        email : user ? user.email : ""
    })

    const setpassword = (values) => {
        setPassword(values);
    }
    form.setFieldsValue({
        name : user ? user.name : "",
        email : user ? user.email : "",
    })

    return ( 
        <>
        <Row>
            <Col span={16}>
                <Card style={{margin : 50}}>
                <Row>
                    <Col span={20}>
                        <Title level={2}>Profile</Title>

                    </Col>
                </Row>
                <Form
                    name="basic"
                    form={form}
                    layout='vertical'
                    onFinish={setinfo}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Name"
                        name="name"
                        
                        rules={[{ required: true, message: 'Please input Name   !' }]}
                    >
                        <Input  />
                    </Form.Item>

                    <Form.Item
                        label="Eamil"
                        name="email"
                        
                        rules={[{ required: true, message: 'Please input Email!' }]}
                    >
                        <Input  />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Save
                        </Button>
                    </Form.Item>
                </Form>
                <Divider/>
                <Row>
                    <Col span={20}>
                        <Title level={2}>Edit Profile</Title>

                    </Col>
                </Row>
                <Form
                    name="basic"
                    layout='vertical'
                    onFinish={setpassword}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Current Password"
                        name="password"
                        
                        rules={[{ required: true, message: 'Please input Name   !' }]}
                    >
                        <Input.Password  />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="password1"
                        
                        rules={[{ required: true, message: 'Please input Password!' }]}
                    >
                        <Input.Password  />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password1']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password1') === value) {
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
                        Save
                        </Button>
                    </Form.Item>
                    </Form>
                </Card>
            </Col>
            <Col span={8} >
                <Card style={{margin : 50,textAlign : "center"}}>
                    <Avatar size={260} icon={<UserOutlined/>}/>
                    <Divider>{user.name}</Divider>
                    <Title level={2}>{user.email}</Title>
                </Card>
            </Col>
        </Row>
            
        </>
     );
}

Profile.propTypes = {
    setInfo : PropTypes.func.isRequired,
    setPassword : PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired
};
  
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {setInfo,setPassword})(Profile);