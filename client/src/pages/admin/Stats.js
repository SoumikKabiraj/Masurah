import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Card, List, Row, DatePicker, Button } from 'antd';
import axios from 'axios';
import Orderlist from '../../components/Orderlist';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Stats = () => {
  const [val, setVal] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const getSales = async () => {
    try {
      const res = await axios.post('/Masura/sales', { startDate: startDate, endDate: endDate }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
      });
      if (res.data.success) {
        setVal(res.data.data);
        calculateTotal(res.data.data);
      } else {
        console.log('Error in getting sales data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = (data) => {
    const totalProfitValue = data.reduce((acc, item) => acc + item.profit, 0);
    setTotalProfit(totalProfitValue);
    
    const totalOrdersValue = data.length;
    setTotalOrders(totalOrdersValue);
  };

  useEffect(() => {
    getSales();
  }, [startDate, endDate]);

  const handleStartDateChange = (date, dateString) => {
    setStartDate(dateString);
  };

  const handleEndDateChange = (date, dateString) => {
    setEndDate(dateString);
  };

  const handleFilterClick = () => {
    getSales();
  };

   



  const handleDownloadClick = () => {
  // Extract only the necessary data (Order Number, Profit, Discount, Created At)
  const extractedData = val.map((item, index) => {
    return {
      'Order Number': index + 1,
      Profit: item.profit,
      Discount: item.discount,
      'Created At': item.createdAt,
    };
  });

  // Extract item-wise sales with quantity and profit
  const itemWiseSales = {};
  const categoryWiseSales = {};

  val.forEach((order) => {
    order.items.forEach((item) => {
      const itemName = `${item.item} (${item.category})`;
      if (itemWiseSales[itemName]) {
        itemWiseSales[itemName].quantity += item.qty;
        itemWiseSales[itemName].profit += item.soldAt - item.costPrice;
      } else {
        itemWiseSales[itemName] = {
          item: itemName,
          quantity: item.qty,
          profit: item.soldAt - item.costPrice,
        };
      }

      // Category-wise sales
      if (categoryWiseSales[item.category]) {
        categoryWiseSales[item.category].quantity += item.qty;
        categoryWiseSales[item.category].profit += item.soldAt - item.costPrice;
      } else {
        categoryWiseSales[item.category] = {
          category: item.category,
          quantity: item.qty,
          profit: item.soldAt - item.costPrice,
        };
      }
    });
  });

  // Add item-wise sales to the extracted data
  // const itemWiseSalesArray = Object.values(itemWiseSales);
  // extractedData.push(...itemWiseSalesArray);

  // Convert extracted data to worksheet
  const ws = XLSX.utils.json_to_sheet(extractedData);

  // Create a workbook with the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


  // Add Item-wise data to a new sheet
  const ItemWiseData = Object.values(itemWiseSales);
  const wsItem = XLSX.utils.json_to_sheet(ItemWiseData);
  XLSX.utils.book_append_sheet(wb, wsItem, 'Item Wise');

  // Add category-wise data to a new sheet
  const categoryWiseData = Object.values(categoryWiseSales);
  const wsCategory = XLSX.utils.json_to_sheet(categoryWiseData);
  XLSX.utils.book_append_sheet(wb, wsCategory, 'Category Wise');

  // Save the workbook as an Excel file
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  // Create a link and trigger a download
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(data);
  link.download = 'sales_data.xlsx';
  link.click();
};





  return (
    <Layout>
      <h1 className='m-2 text-left'>Summary</h1>
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <DatePicker onChange={handleStartDateChange} placeholder='Start Date' style={{ marginRight: '8px' }} />
        <DatePicker onChange={handleEndDateChange} placeholder='End Date' style={{ marginRight: '8px' }} />
        <Button type='primary' onClick={handleFilterClick}>
          Filter
        </Button>
      </Row>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {Array.isArray(val) &&
          val.map((item) => <Orderlist key={item._id} item={item} />)}
      </div>
      <div style={{ marginTop: '40px', textAlign: 'center', padding: '16px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <p style={{ fontSize: '18px', marginBottom: '8px' }}>
          <b>Total Orders:</b> {totalOrders} | <b>Total Profit:</b> <i className="fa fa-inr" aria-hidden="true"></i> {totalProfit}
        </p>
        <Button type='primary' onClick={handleDownloadClick}>
          Download as Excel
        </Button>
      </div>
    </Layout>
  );
};

export default Stats;
