import React from 'react';
import { Table, Button } from 'antd';
import * as XLSX from 'xlsx';


const Orderlist = ({ item, index }) => {
  const columns = [
    {
      title: 'Item',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Cost Price',
      dataIndex: 'costPrice',
      key: 'costPrice',
    },
    {
      title: 'Sales Price',
      dataIndex: 'salesPrice',
      key: 'salesPrice',
    },
  ];

  const data = item.items.map((orderItem, subIndex) => ({
    key: subIndex,
    item: orderItem.item,
    costPrice: orderItem.costPrice,
    salesPrice: orderItem.salesPrice,
    qty: orderItem.qty,
  }));

  const handleDownloadClick = () => {
    // Convert array to worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Create a workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'OrderDetails');

    // Save the workbook as an Excel file
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Create a link and trigger a download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(dataBlob);
    link.download = `order_details_${item.orderNumber}.xlsx`; // Use order number in the file name
    link.click();
  };

  return (
    <div className="">
      <div className="card m-2" style={{ cursor: 'pointer', boxShadow: '2px 3px 10px #164B60' }}>
        <div className="card-header" style={{ backgroundColor: '#2D4356', color: 'antiquewhite' }}>
          <div className='p-2'> Order Number: {item.orderNumber}</div>
        </div>
        <div className="card-body">
          <Table columns={columns} dataSource={data} pagination={false} />
          <p>
            <b>Total Profit : </b> <i className="fa fa-inr" aria-hidden="true"></i> {item.profit}
          </p>
          <p>
            <b>Discount : </b> {item.discount} %
          </p>
          <p>
            <b>Ordered On : </b> {item.createdAt}
          </p>
          <Button type="primary" onClick={handleDownloadClick}>
            Download Order Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Orderlist;
