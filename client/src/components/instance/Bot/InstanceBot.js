import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,Select,Card} from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
  } from '@ant-design/icons';
import {setBotsByInstance} from '../../../actions/data'; 

const {Title} = Typography;
const {TextArea} = Input;
const {Option} = Select;

const InstanceBot = ({setBotsByInstance,data : {bots,loading}}) => {
    const {instance_id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const onFinish = (values) => {
        values.instance_id = instance_id;
        setBotsByInstance(values);
    } 
    useEffect(() => {

        form.setFieldsValue({
            welcome : bots.wcheck ? bots.wcheck.message : "",
            welcome2 : bots.w2check ? bots.w2check.message : "",
            welcome3 : bots.w3check ? bots.w3check.message : "",
            dmessage : bots.dcheck ? bots.dcheck.message : "",
            ai : bots.acheck ? bots.acheck.message : ""
        })
    },[bots])
    

    return ( 
        <>
         <Card style={{margin : 50}}>
            <Row>
                <Col span={20}>
                    <Title level={2}>Bot for Instance({bots.check ? bots.check.label : ""})</Title>
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
                    label="Welcome Message"
                    name="welcome"
                    rules={[{ required: true, message: 'Please input Welcome!' }]}
                    
                >
                    <TextArea rows={4}  />
                </Form.Item>

                <Form.Item
                    label="Welcome Message2"
                    name="welcome2"
                    
                >
                    <TextArea rows={4}  />
                </Form.Item>
                 
                <Form.Item
                    label="Welcome Message3"
                    name="welcome3"

                >
                    <TextArea rows={4}  />
                </Form.Item>

                <Form.Item
                    label="Default Message"
                    name="dmessage"
                    
                    rules={[{ required: true, message: 'Please input Default!' }]}
                >
                    <TextArea rows={4}  />
                </Form.Item>

                <Form.Item
                    label="Use of Artificial Inteligence"
                    name="ai"
                    
                >
                    <Select>
                        <Option value="Not Active">Not Active</Option>
                        <Option value="Active">Active</Option>
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

InstanceBot.propTypes = {
    setBotsByInstance: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {setBotsByInstance})(InstanceBot);