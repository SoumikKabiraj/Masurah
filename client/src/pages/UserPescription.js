
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Pescriptionlist from '../components/Pescriptionlist'

const UserPescription = () => {

  const [val,setVal]=useState([{}])
  const getPescriptionData = async() =>{
    try{
      const res =await axios.get("./Masura/getpescription",{
        headers: {
          Authorization: "Bearer "+localStorage.getItem('token'),
        }
      });
      if(res.data.success)
      {
        setVal(res.data.data)
        // console.log(res.data.data)
      }
      else
      {
        console.log("error in getting Pescription data")
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getPescriptionData()
  },[])
  console.log(val)
  return (
    <Layout>
      <h1 className='m-2 text-left' >Pescriptions</h1>
      {/* <h1> {val[0]._id}</h1> */}
      {
        Array.isArray(val) && val.map(item =>(
                <Pescriptionlist item={item}/>
              ))
      }
    </Layout>
  )
}

export default UserPescription
