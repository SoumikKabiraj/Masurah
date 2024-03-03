import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(true);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const res = await axios.post("/Masura/getDoctorById",{ doctorId: params.id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/Masura/booking-availability",{ doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(false);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  
  

  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date || !time) {
        return alert("Please Enter Date and Time");
      }
      dispatch(showLoading());
      console.log(user)
      const res = await axios.post("/Masura/book-appointment",
        {
          doctorId: params.doctorId,
          userName:user.name,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);


  return (
    <Layout>
      <h1 className='m-2 text-left' >Booking Page</h1>
      <div className="card p-4" style={{marginTop:'40px',boxShadow: '2px 3px 20px #176B87', width:'60%'}}>
        {doctors && (
          <>
            <div className="card-header" style={{backgroundColor:"#2D4356" ,color:"antiquewhite"}}>
              <h4 style={{display:'flex',justifyContent: 'center'}}>
                Dr. {doctors.firstName} {doctors.lastName}
              </h4>
              <h4 style={{display:'flex',justifyContent: 'center'}}>
                Fees : {doctors.feesPerCunsaltation}
              </h4>
              <h4 style={{display:'flex',justifyContent: 'center'}}>
                Timings : {doctors.timings && doctors.timings[0]} -{" "}
                {doctors.timings && doctors.timings[1]}{" "}
              </h4>
            </div>
            <div>
              <div className="d-flex flex-column" style={{justifyContent: 'center'}}>
                <DatePicker
                  aria-required={"true"}
                  className="mt-3"
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setDate(moment(value).format("DD-MM-YYYY"));
                  }}
                />
                <TimePicker
                  aria-required={"true"}
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    setTime(moment(new Date(value)).format("HH:mm"));
                  }}
                />
                
                <button
                  className="btn btn-primary mt-2"
                  onClick=
                  {handleAvailability}
                >
                  Check Availability
                </button>
                
                  <button className="btn btn-dark mt-2"
                  onClick={handleBooking}>
                    Book Now
                  </button>
                
              </div> 
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;









