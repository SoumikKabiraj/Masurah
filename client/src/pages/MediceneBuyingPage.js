import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import Medslist from '../components/Medslist'
import { useNavigate, useParams } from 'react-router-dom'
import { Col, Form,Input,Row, message } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

function Medicene() {
      const { user } = useSelector((state) => state.user)
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const [medicene,setMedicene]=useState([])
      const params=useParams();

      const handleFinish = async (values) =>{
        try{
          dispatch(showLoading());
          const res= await axios.post("/Masura/postbuymeds",
          {
            ...values,
            userId: user._id,
            medId: medicene._id,
            medName: medicene.name,
            amount: medicene.price*values.orderqty
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          dispatch(hideLoading());
          if (res.data.success) {
            message.success(res.data.message);
            navigate("/medicene");
          } else {
            message.error(res.data.message);
          }
          }catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Somthing Went Wrrong ");
          }
        // alert(medicene.name);
      }

      const getUserData = async () => {
      try {
        const res = await axios.post("/Masura/getOneMedicene",{ medsId: params.id },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (res.data.success) {
          setMedicene(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(()=>{
        getUserData()
    },[])
    return (
        <Layout>
          <div className="card-header " style={{backgroundColor:"#2D4356", padding:"10px" ,color:"antiquewhite", maxWidth:"500px", borderRadius:"5px"  }}>
            <h4 style={{display:'flex',justifyContent: 'center'}}>
              Medicene Name : {medicene.name}
            </h4>
            <h4 style={{display:'flex',justifyContent: 'center'}}>
              Price per Unit : {medicene.price}
            </h4>
            <h4 style={{display:'flex',justifyContent: 'center'}}>
              Available-Quantity : {medicene.qty} 
            </h4>
          </div>
          <div className="card-header" style={{backgroundColor:"#F5F5F5" ,maxWidth:"500px", borderRadius:"5px", padding:"20px" }}>
            <Form layout='vertical' onFinish={handleFinish} className="m-2">
              <Row>
                <Col xs={24} md={24} lg={24}>
                  <Form.Item label="Name" name="name" required rules={[{ required: true }]}>
                    <Input type="text" placeholder='Enter Your Name'/>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={24} lg={24}>
                  <Form.Item label="Phone Number" name="phno" required rules={[{ required: true }]}>
                    <Input type="Phone Number" placeholder='Enter Your Phone Number'/>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={24} lg={24}>
                  <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                    <Input type="text" placeholder='Enter Your Address'/>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={24} lg={24}>
                  <Form.Item label="Order Quantity" name="orderqty" required rules={[{ required: true }]}>
                    <Input type="Number" placeholder='Enter Quantity'/>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={24} lg={24} style={{display:"flex",alignItems:"center",justifyContent:"right"}}>
                  <button className="btn btn-primary btn-lg btn-block mt-1" type="submit" style={{marginRight:"30px"}}>
                    Submit
                  </button>
                </Col>
              </Row>
            </Form>
          </div>
        
        </Layout>
    )
}

export default Medicene
