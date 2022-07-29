import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Select,Typography,Card} from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
  } from '@ant-design/icons';
import {insertSourceKey,getBotsByInstance} from '../../../actions/data'; 

const {Title} = Typography;
const {Option} = Select;

const SourceKey = ({insertSourceKey,getBotsByInstance,data : {data,loading}}) => {
    const {instance_id} = useParams();
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const onFinish = (values) => {
        values.instance_id = instance_id;
        insertSourceKey(values);
        getBotsByInstance(instance_id)
    } 

    return ( 
        <>
         <Card style={{margin : 50}}>
            <Row>
                <Col span={20}>
                    <Title level={2}>Source Keywords</Title>
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
                    label="Audience Id"
                    name="audienceid"
                    
                    rules={[{ required: true, message: 'Please input Audience!' }]}
                >
                    <Input  />
                </Form.Item>

                <Form.Item
                    label="Keyword"
                    name="keyword"
                    
                    rules={[{ required: true, message: 'Please input Keyword!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Type"
                    name="type"
                >
                    <Select>
                        <Option value="Bot">Bot</Option>
                        <Option value="Default">Default</Option>

                    </Select>
                </Form.Item>

                <Form.Item
                
                >
                    <Button type="primary" htmlType="submit">
                    Save
                    </Button>
                </Form.Item>
            </Form>

            
            </Card>
        </>
     );
}

SourceKey.propTypes = {
    insertSourceKey : PropTypes.func.isRequired,
    getBotsByInstance : PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {insertSourceKey,getBotsByInstance})(SourceKey);