import React from 'react';

const Cartlist = ({item}) => {
  return (
    <div className=''>
        <div className="card m-2" style={{cursor: 'pointer',boxShadow: '2px 3px 10px #164B60'}} >
            <div className="card-header" style={{backgroundColor:"#2D4356" ,color:"antiquewhite"}}>
                <div className='p-2'> {item.medName}</div>
            </div>
            <div className="card-body">
                <p>
                    <b>Ordered By :</b> {item.name}
                </p>
                <p>
                    <b>Amount :</b> {item.amount}
                </p>
                <p>
                    <b>Address : </b> {item.address}
                </p>
                <p>
                    <b>Ordered On : </b> {item.createdAt}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Cartlist
