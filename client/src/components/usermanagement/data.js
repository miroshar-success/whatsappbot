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
      title: 'Profile',
      sorter: true,
      width: '10%',
      render : (_,record) => <><img src={record.avatar} width="80"/></>
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        sorter: true,
        width: '20%',
    },
    {
        title: 'Created Date',
        dataIndex: 'date',
        sorter: true,
        width: '20%',
    },
    {
        title : "Actions",
        render : (_,record) => <>
            <Link to={"/edituser/"+record.email}> <Button type='success' icon={<SettingOutlined />}></Button></Link>
           
        </>
    }
];

export {columns};