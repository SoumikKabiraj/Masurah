
import React from 'react';
import { Form, Input ,message } from "antd";
import axios from 'axios';
import Layout from '../../components/Layout';
// import { showLoading, hideLoading } from '../redux/features/alertSlice';
// import { useDispatch } from 'react-redux'


function AddCategory() {
    // const dispatch=useDispatch();
    const onfinishHandler = async(values)=>{
        try{
        // dispatch(showLoading());'/HospitalManagement/postmeds
        const res = await axios.post('/Masura/PostCategory',values,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );
        // dispatch(hideLoading());
        if(res.data.success){
            message.success('Category Added to Database');
        }else{
            message.error(res.data.message);
        }
        }catch(error)
        {
            // dispatch(hideLoading());
            console.log(error);
            message.error('Error While Adding to database see AddCategory');
        }
    }
    return (
        <Layout>
            <h1 className='m-2 text-left' >Add New Category</h1>
            <div >
                <div >
                    <Form layout='vertical' onFinish={onfinishHandler} className='register-card p-4'>
                    <h3 className='text-center'>Category Form</h3>
                        <Form.Item label="Name" name="category">
                            <Input type='text' required />
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <Input type='text' required />
                        </Form.Item>
                        {/* <Form.Item label="Image" name="img">
                            <Input type='file' required />
                        </Form.Item> */}
                        <button className='btn btn-primary' type='submit'>
                            Post
                        </button>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory

