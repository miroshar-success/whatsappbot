import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,Card} from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
  } from '@ant-design/icons';
import {insertInstance} from '../../actions/instance';

const {Title} = Typography;


const  AddData = ({insertInstance}) => {

    const onFinish = (values) => {
        insertInstance(values);
    }
    return ( 
            <Card style={{margin : 50}}>
                <Row>
                <Col span={20}>
                    <Title level={2}>ADD Instance</Title>

                </Col>
            </Row>
            <Form
                name="basic"
                layout='vertical'
                onFinish={onFinish}
                autoComplete="off"
                >
                <Form.Item
                    label="Name Or Number*"
                    name="label"
                    
                    rules={[{ required: true, message: 'Please input Question!' }]}
                >
                    <Input  />
                </Form.Item>

                <Form.Item
                    label="Token*"
                    name="token"
                    
                    rules={[{ required: true, message: 'Please input Answer!' }]}
                >
                    <Input  />
                </Form.Item>

                <Form.Item
                    label="Instance URL**"
                    name="url"
                    
                    rules={[{ required: true, message: 'Please input Answer!' }]}
                >
                    <Input  />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Add
                    </Button>
                </Form.Item>
                </Form>
            </Card>
     );
}

AddData.propTypes = {
    insertInstance: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {insertInstance})(AddData)