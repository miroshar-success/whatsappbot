import React, { useState,useEffect ,useRef} from 'react';
import { Link, Navigate ,useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Select,Typography,Card,Table,Space} from 'antd';
import Highlighter from 'react-highlight-words';
import {
    SearchOutlined
  } from '@ant-design/icons';
import {getBotsByInstance,deleteSourceKey} from '../../../actions/data'; 

const {Title} = Typography;
const {Option} = Select;

const SourceKeys = ({getBotsByInstance,deleteSourceKey,data : {bots,loading}}) => {
    const {instance_id} = useParams();
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const onFinish = (values) => {
        values.instance_id = instance_id;
        getBotsByInstance(instance_id);
    } 

    const deletekeys = (id) => {
        deleteSourceKey(id);
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
            title : "Keyword",
            dataIndex : "keyword",
            sorter : (a,b) => (a.keyword).localeCompaer(b.keyword),
            ...getColumnSearchProps('keyword')
        },
        {
            title : "Audience ID",
            dataIndex : "audience_id",
            sorter : (a,b) => (a.audience_id).localeCompaer(b.audience_id),
            ...getColumnSearchProps('audience_id')
        },
        {
            title : "Bot",
            dataIndex : "type",
            sorter : (a,b) => (a.type).localeCompaer(b.type),
            ...getColumnSearchProps('type')
        },
        {
            title : "Action",
            render : (_,record) => 
            <>
                <Button type='primary' onClick={() => deletekeys(record.id)}>Delete</Button>
            </>
        }
    ]

    return ( 
        <>
         <Card style={{margin : 50}}>
            <Row>
                <Col span={20}>
                    <Title level={2}>Source Keywords</Title>
                </Col>
            </Row>
            <Table
                columns = {columns}
                dataSource = {bots.sourceKeywords}
            />

            
            </Card>
        </>
     );
}

SourceKeys.propTypes = {
    getBotsByInstance : PropTypes.func.isRequired,
    deleteSourceKey : PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {getBotsByInstance,deleteSourceKey})(SourceKeys);