import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import { Row } from 'antd'
import Categorylist from '../../components/Categorylist'
import { useNavigate } from 'react-router-dom'




function Inventory() {
    const [cat,setcat]=useState([])
const navigate = useNavigate();


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
        <div className="card m-2" style={{cursor: 'pointer',boxShadow: '2px 3px 10px #164B60'}} onClick={()=> navigate(`/admin/itemlist/${"NA"}`)}>
    
            <div className="card-body">
                <p>
                    <b>Cat :</b> Null
                </p>
                <p>
                    <b>Des :</b> Contains Items whose Category is not set
                </p>
            </div>
        </div>
      </Row>
    </Layout>
  )
}

export default Inventory
