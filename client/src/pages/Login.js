import React from 'react'
import { Form, Input ,message } from "antd";
import '../styles/RegisterStyles.css';
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from '../redux/features/alertSlice';


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onfinishHandler = async(values)=>{
    try {
      dispatch(showLoading())
      const res = await axios.post("/Masura/login", values);
      window.location.reload();
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("something went wrong");
    }
  }
  return (
     <div className='bdy'>
      <div className="form-container">
        <Form layout='vertical' onFinish={onfinishHandler} className='register-card p-4'>
        <h3 className='text-center'>Login Form</h3>
          <Form.Item label="Email" name="email">
            <Input type='email' required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type='password' required />
          </Form.Item>
          <Link to='/register'>Not a user Register Here!!</Link><br/><br/>
          <button className='btn btn-primary' type='submit'>
            Login
          </button>
        </Form>
      </div>
    </div>
  )
}

export default Login
