import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Input, Table, Typography, DatePicker, Select, Card, Upload, Space } from 'antd';
import {
    SettingOutlined,
    DownloadOutlined,
    UploadOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ContentValue = (props) => {
    const {setMessage,setlink,setlinktitle,setMessagetoagent,setMessagetouser,setnumber,message,link,linktitle,fileList,mes_type,fileprops,messagetouser,messagetoagent,number} = props;
    switch (mes_type) {
        case "Text":
            return <div style={{ marginBottom: 10 }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <TextArea onChange={(e)=>setMessage(e.target.value)} rows={4} placeholder="Please input message" value={message}/>
                </Space>

            </div>
        case "Link":
            return <div style={{ marginBottom: 10 }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Input value={link}  onChange={e => setlink(e.target.value)} style={{ width: "100%" }} placeholder="Please input link"/>
                    <Upload {...fileprops}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    <Input value={linktitle} onChange={(e) => setlinktitle(e.target.value)} placeholder="Please input Title" />
                </Space>


            </div>
        case "File":
            return <div style={{ marginBottom: 10 }}> 
                <Upload {...fileprops}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
            </div>
        case "Forward":
            return <div style={{ marginBottom: 10 }}>
                <Space direction="vertical" style={{width : "100%"}}>
                    <Input value={number} onChange={(e) => setnumber(e.target.value)}  placeholder="Please input Number" />
                    <Input value={messagetouser} onChange={(e) => setMessagetouser(e.target.value)} placeholder="Please input Message to User" />
                    <Input value={messagetoagent} onChange={(e) => setMessagetoagent(e.target.value)} placeholder="Please input Message to Agent" />
                </Space>
                
            </div>
        default:
            return <></>
            break;
    }
}

export default ContentValue;