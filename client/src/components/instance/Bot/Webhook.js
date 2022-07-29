import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Input, Table, Typography, DatePicker, Select,Card } from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import { setWebhook } from '../../../actions/instance';

const { Title } = Typography;
const { Option } = Select;


const WebHook = ({ setWebhook, instance: { keyword, loading },data : {bots} }) => {
    const { instance_id} = useParams();


    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const onFinish = (values) => {
        setWebhook(instance_id)
    }

    return (
        <>
            <Card style={{margin : 50}}>
                <Row>
                    <Col span={20}>
                        <Title level={2}>Set WebHook({bots.check ? bots.check.label : ""})</Title>

                    </Col>
                </Row>
                <Form
                    name="basic"
                    layout='vertical'
                    onFinish={onFinish}
                    initialValues={{webhook : `localhost:5000/wa/bot/webhook`}}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Webhook URL."
                        name="webhook"
                        
                        rules={[{ required: true, message: 'Please input Question!' }]}
                    >
                        <Input disabled/>
                    </Form.Item>

                    

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

WebHook.propTypes = {
    setWebhook: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired,
    data : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    instance: state.instance,
    data : state.data
});

export default connect(mapStateToProps, { setWebhook })(WebHook);