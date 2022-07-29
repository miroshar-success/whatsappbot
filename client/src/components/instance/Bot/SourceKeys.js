import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Select,Typography,Card,Table} from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
  } from '@ant-design/icons';
import {getBotsByInstance,deleteSourceKey} from '../../../actions/data'; 

const {Title} = Typography;
const {Option} = Select;

const SourceKeys = ({getBotsByInstance,deleteSourceKey,data : {bots,loading}}) => {
    const {instance_id} = useParams();
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const onFinish = (values) => {
        values.instance_id = instance_id;
        getBotsByInstance(instance_id);
    } 

    const deletekeys = (id) => {
        deleteSourceKey(id);
        getBotsByInstance(instance_id);
    }

    const columns = [
        {
            title : "Keyword",
            dataIndex : "keyword"
        },
        {
            title : "Audience ID",
            dataIndex : "audience_id"
        },
        {
            title : "Bot",
            dataIndex : "type"
        },
        {
            title : "Action",
            render : (_,record) => 
            <>
                <Button type='primary' onClick={() => deletekeys(record.id)}>Delete</Button>
            </>
        }
    ]

    return ( 
        <>
         <Card style={{margin : 50}}>
            <Row>
                <Col span={20}>
                    <Title level={2}>Source Keywords</Title>
                </Col>
            </Row>
            <Table
                columns = {columns}
                dataSource = {bots.sourceKeywords}
            />

            
            </Card>
        </>
     );
}

SourceKeys.propTypes = {
    getBotsByInstance : PropTypes.func.isRequired,
    deleteSourceKey : PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {getBotsByInstance,deleteSourceKey})(SourceKeys);