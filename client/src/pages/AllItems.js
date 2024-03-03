import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const AllItems = () => {
    const {user} =useSelector(state => state.user);
    const [person,setPerson] =useState({hasAccess: false});
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    const getItems = async () => {
        try {
            const res = await axios.get('/Masura/getAllItems', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            })
            if (res.data.success) {
                setItems(res.data.data);
            }
        } catch (error) {
            console.log(`Error in User fetching: ${error}`)
        }
    }

    useEffect(() => {
        getUserData();
        getItems();
    }, []);

    const handleSearch = (value) => {
        setSearchText(value);
    };

 const filteredItems = items.filter(item =>
    (item.category && item.category.toLowerCase().includes(searchText.toLowerCase())) ||
    (item.item && item.item.toLowerCase().includes(searchText.toLowerCase())) ||
    (item.description && item.description.toLowerCase().includes(searchText.toLowerCase()))
);


    const columns = [
        {
            title: 'Item',
            dataIndex: 'item',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
        },
        {
            title: 'Unit',
            dataIndex: 'qtyType',
        },
     
        {
            title: 'Sales Price',
            dataIndex: 'salesPrice',
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div className='d-flex'>
                    <button className='btn btn-danger' onClick={() => navigate(`/orderItem/${record._id}`)}>
                        Add
                    </button>
                </div>
            )
        }
    ];
    const getUserData = async() =>{
        try{
          const res =await axios.get("./Masura/profile",{
            headers: {
              Authorization: "Bearer "+localStorage.getItem('token'),
            }
          });
          if(res.data.success)
          {
            setPerson(res.data.data)
          }
          else
          {
            console.log("error in getting user data")
          }
        }catch(error){
          console.log(error)
        }
    }

    return person.hasAccess ? (
        <Layout>
            <h1 className='m-2 text-left'>{params.category} Items</h1>
            <Input.Search
                placeholder="Search by item or category"
                onChange={(e) => handleSearch(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
            {/* <Table columns={columns} dataSource={items} /> */}
            <Table columns={columns} dataSource={filteredItems} />
        </Layout>
    ) : (
    <Layout>
      <div style={{ backgroundColor: 'rgba(255, 0, 0, 0.8)', padding: '10px', borderRadius: '5px', margin: '10px' }}>
          <p style={{ margin: '0', color: 'white' }}>You don't have access. Contact Admin...</p>
        </div>
    </Layout>
  );
};

export default AllItems;
