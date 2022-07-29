import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,Card} from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
  } from '@ant-design/icons';
import {editSetting} from '../../../actions/instance'; 

const {Title} = Typography;
const {TextArea} = Input;

const GeneralSetting = ({editSetting,data : {bots,loading}}) => {
    const {instance_id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const onFinish = (values) => {
        editSetting(values);
    } 
    useEffect(() => {
        form.setFieldsValue({
            audience : bots.check ? bots.check.default_audience_id : "",
            reminder : bots.check ? bots.check.reminder : "",
            mins : bots.check ? bots.check.mins : ""
        })
    },[bots])

    return ( 
        <>
         <Card style={{margin : 50}}>
            <Row>
                <Col span={20}>
                    <Title level={2}>General Setting({bots.check ? bots.check.label : ""})</Title>
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
                    label="Default Audience Id"
                    name="audience"
                    
                    rules={[{ required: true, message: 'Please input Audience!' }]}
                >
                    <TextArea rows={4}  />
                </Form.Item>

                <Form.Item
                    label="Reminder Text"
                    name="reminder"
                    
                    rules={[{ required: true, message: 'Please input Reminder!' }]}
                >
                    <TextArea rows={4}  />
                </Form.Item>

                <Form.Item
                    label="Mins"
                    name="mins"
                    
                    rules={[{ required: true, message: 'Please input Reminder!' }]}
                >
                    <Input />
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

GeneralSetting.propTypes = {
    editSetting : PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {editSetting})(GeneralSetting);