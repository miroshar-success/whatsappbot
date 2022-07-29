import React, { useState,useEffect,useRef } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Button,Row,Col,Input,Table,Typography,Radio,Space} from 'antd';
import Highlighter from 'react-highlight-words';

import {
    SearchOutlined
  } from '@ant-design/icons';
import {getInstances,makePublic,deleteInstance} from '../../actions/instance'; 

const {Title} = Typography;


const Instance = ({getInstances,makePublic,deleteInstance,instance : {instances,loading}}) => {

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
            title : "Id",
            dataIndex : "id",
            sorter : (a,b) => a.id - b.id,
            ...getColumnSearchProps('id')
        },
        {
            title : "Label",
            dataIndex : "label",
            sorter : (a,b) => (a.label).localeCompare(b.label),
            ...getColumnSearchProps('label')
        },
        {
            title : "Token",
            dataIndex : "token",
            sorter : (a,b) => (a.token).localeCompare(b.token),
            ...getColumnSearchProps('token')
        },
        {
            title : "URL",
            dataIndex : 'url',
            sorter : (a,b) => (a.url).localeCompare(b.url),
            ...getColumnSearchProps('url')
        },
        {
            title : "Action",
            render : (_,record) => <>
              <Row>
                <Col span={4}>
                  <Button><Link to={"/"+record.in_id + "/train"}>Train</Link></Button>
                </Col>
                <Col span={4}>
                  <Button><Link to={"/"+record.id + "/bot"}>Bot</Link></Button>
                </Col>
                <Col span={4}>
                  <Button><Link to={"/"+record.id + "/message"}>MessageTask</Link></Button>
                </Col>
                <Col span={4}>
                  <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                </Col>
                <Col span={4}>
                  {
                      record.public ? <Button value="public" onClick={() => handlePublic(record.id) }>Make Private</Button> : <Button value="private" type='primary' onClick={() => handlePublic(record.id)}>Make Public</Button>
                  }
                </Col>
              </Row>  

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