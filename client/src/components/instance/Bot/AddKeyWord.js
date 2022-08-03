import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Input, Table, Typography, DatePicker, Select, Card, Upload, Space } from 'antd';
import {
    SettingOutlined,
    DownloadOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { getKeyWord } from '../../../actions/instance';
import { updateWabot, addWabot } from "../../../actions/data"
import ContentValue from './ContentValue';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;


const AddKeyWord = ({ getKeyWord, updateWabot, addWabot, instance: { keyword, loading } }) => {
    const { instance_id, id } = useParams();
    const [mes_type, setmes_type] = useState("TextArea");
    const [message, setMessage] = useState("");
    const [link, setlink] = useState("");
    const [linktitle, setlinktitle] = useState("");
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const [number, setnumber] = useState("");
    const [messagetouser, setMessagetouser] = useState("");
    const [messagetoagent, setMessagetoagent] = useState("");


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
    const onFinish = async (values) => {
        const file = await getBase64(fileList[0]);
        values.instance_id = instance_id;
        values.message = message;

        values.filename = fileList[0] ? fileList[0].name : "";
        values.link = link;
        values.linktitle = linktitle;
        values.number = number;
        values.messagetoagent = messagetoagent;
        values.messagetouser = messagetouser;
        values.file = file;
        addWabot(values);
    }

    const handleChange = (item) => {
        setmes_type(item);
    }


    const getBase64 = async (file ) => {
        if (file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }
        
    }


    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });
        setUploading(true); // You can use any AJAX library you like

    };

    const fileprops = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([ file]);
            return false;
        },
        fileList,
    };

    

    // useEffect(() => {
    //     ContentValue();
    // }, [mes_type])


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
                        <Select onChange={handleChange}>
                            <Option value='Text'>Text</Option>
                            <Option value='Link'>Link</Option>
                            <Option value='File'>File Or Photo</Option>
                            <Option value='Forward'>Forward To Agent</Option>

                        </Select>
                    </Form.Item>
                    <ContentValue 
                        mes_type={mes_type}
                        messagetouser = { messagetouser}
                        message = {message}
                        messagetoagent = {messagetoagent}
                        link = {link}
                        number = {number}
                        linktitle = {linktitle}
                        fileList = {fileList}
                        setnumber = {setnumber}
                        setMessage = {setMessage}
                        setFileList = {setFileList}
                        setMessagetoagent = {setMessagetoagent}
                        setMessagetouser = {setMessagetouser}
                        setlink = {setlink}
                        setlinktitle = {setlinktitle}
                        fileprops = {fileprops}


                    />
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
    updateWabot: PropTypes.func.isRequired,
    getKeyWord: PropTypes.func.isRequired,
    addWabot: PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    instance: state.instance
});

export default connect(mapStateToProps, { getKeyWord, updateWabot, addWabot })(AddKeyWord);