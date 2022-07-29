import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Card} from 'antd';
import {columns} from './data';

import {getUsers} from '../../actions/user'; 


const UserManagement = ({getUsers,user : {users,loading}}) => {

    useEffect(() => {
        getUsers()
    },[getUsers])
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const handleTableChange = () => {

    }

    return ( 
        <>
         <Card style={{margin : 50}}>
            <Row>
                <Col span={2}>
                    <Button type='primary' onClick={() => navigate("/adduser")}>Add User</Button>

                </Col>
            </Row>
            <Row  style={{marginTop : 30}}>
                <Col span={24}>
                    <Table
                    columns={columns}
                    // rowKey={(record) => record.login.uuid}
                    dataSource={users}
                    pagination={pagination}
                    loading={loading}
                    onChange={handleTableChange}
                    />
                </Col>
            </Row>
            </Card>
        </>
     );
}

UserManagement.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {getUsers})(UserManagement);