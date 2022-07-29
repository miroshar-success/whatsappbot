import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Select,Typography,Card,Table  } from 'antd';
import {deleteKeyWord} from '../../../actions/instance';
import {getBotsByInstance} from '../../../actions/data';
import {
    SettingOutlined,
    DownloadOutlined
  } from '@ant-design/icons';

const {Title} = Typography;
const {Option} = Select;

const Default = ({deleteKeyWord,getBotsByInstance,data : {bots,loading}}) => {
    const {instance_id,id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const delMes = (_id) => {
        deleteKeyWord(_id);
        getBotsByInstance(instance_id);
    }
    const columns = [
        {
            title : "Action",
            render : (_,record) =><>
                {record.message_type != "AI" ? 
                <>
                <Button type='primary' onClick={() => navigate("/"+record.instance_id+"/"+record.id+"/editkeyword")}>Edit</Button>
                <Button type='primary' onClick={() => delMes(record.id)}>Delete</Button>
                </> : <Button type='primary'  onClick={() => delMes(record.id)}>Delete</Button>}

            </>
        },
        {
            title : "Text/Link/Title/Filename --File",
            dataIndex : "message"
        },
        {
            title : "Message Type",
            dataIndex : "message_type"
        },
        {
            title : "Keyword",
            dataIndex : "keyword"
        }
    ]
    const onFinish = (values) => {
    } 



    return ( 
        <>
         <Card style={{margin : 50}}>
            <Row>
                <Col span={20}>
                    <Title level={2}>Default Bot Keywords</Title>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={bots.keywords}
                    />
                </Col>
                
            </Row>
            
            </Card>
        </>
     );
}

Default.propTypes = {
    deleteKeyWord : PropTypes.func.isRequired,
    getBotsByInstance : PropTypes.func.isRequired,

    data: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {deleteKeyWord,getBotsByInstance})(Default);