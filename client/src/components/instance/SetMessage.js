import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import Papa from 'papaparse';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,Card,Upload,message} from 'antd';
import {
    SettingOutlined,
    DownloadOutlined,
    UploadOutlined
  } from '@ant-design/icons';
import {storeMessageTask,getMessageTask,getLogs} from '../../actions/instance'; 
import TextArea from 'antd/lib/input/TextArea';

const {Title,Paragraph} = Typography;
const allowedExtensions = ["csv"];


const SetMessage = ({storeMessageTask,getMessageTask,getLogs,instance : {logs,task,loading}}) => {
    const {instance_id} = useParams();
    // console.log(instance_id);
    const [form] = Form.useForm();
    const [csvdata,setcsvdata] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getMessageTask(instance_id);
    },[getMessageTask])

    useEffect(() => {
        getLogs(instance_id)
    },[getLogs])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const onFinish = (values) => {
        values.instance_id = instance_id;
        values.csvdata = csvdata;
        storeMessageTask(values);
        getMessageTask(instance_id);
        getLogs(instance_id)
    } 


    const handleParse = (file) => {
         
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Enter a valid file");
 
        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();
         
        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv.data;
           
            if (parsedData.length == 0) {
                message.error("No Data!");
                return;
            }
            let total = [];
            for (let i = 0; i < parsedData.length; i++) {
                const columns = Object.keys(parsedData[0]);
                total.push(columns)
            }
            setcsvdata(total);
        };
        reader.readAsText(file);
    };

    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const fileExtension = file?.type.split("/")[1];
            if (!allowedExtensions.includes(fileExtension)) {
                message.error("Please input a csv file");
                return;
            }
            setFileList([ file]);
            handleParse(file);
            return false;
        },
        fileList,
    };

    const columns = [
        {
            title : "ID",
            dataIndex : "id"
        },
        {
            title : "Receiver",
            dataIndex : "receiver"
        },
        {
            title : "Message",
            dataIndex : "message"
        },
        {
            title : "Processed",
            dataIndex : "processed"
        },
        {
            title : "Response",
            dataIndex : "response"
        }
    ]
    const titleLevel = 4;
    const paraLevel = 5;
    return ( 
        <>
         <Card style={{margin : 50}}>
            <Row>
                <Col span={20}>
                    <Title level={2}>Set Message Task </Title>

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
                    label="Note: For spin text use || for seperating text.e.g (Hello World || John||Hi||Hello ||Hey)"
                    name="message"
                    
                    rules={[{ required: true, message: 'Please input Message!' }]}
                >
                    <TextArea rows={4}  />
                </Form.Item>

                <Form.Item
                    label="Answer"
                    name="answer"
                    
                    rules={[{ required: true, message: 'Please input Answer!' }]}
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Delay"
                    name="delay"
                    
                    rules={[{ required: true, message: 'Please input Delay!' }]}
                >
                    <Input   />
                </Form.Item>

                <Form.Item
                    label="Pause(In Secs)"
                    name="pause"
                    
                    rules={[{ required: true, message: 'Please input Pause!' }]}
                >
                    <Input   />
                </Form.Item>

                <Form.Item
                    label="Iterations After which pause needed*"
                    name="iterations"
                    
                    rules={[{ required: true, message: 'Please input Iterations!' }]}
                >
                    <Input   />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Save
                    </Button>
                </Form.Item>
            </Form>
        </Card>
        <Card style={{margin : 50,display : task.task ? "" : "none"}}>
            <Title level={2}>Task</Title>
            <Row>
                <Col span={8}>
                    <Title level={titleLevel}>Message</Title>
                </Col>
                <Col span={16}>
                    <Title level={paraLevel}>{task.task ? task.task.message : ""}</Title>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Title level={titleLevel}>Delay</Title>
                </Col>
                <Col span={16}>
                    <Title level={paraLevel}>{task.task ? task.task.delay : ""}</Title>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Title level={titleLevel}>Pause</Title>
                </Col>
                <Col span={16}>
                    <Title level={paraLevel}>{task.task ? task.task.pause : ""}</Title>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Title level={titleLevel}>Iterations</Title>
                </Col>
                <Col span={16}>
                    <Title level={paraLevel}>{task.task ?task.task.iterations : ""}</Title>
                </Col>
            </Row>
            {/* <Row>
                <Col span={8}>
                    <Title level={titleLevel}>Enable/Disable</Title>
                </Col>
                <Col span={16}>

                </Col>
            </Row> */}
        </Card>
        <Card style={{margin : 50}}>
            <Table
                columns={columns}
                dataSource={logs}
                loading={loading}
            />
        </Card>
        </>
     );
}

SetMessage.propTypes = {
    storeMessageTask: PropTypes.func.isRequired,
    getMessageTask :PropTypes.func.isRequired,
    getLogs : PropTypes.func.isRequired,
    instance: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    instance: state.instance
});

export default connect(mapStateToProps, {storeMessageTask,getMessageTask,getLogs})(SetMessage);