import React from 'react';
import { useNavigate } from 'react-router-dom';

function Categorylist({cat}) {
    const navigate = useNavigate();
    return (
        <div>
        <div className="card m-2" style={{cursor: 'pointer',boxShadow: '2px 3px 10px #164B60'}} onClick={()=> navigate(`/admin/itemlist/${cat.category}`)}>
    
            <div className="card-body">
                <p>
                    <b>Cat :</b> {cat.category}
                </p>
                <p>
                    <b>Des :</b> {cat.description}
                </p>
            </div>
        </div>
        </div>
    )
}

export default Categorylist
