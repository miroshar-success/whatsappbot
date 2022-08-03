import React, { useState,useEffect,useRef } from 'react';
import { Link, Navigate ,useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Card,Space, Avatar} from 'antd';
import Highlighter from 'react-highlight-words';
// import {columns} from './data';
import {
  SearchOutlined,
  SettingOutlined
} from '@ant-design/icons';

import {getUsers} from '../../actions/user'; 


const UserManagement = ({getUsers,user : {users,loading}}) => {

    useEffect(() => {
        getUsers()
    },[getUsers])
    const navigate = useNavigate();
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
          title: 'Profile',
          sorter: true,
          width: '10%',
          render : (_,record) => <><Avatar src={record.avatar} width="80"/></>,
          
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a,b) => (a.name).localeCompare(b.name) ,
            width: '20%',
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a,b) => (a.email).localeCompare(b.email),
            width: '20%',
            ...getColumnSearchProps('email')
        },
        {
            title: 'Created Date',
            render : (_,record) => <>{(record.date).substr(0,10)}</>,

            // dataIndex: 'date',
            sorter: (a,b) => (a.date).localeCompare(b.date),
            width: '20%',
            // ...getColumnSearchProps('date')
        },
        {
            title : "Actions",
            render : (_,record) => <>
                <Link to={"/edituser/"+record.email}> <Button type='success' icon={<SettingOutlined />}></Button></Link>
               
            </>
        }
    ];



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
                    // pagination={pagination}
                    loading={loading}
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