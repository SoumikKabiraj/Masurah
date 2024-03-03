
import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import axios from 'axios'


function ProfileUser() {
  const {user} =useSelector(state => state.user)

  const [val,setVal]=useState({})
  const getUserData = async() =>{
    try{
      const res =await axios.get("./Masura/profile",{
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
  // console.log(user._id)
  return (
    <Layout>
      <h1 className='m-2 text-left'>Profile Page</h1>
      <div className="card p-4" style={{marginTop:'40px',boxShadow: '2px 3px 20px #176B87', width:'60%'}}>
        {val && (
          <>
            <div className="card-header" style={{backgroundColor:"#2D4356" ,color:"antiquewhite"}}>
              <h4 style={{display:'flex',justifyContent: 'center'}}>
                Name: {val.name}
              </h4>
            </div>
            <div>
              <div className="d-flex flex-column" style={{justifyContent: 'center'}}>
                <div className="d-flex flex-row" style={{marginTop:'10px',paddingTop:'10px'}}><b>Email Id:</b><pre>  {val.email}</pre></div>
                <div className="d-flex flex-row" style={{marginTop:'10px',paddingTop:'10px'}}><b>Designation:</b><pre>  {val.isDoctor?'Doctor':val.isAdmin?'Admin':'User'}</pre></div>
                {/* <div className="d-flex flex-row" style={{marginTop:'10px',paddingTop:'10px'}}><b>Notifications:</b><pre>  {val.notification.length}</pre></div> */}
                <div className="d-flex flex-row" style={{marginTop:'10px',paddingTop:'10px'}}><b>UserId:</b><pre>  {val._id}</pre></div>
              </div> 
            </div>
          </>
        )}
      </div>
      {/* <h2>{val.name}</h2> */}
    </Layout>
  )
}

export default ProfileUser
