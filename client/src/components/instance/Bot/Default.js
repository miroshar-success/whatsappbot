import React, { useState,useEffect,useRef } from 'react';
import { Link, Navigate ,useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Select,Typography,Card,Table,Space  } from 'antd';
import {deleteKeyWord} from '../../../actions/instance';
import {getBotsByInstance} from '../../../actions/data';
import Highlighter from 'react-highlight-words';

import {
    SettingOutlined,
    DownloadOutlined,
    SearchOutlined
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
      onFilter: (value, record) => record[dataIndex] ?
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
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
            dataIndex : "message",
            sorter : (a,b) => (a.message).localeCompare(b.message),
            ...getColumnSearchProps("message")
        },
        {
            title : "Message Type",
            dataIndex : "message_type",
            sorter : (a,b) => (a.message_type).localeCompare(b.message_type),
            ...getColumnSearchProps("message_type")

        },  
        {
            title : "Keywords",
            dataIndex : "keyword",
            sorter : (a,b) => (a.keyword ? a.keyword : "").localeCompare(b.message ? b.message : ""),
            ...getColumnSearchProps("keyword")
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