import React, { useEffect, useState ,useRef} from 'react';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,Checkbox,DatePicker,message,Space} from 'antd';
import Highlighter from 'react-highlight-words';
import {
    SearchOutlined
  } from '@ant-design/icons';
// import {columns} from './data';
import {getWadata,insertWadata,deleteWadata} from '../../actions/data';


const {Title} = Typography;



function Data({getWadata,insertWadata,deleteWadata,data : {wadatas,loading}}) {

    

    const navigate = useNavigate();
    useEffect(() => {
        getWadata()
    },[getWadata]);

    const onFinish = (values) => {
        insertWadata(values);
        message.success("Successly Insert!")
    };
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
  
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div
          style={{
            padding: 8,
          }}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

    const columns = [
        {
          title: 'ID',
          sorter: (a,b) => a.id - b.id,
          dataIndex : 'id',
          width: '5%',
          ...getColumnSearchProps('id')
        },
        {
            title: 'Question',
            dataIndex: 'client_text',
            sorter: (a,b) => (a.client_text).localeCompare(b.client_text),
            width: '30%',
          ...getColumnSearchProps('client_text')

        },
        {
            title: 'Answer',
            dataIndex: 'bot_text',
            sorter: (a,b) => (a.client_text).localeCompare(b.client_text),
            width: '30%',
          ...getColumnSearchProps('bot_text')

        },
        {
            title : "Actions",
            render : (_,record) => <>
                <Button type='primary' onClick={() => deleteWadata(record.id)}>Delete</Button>
               
            </>
        }
    ];

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