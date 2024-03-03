import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios';
import { Form, Input ,message } from "antd";
import { useParams } from 'react-router-dom';

const Pescription = () => {
    const { TextArea } = Input;
    const params=useParams();
    const [appointments, setAppointments] = useState([]);
    const getAppointments = async () => {
        try {
            const res = await axios.post("/Masura/getAppointmentById",{ appointmentId: params.id },
                {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                }
            );
            if (res.data.success) {
                console.log(appointments)
                setAppointments(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        getAppointments()
    },[])

    const onfinishHandler = async(values)=>{
        try{
        const res = await axios.post('/Masura/postpescription',{...values},
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }
        );

        if(res.data.success){
            // console.log(res.data.data)
            message.success('New Pescription added to database');
        }else{
            message.error(res.data.message);
        }
        }catch(error)
        {
            console.log(error);
            message.error('Error in Posting pescription');
        }
    }

  return (
    <Layout>
        <h1 className='m-2 text-left' >Pescription</h1>
        {/* onFinish={onfinishHandler} */}
        <Form layout='vertical' onFinish={onfinishHandler} className='register-card p-4'>
            <h3 className='text-center'>{appointments.userName}</h3>
            <Form.Item label="Diagnosis" name="diagnosis">
                <TextArea rows={2} required />
            </Form.Item>
            <Form.Item label="Tests" name="test">
                <TextArea rows={2} required />
            </Form.Item>
            <Form.Item label="Medicene" name="medicene">
                <TextArea rows={2} required />
            </Form.Item>
            {/* <Form.Item label="UserId" name="userId" value={`appointments.userId`}>
            </Form.Item> */}
            <Form.Item label={`patientId : ${appointments.userId}`} name="patientId">
                <TextArea rows={2} placeholder='Please Enter the above user id' required />
            </Form.Item>
            <Form.Item label={`AppointmentId : ${params.id}`} name="appointmentId">
                <TextArea rows={2} placeholder='Please Enter the above appointment id' required />
            </Form.Item>
            
            <button className='btn btn-primary' type='submit'>
                Post
            </button>
        </Form>
    </Layout>
  )
}

export default Pescription
