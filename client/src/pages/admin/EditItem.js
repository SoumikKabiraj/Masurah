
import React from 'react';
import { Form, Input ,message } from "antd";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
// import { showLoading, hideLoading } from '../redux/features/alertSlice';
// import { useDispatch } from 'react-redux'
import { useEffect,useState } from 'react';

function EditItem() {
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
    const params=useParams();


    const onfinishHandler = async(values)=>{
        try{
        const res = await axios.post('/Masura/UpdateItem',{_id:it._id,values},
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
            <h1 className='m-2 text-left' >Edit Item {it.category} category</h1>
            <div >
                <div >
                    {/* <h1>{cat[0].category}</h1> */}
                    <Form layout='vertical' onFinish={onfinishHandler}  className='register-card p-4'>
                    <h3 className='text-center'>Please fill the below form</h3>

                        <Form.Item label="Item Name" name="item">
                            <Input type='text' placeholder={it.item} value={it.item} required />
                        </Form.Item>


                        <Form.Item label="Description" name="description">
                            <Input type='text' placeholder={it.description} value={it.description} required />
                        </Form.Item>

                        <Form.Item label="Category" name="category">
                            <select required='true' value={it.category}>
                                <option value="">EnterValue</option>
                                {cat.map((categ) => {
                                        return (
                                                <option value={categ.category}>{categ.category}</option>
                                        ); 
                                    })}
                            </select>
                        </Form.Item>
                    
                        <Form.Item label="Quantity" name="qty">
                            <Input type='text' placeholder={it.qty} value={it.qty} required />
                        </Form.Item>
                        <Form.Item label="Quantity Type" name="qtyType">
                            <select required='true' value={it.qtyType}>
                                <option value="">Enter Value</option>
                                <option value="Kgs">Kgs</option>
                                <option value="Gms">Gms</option>
                                <option value="No">No.</option>
                            </select>
                        </Form.Item>


                        <Form.Item label="Cost Price(/Unit)" name="costPrice">
                            <Input type='Number' placeholder={it.costPrice} value={it.costPrice} required />
                        </Form.Item>

                        <Form.Item label="Sales Price(/Unit" name="salesPrice">
                            <Input type='Number' placeholder={it.salesPrice} value={it.salesPrice} required />
                        </Form.Item>

                        <button className='btn btn-primary' type='submit'>
                            Update
                        </button>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}
export default EditItem

