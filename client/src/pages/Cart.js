import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux'
import { message } from 'antd';
import axios from 'axios';



import { PDFViewer,PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';


const Cart = () => {
  const {user} =useSelector(state => state.user);
    const [person,setPerson] =useState({hasAccess: false});
    const [total,setTotal]=useState(0);
    const [cp,setCp]=useState(0);
    const [discount,setDiscount]=useState(0);
    const [cartId,setCartId]=useState();
    const [orderNumber,setOrderNumber]=useState(-1);
    const [val,setVal]=useState([{
        'item':'',
        'category':'',
        'description':'',
        'qty':'',
        'qtyType':'',
        'costPrice':'',
        'salesPrice':'',
        'soldAt':''
    }])
    const [isPrinting,SetIsPrinting]=useState(0);
    // var isPrinting=0;
    const getUserData = async() =>{
        try{
          const res =await axios.get("./Masura/profile",{
            headers: {
              Authorization: "Bearer "+localStorage.getItem('token'),
            }
          });
          if(res.data.success)
          {
            setPerson(res.data.data)
          }
          else
          {
            console.log("error in getting user data")
          }
        }catch(error){
          console.log(error)
        }
    }

    const getCartData = async() =>{
      try{
        const res =await axios.post("./Masura/getCart",{userId: user._id},{
          headers: {
            Authorization: "Bearer "+localStorage.getItem('token'),
          }
        });
        if(res.data.success)
        {

          setVal(res.data.data[0].items);
          setCartId(res.data.data[0]._id);
          // alert(val[0].item);
          let tot=0;
          console.log("got data")
        }
        else
        {
          console.log("error in getting user data")
        }
      }catch(error){
        console.log(error)
      };
    }


    const getOrderNumber = async() =>{
      try{
        const res =await axios.get("./Masura/getOrderNumber",{
          headers: {
            Authorization: "Bearer "+localStorage.getItem('token'),
          }
        });
        if(res.data.success)
        {
          // alert(res.data.data.orderNumber);
          setOrderNumber(res.data.data.orderNumber);
        }
        else
        {
          console.log("error in getting Cart Number")
        }
      }catch(error){
        console.log(error)
      };
    }

    const getTotal= ()=>{
      try{
        if(isPrinting===0)
          SetIsPrinting(1);
        else
          SetIsPrinting(0);
        let tot=0;
        let acttot=0;
        let tcp=0;//cost price
        for(let i=0;i<val.length;i++)
        {
           tot+=val[i].qty*val[i].soldAt;
           acttot+=val[i].qty*val[i].salesPrice;
           tcp+=val[i].qty*val[i].costPrice;
        }
        setTotal(tot);
        if((100*(acttot-tot)/acttot)>0)
          setDiscount(Math.round(100*(100*(acttot-tot)/acttot))/100);
        setCp(tcp);
      }catch(error){
        console.log(error)
      }
    };

    
    useEffect(()=>{
        getUserData();
        getOrderNumber();
        getCartData();
   
    },[])

    //Redirect to home

    

    const columns=[
    {
      title:'Item',
      dataIndex: 'item',
    },
    {
      title:'Category',
      dataIndex: 'category',
    },
    {
      title:'Description',
      dataIndex: 'description',
    },
    {
      title:'Quantity',
      dataIndex: 'qty',
    },
    {
      title:'Unit',
      dataIndex: 'qtyType',
    },
    {
      title:'Cost Price',
      dataIndex: 'costPrice',
    },    
    {
      title:'Sales Price',
      dataIndex: 'salesPrice',
    },
    {
      title:'Sold At',
      dataIndex: 'soldAt',
    }
  ]



  

const handlePrint = () => {
    const printContent = document.getElementById('print-content');
    if (printContent) {
      getTotal();
      const printWindow = window.open('', '_blank');
      const contentToPrint = printContent.innerHTML;

      printWindow.document.open();
      printWindow.document.write(` 
      
      <html>
  <head>
    <title>Print</title>
    <style>
      body {
        font-size: 2vw;
        font-family: Arial, sans-serif;
      }
      .print-container {
        border: 3px solid #000;
        padding: 10px;
      }
      .header {
        text-align: center;
        font-size: 2vw;
      }
      .sub-header {
        text-align: center;
        font-size: 1.5vw;
      }
      .current-date {
        text-align: center;
        font-size: 1vw;
        margin-top: .2vh;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 10px;
      }
      .table th, .table td {
        border: 1px solid #000;
        padding: 8px;
        text-align: center;
      }
      .footer {
        text-align: center;
        font-size: 1.2vw;
        font-style: italic;
        color: #555;
      }
      #masura-image {
        max-width: 15vw;
        height: auto;
        margin: 10px 0 10px 0; /* Align to the left */
        opacity: 0.8; /* Transparency */
        border-radius: 10%;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      .note {
        text-align: left;
        margin-top: 10px;
        font-style: italic;
        color: #555;
      }
      .discount-total {
        text-align: right;
        margin: 20px;
      }
      .grid1 {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
      .names {
        /* Removed position: absolute; */
      }
      .Image {
        // position: absolute;
        // right: 1;
        margin: 10px;
        max-width: 40%; /* Adjust width as needed */
      }
    </style>
  </head>
  <body>
    <div class="print-container">
      <div class='grid1'>

        <div class='Image'>
          <img src="https://i.ibb.co/RTzVSzV/Masura.jpg" alt="Masura" id="masura-image">
        </div>
        <div class='names'>
          <div class="header">
            <h1>MASURAH</h1>
            <div class="sub-header">
              <p>Exclusive Spices And Dry Fruits Store</p>
              <p>Your search - Best Quality Product @ wholesale Rate</p>
            </div>
            
            <div class="footer">
              <p>Address: Shop No-81 (Ground Floor), Regent Super Market, Amtala -743503</p>
              <p>Call: +91 6291317521</p>
            </div>
            <div class="current-date" id="currentDate">
              <!-- Current date will be dynamically inserted here -->
            </div>
          </div>
          
        </div>
      </div>
      
      <div id="print-content" class="discount-total">
        ${contentToPrint}
      </div>
      <div class="note">
        <p>Thank you for visiting! Visit again.</p>
        <p>Open from 10AM to 9PM</p>
      </div>
    </div>

    <script>
      // Dynamically set the current date
      var currentDateElement = document.getElementById("currentDate");
      currentDateElement.innerHTML = '<p>Date: ' + new Date().toLocaleDateString() + '</p>';
    </script>
  </body>
</html>





      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Print content not found.');
    }
  };



  const clearCart = async()=>{
    try{
        // console.log(res.body._id)

        const res =await axios.post("./Masura/clearCart",{_id: cartId,userId:user._id},{
          headers: {
            Authorization: "Bearer "+localStorage.getItem('token'),
          }
        });
      }catch(error){
        console.log(error)
      };
  }

  const onfinishHandler = async()=>{
      try{
      
      const res = await axios.post('/Masura/PostSale',{orderNumber:orderNumber ,userId: user._id,items: val,profit: (total-cp), discount: discount},
          {
              headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
              },
          }
      );
      

      // dispatch(hideLoading());
      if(res.data.success){
          message.success('Item Added to Database');
          changeOrderNumber();
          clearCart();
          window.location.href = '/';
          // window.location.reload();
      }else{
          message.error(res.data.message);
      }
      }catch(error)
      {
          // dispatch(hideLoading());
          message.error('Error While Adding to database');
      }
  }

  const changeOrderNumber =async()=>{
    try{
        const res =await axios.post("./Masura/updateOrderNumber",{},{
          headers: {
            Authorization: "Bearer "+localStorage.getItem('token'),
          }
        });
      }catch(error){
        console.log(error)
      };
  };

  //Dead function created just to add the order Number
  const createNewOrderNumber = async()=>{
    try{
      const res = await axios.post('/Masura/newOrderNumber',{orderNumber:1},
          {
              headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
              },
          }
      );
      if(res.data.success){
          message.success('Item Added to Database');
          clearCart();
          window.location.href = '/';
          // window.location.reload();
      }else{
          message.error(res.data.message);
      }
      }catch(error)
      {
          // dispatch(hideLoading());
          message.error('Error While Adding to database');
      }
  }

  //button to delete item
  const handleDeleteItem = async(index) => {
    // Show an alert with the index of the item in the array
    // alert(`Deleting item at index ${index}`);
    
    try{
      const res = await axios.post('/Masura/DeleteFromCart',{itemNo:index,userId: user._id},
          {
              headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
              },
          }
      );
      if(res.data.success){
          message.success('Successfully Deleted');
          getCartData();
          // clearCart();
          // window.location.href = '/';
          // window.location.reload();
      }else{
          message.error(res.data.message);
      }
      }catch(error)
      {
          // dispatch(hideLoading());
          message.error('Error While Adding to database');
      }

    
  };
  




    return person.hasAccess ? (
      <Layout>
    <div>
      <div id="print-content">
        <div><b>Order Number:  </b>{orderNumber}</div>
        <table className="table">
          <thead>
            <tr>
              <th><b>Sl No.</b></th>
              <th><b>Particulars</b></th>
              <th><b>Quantity</b></th>
              <th><b>Rate</b></th>
              <th><b>Discounted rate</b></th>
              <th><b>Amount</b></th>
              { /* New column for the delete button - conditionally rendered */}
              {!isPrinting && <th><b>Action</b></th>}
            </tr>
          </thead>
          <tbody>
            {val.map((item, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.item}</td>
                <td>{item.qty}</td>
                <td><span>&#8377;</span>{item.salesPrice}</td>
                <td><span>&#8377;</span>{item.soldAt}</td>
                <td><span>&#8377;</span>{item.qty*item.soldAt}</td>
                {!isPrinting && ( // Conditionally render the delete button
                  <td>
                    <button className='btn btn-danger' onClick={() => handleDeleteItem(index)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <h3><b>Total:</b>   <span>&#8377;</span> {total}</h3>
        <h3>Discount: {discount}%</h3>
      </div>
    </div>
    <div className='d-flex justify-content-end'>
      <button className='btn btn-dark m-4' onClick={getTotal}>
        Calculate Total
      </button>
      <button className='btn btn-dark m-4' onClick={handlePrint}>
        Generate Bill
      </button>
      <button className='btn btn-danger m-4' onClick={onfinishHandler}>
        Proceed With Order
      </button>
    </div>
  </Layout>
  ) : (
    <Layout>
      <div style={{ backgroundColor: 'rgba(255, 0, 0, 0.8)', padding: '10px', borderRadius: '5px', margin: '10px' }}>
          <p style={{ margin: '0', color: 'white' }}>You don't have access. Contact Admin...</p>
        </div>
    </Layout>
  );


  // return (
    
    
  // )
}

export default Cart



 