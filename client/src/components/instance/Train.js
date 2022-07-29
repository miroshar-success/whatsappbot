import React, { useState,useEffect,useRef } from 'react';
import { Link, Navigate ,useNavigate,useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,Space} from 'antd';
import Highlighter from 'react-highlight-words';

import {
    SearchOutlined
  } from '@ant-design/icons';
import {getTrainData} from '../../actions/data'; 

const {Title} = Typography;


const Train = ({getTrainData,data : {traindatas,loading}}) => {
    const {in_id} = useParams();
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
            title : "Id",
            dataIndex : "id",
            sorter: (a,b) => (a.id).localeCompare(b.id),
            
        },
        {
            title : "Question",
            dataIndex : "client_text",
            sorter: (a,b) => (a.client_text).localeCompare(b.client_text),
            ...getColumnSearchProps('client_text')
        },
        {
            title : "Answer",
            dataIndex : "bot_text",
            sorter: (a,b) => (a.bot_text).localeCompare(b.bot_text),
            ...getColumnSearchProps('bot_text')

        },
        {
            title : "Action",
            render : (_,record) => <>
                <Button type='primary' onClick={() => navigate("/"+record.in_id+"/"+record.id+"/train")}>Edit</Button>
            </>
        },
    ]
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