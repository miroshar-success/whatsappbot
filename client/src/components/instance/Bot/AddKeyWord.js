import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Input, Table, Typography, DatePicker, Select,Card } from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import { getKeyWord } from '../../../actions/instance';
import {updateWabot,addWabot} from "../../../actions/data"

const { Title } = Typography;
const { Option } = Select;
const {TextArea} = Input;


const AddKeyWord = ({ getKeyWord,updateWabot,addWabot, instance: { keyword, loading } }) => {
    const { instance_id, id } = useParams();
    useEffect(() => {
        getKeyWord(instance_id, id);
    }, [getKeyWord]);

    useEffect(() => {
        
    }, [keyword])
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const onFinish = (values) => {
        values.instance_id = instance_id;
        addWabot(values);
    }

    return (
        <>
            <Card style={{ margin: 50 }}>
                <Row>
                    <Col span={20}>
                        <Title level={2}>Add Keywords With Message For Default Bot</Title>

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
                        label="Use || for multiple keywords as a seperator."
                        name="keyword"

                        rules={[{ required: true, message: 'Please input Question!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Message Type"
                        name="message_type"

                        rules={[{ required: true, message: 'Please input Question!' }]}
                    >
                        <Select>
                            <Option value='Text'>Text</Option>
                            <Option  value='Link'>Link</Option>
                            <Option  value='File'>File Or Photo</Option>
                            <Option value='Forward'>Forward To Agent</Option>
                            <Option value='Location'>Location</Option>

                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Message"
                        name="message"

                        rules={[{ required: true, message: 'Please input Answer!' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

AddKeyWord.propTypes = {
    updateWabot : PropTypes.func.isRequired,
    getKeyWord: PropTypes.func.isRequired,
    addWabot : PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    instance: state.instance
});

export default connect(mapStateToProps, { getKeyWord,updateWabot,addWabot })(AddKeyWord);