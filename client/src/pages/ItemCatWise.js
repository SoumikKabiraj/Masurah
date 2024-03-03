import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';

const ItemCatWise = () => {
    const [items, setItems] = useState([]);
    const params = useParams();
    const navigate=useNavigate();
    const getItems = async()=>{
    try{
      const res = await axios.post('/Masura/getItemsCatWise',{ category: params.category },
      {
        headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        } 
      })
      if(res.data.success){
        setItems(res.data.data);
      }
    }catch(error){
      console.log(`Error in User fetching: ${error}`)
    }
  }


  useEffect(() => {
    getItems();
  }, []);

  const columns=[
    {
      title:'Item',
      dataIndex: 'item',
    },
    {
      title:'Category',
      dataIndex: 'category',
    },
    {
      title:'Description',
      dataIndex: 'description',
    },
    {
      title:'Quantity',
      dataIndex: 'qty',
    },
    {
      title:'Unit',
      dataIndex: 'qtyType',
    },
    {
      title:'Cost Price',
      dataIndex: 'costPrice',
    },    
    {
      title:'Sales Price',
      dataIndex: 'salesPrice',
    },
    {
      title:'Actions',
      render: (text,record)=>( 
          <div className='d-flex'>
              <button className='btn btn-danger' onClick={()=> navigate(`/admin/editItem/${record._id}`)}>
                Edit
              </button>
          </div>
      )
    }
  ]
  return (
    <Layout>
        <h1 className='m-2 text-left'>{params.category} Items</h1>
        <Table columns={columns} dataSource={items} />
    </Layout>
  )

};

export default ItemCatWise;



