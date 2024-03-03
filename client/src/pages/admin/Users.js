import React,{ useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import axios from 'axios';
import { Table } from 'antd';

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async()=>{
    try{
      const res = await axios.get('/Masura/getAllUsers',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        setUsers(res.data.data);
      }
    }catch(error){
      console.log(`Error in User fetching: ${error}`)
    }
  }

//changeAccountStatus

  const handleAccountStatus = async (record, ans) => {
    console.log(alert)
    try {
      const res = await axios.post("/Masura/toggleUser",
        { guyId: record._id, userId: record.userId, status:ans.status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        // message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      // message.error("Something Went Wrong");
      console.log(`Error at toggleuser function`);
    }
  };



  useEffect(()=>{
    getUsers();
  },[])

  const columns=[
    {
      title:'Name',
      dataIndex: 'name',
    },
    {
      title:'Email',
      dataIndex: 'email',
    },
    {
      title:'Position',
      render: (text,record)=>(
        <span>{record.isDoctor?'Doctor':record.isAdmin?'Admin':'User'}</span>
      )
    },
    {
      title:'Actions',
    //   dataIndex: 'hasAccess',
      // render: (text,record)=>(
       
      //     <button className='btn btn-danger'>
      //       Block
      //     </button>
      render: (text,record)=>( 
          <div className='d-flex'>
            {record.isAdmin?
              '':record.hasAccess?
              <button className='btn btn-danger' onClick={()=>handleAccountStatus(record,{guyid:record._Id,status: false})}>
                Reject
              </button>: <button className='btn btn-success' onClick={()=>handleAccountStatus(record,{guyid:record._Id,status: true})}>
                Approve
              </button>
            
            }
          </div>
      )
        
      // )
     
    }
  ]
  return (
    <Layout>
        <h1 className='m-2 text-left'>User List</h1>
        <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default Users
