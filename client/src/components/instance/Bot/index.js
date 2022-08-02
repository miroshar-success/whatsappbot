import React, { useState,useEffect } from 'react';
import { Link, Navigate ,useNavigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Form,Button,Row,Col,Input,Table,Typography,DatePicker} from 'antd';
import {
    SettingOutlined,
    DownloadOutlined
  } from '@ant-design/icons';
import {getBotsByInstance} from '../../../actions/data'; 
import General from './GeneralSetting';
import InstanceBot from './InstanceBot';
import SourceKey from './SourceKey';
import Default from './Default';
import SourceKeys from './SourceKeys';
import Webhook from './Webhook';
import AddKeyWord from './AddKeyWord';

const Bot = ({getBotsByInstance,data : {bots,loading}}) => {
    const {instance_id} = useParams();
    const [in_ourceKeywords,setinsourceKeyword] = useState(bots.sourceKeywords);
    useEffect(() => {
        getBotsByInstance(instance_id)
    },[getBotsByInstance]);
    const [form] = Form.useForm();
    console.log(bots,"index");
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });

    useEffect(() => {
        setinsourceKeyword(bots.sourceKeywords)
    },[bots])

    return ( 
        <>
         <Webhook/>
         <General/>
         <InstanceBot/>
         <SourceKey/>
         {in_ourceKeywords  ? <SourceKeys/> : <></>}
         <AddKeyWord/>
         <Default/>
        </>
     );
}

Bot.propTypes = {
    getBotsByInstance : PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, {getBotsByInstance})(Bot);