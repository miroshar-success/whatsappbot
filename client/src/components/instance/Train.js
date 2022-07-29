import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate,useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,Radio} from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
  } from '@ant-design/icons';
import {getTrainData} from '../../actions/data'; 

const {Title} = Typography;


const Train = ({getTrainData,data : {traindatas,loading}}) => {
    const {in_id} = useParams();
    const navigate = useNavigate();
    const columns = [
        {
            title : "Id",
            dataIndex : "id"
        },
        {
            title : "Question",
            dataIndex : "client_text"
        },
        {
            title : "Answer",
            dataIndex : "bot_text"
        },
        {
            title : "Action",
            render : (_,record) => <>
                <Button type='primary' onClick={() => navigate("/"+record.in_id+"/"+record.id+"/train")}>Edit</Button>
            </>
        },
    ]
    console.log(in_id);
    useEffect(() => {
        getTrainData(in_id)
    },[getTrainData]);
    
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const handleTableChange = () => {

    }

    return ( 
        <>
         <div className='site-layout-content' style={{marginTop : 20,overflow : "auto"}}>
         <Row >
            <Col span={24}>
            <Table
                columns={columns}
                dataSource={traindatas}
                loading={loading}
            />
            </Col>
         </Row>
            
         </div>
        </>
     );
}

Train.propTypes = {
    getTrainData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {getTrainData})(Train);