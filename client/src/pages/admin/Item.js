import React,{ useEffect, useState } from 'react'
import Layout from './../../components/Layout';
import axios from 'axios';
import { Table } from 'antd';

const Item = () => {
  const [Items, setItems] = useState([]);

  const getUsers = async()=>{
    try{
      const res = await axios.get('/Masura/getCatItem',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        setItems(res.data.data);
      }
    }catch(error){
      console.log(`Error in User fetching: ${error}`)
    }
  }

//changeAccountStatus

//   const handleAccountStatus = async (record, ans) => {
//     console.log(alert)
//     try {
//       const res = await axios.post("/Masura/toggleUser",
//         { guyId: record._id, userId: record.userId, status:ans.status },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         // message.success(res.data.message);
//         window.location.reload();
//       }
//     } catch (error) {
//       // message.error("Something Went Wrong");
//       console.log(`Error at toggleuser function`);
//     }
//   };



  useEffect(()=>{
    getUsers();
  },[])

  const columns=[
    {
      title:'Name',
      dataIndex: 'name',
    },
    {
      title:'Quantity Left',
      dataIndex: 'qty',
    },
    {
      title:'Cost Price',
      dataIndex: 'costPrice',
    },
    {
        title:'Sales Price',
        dataIndex: 'salesPrice'
    }

    // {
    //   title:'Actions',
    //   render: (text,record)=>( 
    //       <div className='d-flex'>
    //         {record.isAdmin?
    //           '':record.hasAccess?
    //           <button className='btn btn-danger' onClick={()=>handleAccountStatus(record,{guyid:record._Id,status: false})}>
    //             Reject
    //           </button>: <button className='btn btn-success' onClick={()=>handleAccountStatus(record,{guyid:record._Id,status: true})}>
    //             Approve
    //           </button>
            
    //         }
    //       </div>
    //   )
        
    //   // )
     
    // }
  ]
  return (
    <Layout>
        <h1 className='m-2 text-left'>User List</h1>
        <Table columns={columns} dataSource={users} />
    </Layout>
  )
}

export default Item
