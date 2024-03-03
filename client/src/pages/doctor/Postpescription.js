import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import moment from "moment";
import { message, Table } from "antd";
import { useNavigate } from "react-router-dom";

const Postpescription = () => {
  const navigate= useNavigate()
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/Masura/approved-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAppointments();
  }, []);


    const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Patient Name",
      dataIndex: "userName",
    },
    {
      title: "Post",
      dataIndex: "_id",
      render: (text, record) => (
        <div className="d-flex">
              <button className="btn btn-danger ms-2" onClick={()=> navigate(`/doctor/postpescription/pescription/${text}`)}>
                post
              </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Post Pescription</h1>
        <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Postpescription;
