import React, { useEffect, useState } from 'react';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,Checkbox,DatePicker,message} from 'antd';
// import {columns} from './data';
import {getWadata,insertWadata,deleteWadata} from '../../actions/data';

const {Title} = Typography;



function Data({getWadata,insertWadata,deleteWadata,data : {wadatas,loading}}) {

    const columns = [
        {
          title: 'ID',
          sorter: true,
          dataIndex : 'id',
          width: '5%',
        },
        {
            title: 'Question',
            dataIndex: 'client_text',
            sorter: true,
            width: '30%',
        },
        {
            title: 'Answer',
            dataIndex: 'bot_text',
            sorter: true,
            width: '30%',
        },
        {
            title : "Actions",
            render : (_,record) => <>
                <Button type='primary' onClick={() => deleteWadata(record.id)}>Delete</Button>
               
            </>
        }
    ];

    const navigate = useNavigate();
    useEffect(() => {
        getWadata()
    },[getWadata]);

    const onFinish = (values) => {
        insertWadata(values);
        message.success("Successly Insert!")
    };
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    return ( 
        <>
         <div className='site-layout-content' style={{marginTop : 20}}>
            <Row >
                <Col span={22}>
                    <Title level={2}>Add Initial Data</Title>
                </Col>
            </Row>
            <Form
                name="basic"
                layout='vertical'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                >
                <Form.Item
                    label="Question"
                    name="question"
                    rules={[{ required: true, message: 'Please input question!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Answer"
                    name="answer"
                    rules={[{ required: true, message: 'Please input answer!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    ADD
                    </Button>
                </Form.Item>
            </Form>
            <Row>
            <Title level={2}>Data</Title>
                <Col span={24}>
                    <Table
                        dataSource={wadatas}
                        columns={columns}
                        pagination={pagination}
                    />
                </Col>
            </Row>
            </div>
        </>
     );
}

Data.propTypes = {
    getWadata: PropTypes.func.isRequired,
    insertWadata : PropTypes.func.isRequired,
    deleteWadata : PropTypes.func.isRequired,
    data : PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
});
  

export default connect(mapStateToProps, {getWadata,insertWadata,deleteWadata})(Data);