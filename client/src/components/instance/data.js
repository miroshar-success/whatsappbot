import {Button} from 'antd';
import {
    SettingOutlined
  } from '@ant-design/icons';

import {Link} from 'react-router-dom';

const columns = [
    {
      title: 'Profile',
      sorter: true,
      dataIndex : 'avatar',
      width: '20%',
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