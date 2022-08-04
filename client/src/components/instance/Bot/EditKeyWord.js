import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Input, Table, Typography, DatePicker, Select } from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import { getKeyWord } from '../../../actions/instance';
import {updateWabot} from "../../../actions/data"

const { Title } = Typography;
const { Option } = Select;
const {TextArea} = Input;


const EditData = ({ getKeyWord,updateWabot, instance: { keyword, loading } }) => {
    const { instance_id, id } = useParams();
    useEffect(() => {
        getKeyWord(instance_id, id);
    }, [getKeyWord]);

    useEffect(() => {
        form.setFieldsValue({
            keyword: keyword.kw ? keyword.kw.keyword : "",
            message: keyword.kw ? keyword.kw.message : "",
            message_type: keyword.kw ? keyword.kw.message_type : ""
        })
    }, [keyword])
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const onFinish = (values) => {
        values.id = id;
        updateWabot(values);
    }

    return (
        <>
            <div className='site-layout-content' style={{ marginTop: 20 }}>
                <Row>
                    <Col span={20}>
                        <Title level={2}>Edit KeyWord</Title>

                    </Col>
                    <Col span={4}>
                        <Button type="primary"><Link to={"/"+instance_id+"/bot"} >Back to List</Link></Button>
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
                        <Select disabled>
                            <Option>Text</Option>
                            <Option>Api Text</Option>
                            <Option>Link</Option>
                            <Option>File Or Photo</Option>
                            <Option>Audio (PPT)</Option>
                            <Option>Forward To Agent</Option>
                            <Option>Location</Option>

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
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

EditData.propTypes = {
    updateWabot : PropTypes.func.isRequired,
    getKeyWord: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    instance: state.instance
});

export default connect(mapStateToProps, { getKeyWord,updateWabot })(EditData);