import {Button} from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    SettingOutlined
  } from '@ant-design/icons';

import {Link} from 'react-router-dom';

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
            <Button type='primary'>Delete</Button>
           
        </>
    }
];

export {columns};