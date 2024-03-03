import React from 'react';
import { useNavigate } from 'react-router-dom';

function Medslist({medicene}) {
    const navigate = useNavigate();
    return (
        <div>
        <div className="card m-2" style={{cursor: 'pointer',boxShadow: '2px 3px 10px #164B60'}} onClick={()=> navigate(`/meds/buy_meds/${medicene._id}`)}>
            <div className="card-header" style={{backgroundColor:"#2D4356" ,color:"antiquewhite"}}>
                <div className='p-2'>{medicene.name}</div>
            </div>
            <div className="card-body">
                <p>
                    <b>Description :</b> {medicene.medInfo}
                </p>
                <p>
                    <b>Quantity : </b> {medicene.qty}
                </p>
                <p>
                    <b>Price : </b> {medicene.price}
                </p>
            </div>
        </div>
        </div>
    )
}

export default Medslist
