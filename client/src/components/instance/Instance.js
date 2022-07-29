import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,Radio} from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
  } from '@ant-design/icons';
import {getInstances,makePublic,deleteInstance} from '../../actions/instance'; 

const {Title} = Typography;


const Instance = ({getInstances,makePublic,deleteInstance,instance : {instances,loading}}) => {

    const columns = [
        {
            title : "Id",
            dataIndex : "id"
        },
        {
            title : "Label",
            dataIndex : "label"
        },
        {
            title : "Token",
            dataIndex : "token"
        },
        {
            title : "URL",
            dataIndex : 'url'
        },
        {
            title : "Action",
            render : (_,record) => <>
               <Radio.Group buttonStyle="solid">
               {/* <Radio.Button value="download"><DownloadOutlined /></Radio.Button> */}

                <Radio.Button value="train"><Link to={"/"+record.in_id + "/train"}>Train</Link></Radio.Button>
                <Radio.Button value="bot"><Link to={"/"+record.id + "/bot"}>Bot</Link></Radio.Button>
                <Radio.Button value="message"><Link to={"/"+record.id + "/message"}>MessageTask</Link></Radio.Button>
                <Radio.Button value="delete" onClick={() => handleDelete(record.id)}>Delete</Radio.Button>
                <Radio.Button value="export" >Export Number</Radio.Button>
                {
                    record.public ? <Radio.Button value="public" onClick={() => handlePublic(record.id) }>Make Private</Radio.Button> : <Radio.Button value="private"  onClick={() => handlePublic(record.id)}>Make Public</Radio.Button>
                }

            </Radio.Group>

            </>
        }
    ]

    useEffect(() => {
        getInstances()
    },[getInstances]);

    const handleDelete = (id) => {
        deleteInstance(id);
        getInstances();
    }
    const handlePublic = (id) => {
        makePublic(id);
        getInstances();
    }
    console.log(instances);
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const handleTableChange = () => {

    }

    return ( 
        <>
         <div className='site-layout-content' style={{marginTop : 20}}>
            <Row>
                <Col span={20}>
                    <Title level={2}>All Instances</Title>

                </Col>
            </Row>
            <Row  style={{marginTop : 30}}>
                <Col span={24}>
                    <Table
                    columns={columns}
                    // rowKey={(record) => record.login.uuid}
                    dataSource={instances}
                    pagination={pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    />
                </Col>
            </Row>
            </div>
        </>
     );
}

Instance.propTypes = {
    getInstances: PropTypes.func.isRequired,
    deleteInstance: PropTypes.func.isRequired,
    makePublic: PropTypes.func.isRequired,

    instance: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    instance: state.instance
});

export default connect(mapStateToProps, {getInstances,deleteInstance,makePublic})(Instance);