import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import {Row} from 'antd'
import Medslist from '../components/Medslist'

function Medicene() {
    const [medicene,setMedicene]=useState([])
    const getUserData = async() =>{
        try{
        const res =await axios.get("./Masura/getAllMedicenes",{
            headers: {
            Authorization: "Bearer "+localStorage.getItem('token'),
            }
        });
        if(res.data.success)
        {
            setMedicene(res.data.data)
        }
        else
        {
            console.log("error in getting medicene information")
        }
        }catch(error){
        console.log(error)
        }
    }
    useEffect(()=>{
        getUserData()
    },[])
    return (
        <Layout>
        <h1 className='m-2 text-left' >Buy Medicene</h1>
        <Row>
            {
            medicene && medicene.map(medicene =>(
                <Medslist medicene={medicene} />
            ))

            } 
        </Row>
        </Layout>
    )
}

export default Medicene
