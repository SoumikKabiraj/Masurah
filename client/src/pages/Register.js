import React from 'react'
import { Form, Input ,message} from "antd";
import '../styles/RegisterStyles.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';

function Register() {
  const dispatch=useDispatch();
  //redirect to a different page
  const navigate = useNavigate();
  //Form Handler
  const onfinishHandler = async(values)=>{
    try{
      dispatch(showLoading());
      const res = await axios.post('/Masura/register',values)
      dispatch(hideLoading());
      if(res.data.success){
        message.success('Regestered Successfully');
        navigate('/login');
      }else{
        message.error(res.data.message);
      }
    }catch(error)
    {
      dispatch(hideLoading());
      console.log(error);
      message.error('Error in registration');
    }
  }
  return (
    <div className='bdy'>
      <div className="form-container">
        <Form layout='vertical' onFinish={onfinishHandler} className='register-card p-4'>
        <h3 className='text-center'>Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type='text' required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type='email' required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type='password' required />
          </Form.Item>
          <Link to='/login'>Already an user Login Here!!</Link><br/><br/>
          <button className='btn btn-primary' type='submit'>
            Register
          </button>
        </Form>
      </div>
    </div>
  )
}

export default Register
