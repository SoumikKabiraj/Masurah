
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, List, Row } from 'antd';
import axios from 'axios'
import Orderlist from '../../components/Orderlist';
import Layout from '../../components/Layout';

const Allorders = () => {
    const {user} =useSelector(state => state.user)
    const [val,setVal]=useState({})
    const getUserData = async() =>{
    try{
      const res =await axios.get("./Masura/getalluserorders",{
        headers: {
          Authorization: "Bearer "+localStorage.getItem('token'),
        }
      });
      if(res.data.success)
      {
        setVal(res.data.data)
      }
      else
      {
        console.log("error in getting user data")
      }
    }catch(error){
      console.log(error)
    }
    }
    useEffect(()=>{
        getUserData()
    },[])
    return(
        
        <Layout>
            <h1>All Orders Placed</h1>
            {
                    Array.isArray(val) && val.map(item =>(
                    <Orderlist item={item}/>
                ))
            }
        </Layout>
    )
}

export default Allorders
