import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,DatePicker} from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
  } from '@ant-design/icons';
import {getData,editData} from '../../actions/data'; 

const {Title} = Typography;


const InsertInstance = () => {
    const onFinish = (values) => {
    } 

    return ( 
        <>
         <div className='site-layout-content' style={{marginTop : 20}}>
            <Row>
                <Col span={20}>
                    <Title level={2}>Edit Data</Title>

                </Col>
            </Row>
            <Form
                name="basic"
                layout='vertical'
                onFinish={onFinish}
                autoComplete="off"
                >
                <Form.Item
                    label="Question"
                    name="question"
                    
                    rules={[{ required: true, message: 'Please input Question!' }]}
                >
                    <Input  />
                </Form.Item>

                <Form.Item
                    label="Answer"
                    name="answer"
                    
                    rules={[{ required: true, message: 'Please input Answer!' }]}
                >
                    <Input  />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Edit
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </>
     );
}


export default InsertInstance;