import React from 'react'
import Layout from '../components/Layout'
import { Tabs, message, notification } from 'antd'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NotificationPage() {
    const navigate =useNavigate();
    const dispatch =useDispatch()
    const {user} =useSelector(state => state.user)
    const handleMarkAllRead = async()=>{
        try{
            dispatch(showLoading());
            const res=await axios.post('/Masura/get-all-notification',{
                userId:user._id
            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message)
                window.location.reload();
            }else{
                message.error(res.data.message)
            }
        }catch(error){
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong in NotificationPage")
        }
    };
    
    const handleDeleteAllRead =async()=>{
        try{
            dispatch(showLoading())
            const res = await axios.post('./Masura/delete-all-notification',{userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch(hideLoading());
            if(res.data.success){
                message.success(res.data.message)
                window.location.reload();
            }else{
                message.error(res.data.message)
            }
        }catch(error){
            console.log("Error")
            message.error("Something went wrong in NotificationPage")
        }
    };
    return (
        <Layout>
            <h1 className='m-2 text-left'>Notification Page</h1>
            <Tabs>
                <Tabs.TabPane tab="Un-Read" key={0}>
                    <div className='d-flex justify-content-end'>
                        <h6 className='p-2 text-primary' style={{cursor:'pointer'}} onClick={handleMarkAllRead}>Mark All as Read</h6>
                    </div>
                    {
                        user?.notification.map(notificationMsg=>(
                            <div className="card" onClick={navigate( notificationMsg.onClickPath)} style={{cursor:'pointer'}}>
                                <div className="card-text">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={1}>
                    <div className='d-flex justify-content-end'>
                        <h6 className='p-2 text-primary' style={{cursor:'pointer'}} onClick={handleDeleteAllRead}>Delete All Read</h6>
                    </div>
                    {
                        user?.seennotification.map(notificationMsg=>(
                            <div className="card" onClick={navigate( notificationMsg.onCLickPath)} style={{cursor:'pointer'}}>
                                <div className="card-text">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default NotificationPage
