import React,{ useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import axios from 'axios';
import { Table, message } from 'antd';

const Doctors = () => {
  const [Doctor , setDoctor ] = useState([]);

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post("/Masura/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  const getDoctors  = async()=>{
    try{
      const res = await axios.get('/Masura/getAllDoctors',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        setDoctor (res.data.data);
      }
    }catch(error){
      console.log(`Error in User fetching: ${error}`)
    }
  }
  useEffect(()=>{
    getDoctors ();
  },[])

  const columns=[
    {
      title:'Name',
      // dataIndex: 'firstName',
       render: (text,record)=>(
        <span>{`${record.firstName} ${record.lastName}`}</span>
      )
    },
    {
      title:'Email',
      dataIndex: 'email',
    },
    {
      title:'Phone No',
      dataIndex: 'phone',
    },
    {
      title:'Status',
      dataIndex: 'status',
    },
    {
      title:'Actions',
      dataIndex: 'actions',
      render: (text,record)=>(
        <div className='d-flex'>
        {record.status === 'pending'?
          <button className='btn btn-success' onClick={()=>handleAccountStatus(record,"approved")}>
            Approve
          </button>
          :<button className='btn btn-danger' onClick={()=>handleAccountStatus(record,"pending")}>
            Reject
          </button>
        }
        </div>
      )
    }
  ]
  return (
    <Layout>
        <h1 className='m-2 text-left'>Doctor List</h1>
        <Table columns={columns} dataSource={Doctor} />
    </Layout>
  )
}

export default Doctors
