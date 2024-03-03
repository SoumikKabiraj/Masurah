
import React from 'react';
import { Form, Input ,message } from "antd";
import axios from 'axios';
import Layout from '../../components/Layout';
// import { showLoading, hideLoading } from '../redux/features/alertSlice';
// import { useDispatch } from 'react-redux'


function MedicenePosting() {
    // const dispatch=useDispatch();
    const onfinishHandler = async(values)=>{
        try{
        // dispatch(showLoading());
        const res = await axios.post('/HospitalManagement/postmeds',values,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );
        // dispatch(hideLoading());
        if(res.data.success){
            message.success('New Medicene added to database');
        }else{
            message.error(res.data.message);
        }
        }catch(error)
        {
            // dispatch(hideLoading());
            console.log(error);
            message.error('Error in Posting medicene');
        }
    }
    return (
        <Layout>
            <h1 className='m-2 text-left' >Post New Medicene</h1>
            <div >
                <div >
                    <Form layout='vertical' onFinish={onfinishHandler} className='register-card p-4'>
                    <h3 className='text-center'>Medicene Form</h3>
                        <Form.Item label="Name" name="name">
                            <Input type='text' required />
                        </Form.Item>
                        <Form.Item label="Medicene Info" name="medInfo">
                            <Input type='text' required />
                        </Form.Item>
                        <Form.Item label="Quantity" name="qty">
                            <Input type='number' required />
                        </Form.Item>
                        <Form.Item label="Expiry-Date" name="expiryDate">
                            <Input type='date' required />
                        </Form.Item>
                        <Form.Item label="Price" name="price">
                            <Input type='number' required />
                        </Form.Item>
                        <button className='btn btn-primary' type='submit'>
                            Post
                        </button>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default MedicenePosting

