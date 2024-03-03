import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import { Row } from 'antd'
import Categorylist from '../../components/Categorylist'



function Inventory() {
    const [cat,setcat]=useState([])

    const getCategory = async()=>{
        try{
            const res = await axios.get('/Masura/getAllCategory',{
            headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.data.success){
            setcat(res.data.data);
        }
        }catch(error){
        console.log(`Error in User fetching: ${error}`)
        }
    }
    useEffect(()=>{
        getCategory ();
    },[])


  return (
    <Layout>
      <h1 className='m-2 text-left' >List of all categories</h1>
      <Row>
        {
          cat && cat.map(ct =>(
            <Categorylist cat={ct}/>
          ))

        }
      </Row>
    </Layout>
  )
}

export default Inventory
