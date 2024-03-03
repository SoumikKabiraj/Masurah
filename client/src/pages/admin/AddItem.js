
import React from 'react';
import { Form, Input ,message } from "antd";
import axios from 'axios';
import Layout from '../../components/Layout';
// import { showLoading, hideLoading } from '../redux/features/alertSlice';
// import { useDispatch } from 'react-redux'
import { useEffect,useState } from 'react';

function AddItem() {
    //To get Category available to us
    const [cat,setcat]= useState([{"category":"Milk"},{"category":"Nuts"}]);
    // const dispatch=useDispatch();
    const onfinishHandler = async(values)=>{
        try{
        // dispatch(showLoading());'/HospitalManagement/postmeds
        const res = await axios.post('/Masura/PostItem',values,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );
        // dispatch(hideLoading());
        if(res.data.success){
            message.success('Item Added to Database');
            window.location.reload();
        }else{
            message.error(res.data.message);
        }
        }catch(error)
        {
            // dispatch(hideLoading());
            console.log(error);
            message.error('Error While Adding to database see AddItem');
        }
    }

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
            <h1 className='m-2 text-left' >Add New Item in the inventory</h1>
            <div >
                <div >
                    {/* <h1>{cat[0].category}</h1> */}

                    <Form layout='vertical' onFinish={onfinishHandler} className='register-card p-4'>
                    <h3 className='text-center'>Please fill the below form</h3>
                        <Form.Item label="Item Name" name="item">
                            <Input type='text' required />
                        </Form.Item>


                        <Form.Item label="Description" name="description">
                            <Input type='text' required />
                        </Form.Item>

                        <Form.Item label="Category" name="category">
                            <select>
                                <option value="">EnterValue</option>
                                {cat.map((categ) => {
                                        return (
                                                <option value={categ.category}>{categ.category}</option>
                                        ); 
                                    })}
                            </select>
                        </Form.Item>
                    
                        <Form.Item label="Quantity" name="qty">
                            <Input type='text' required />
                        </Form.Item>
                        <Form.Item label="Quantity Type" name="qtyType">
                            <select>
                                <option value="">Enter Value</option>
                                <option value="Kgs">Kgs</option>
                                <option value="Gms">Gms</option>
                                <option value="No">No.</option>
                            </select>
                        </Form.Item>


                        <Form.Item label="Cost Price(/Unit)" name="costPrice">
                            <Input type='Number' required />
                        </Form.Item>

                        <Form.Item label="Sales Price(/Unit" name="salesPrice">
                            <Input type='Number' required />
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
export default AddItem

