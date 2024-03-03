
import React from 'react';
import { Form, Input ,message } from "antd";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
// import { showLoading, hideLoading } from '../redux/features/alertSlice';
// import { useDispatch } from 'react-redux'
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux'


function OrderItem() {
    const [it,setit] =useState({
        "_id": "",
        "item": "",
        "category": "",
        "description": "",
        "qty": 0,
        "qtyType": "No",
        "costPrice": 0,
        "salesPrice": 0,
        "createdAt": "",
        "updatedAt": "",
        "__v": 0
    });
    const [cat,setcat] = useState([]);
    const {user} =useSelector(state => state.user);
    const params=useParams();


    const onfinishHandler = async(values)=>{
        try{
        const res = await axios.post('/Masura/addToCart',{userId:user._id ,_id:it._id,item:it.item,category:it.category,description:it.description,qty:it.qty,qtyType:it.qtyType,costPrice:it.costPrice,salesPrice:it.salesPrice,soldQty: values.qty,soldAt:values.salesPrice},
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );
        // dispatch(hideLoading());
        if(res.data.success){
            message.success('Loaded in cart');
            window.location.reload();
        }else{
            message.error(res.data.message);
        }
        }catch(error)
        {
            // dispatch(hideLoading());
            console.log(error);
            message.error('Error While Adding to Cart');
        }
    }

    const getItem = async()=>{
        try{
            const res = await axios.post('/Masura/getItemIdWise',{_id: params.id},{
            headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.data.success){
            setit(res.data.data);
        }
        }catch(error){
        console.log(`Error in User fetching: ${error}`)
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
        getItem ();
        getCategory();
    },[])



    return (
        <Layout>
            <h1 className='m-2 text-left' >Add {it.item} to Cart</h1>
            <div >
                <div >
                    {/* <h1>{cat[0].category}</h1> */}
                    <Form layout='vertical' onFinish={onfinishHandler}  className='register-card p-4'>
                        <h3 className='text-center'>Please Mention Quantity and Sold Price</h3>

                        <Form.Item label="Quantity" name="qty">
                            <Input type='text' placeholder={it.qty} value={it.qty} required />
                        </Form.Item>

                        <Form.Item label="Sales Price(/Unit" name="salesPrice">
                            <Input type='Number' placeholder={it.salesPrice} value={it.salesPrice} required />
                        </Form.Item>

                        <button className='btn btn-primary' type='submit'>
                            Add to Cart
                        </button>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}
export default OrderItem

