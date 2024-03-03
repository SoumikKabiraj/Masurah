import React from 'react';
import { useNavigate } from 'react-router-dom';

function Doctorlist({doctor}) {
    const navigate = useNavigate();
    return (
        <div>
        <div className="card m-2" style={{cursor: 'pointer',boxShadow: '2px 3px 10px #164B60'}} onClick={()=> navigate(`/doctor/book-appointment/${doctor._id}`)}>
            <div className="card-header" style={{backgroundColor:"#2D4356" ,color:"antiquewhite"}}>
                <div className='p-2'>Dr. {doctor.firstName} {doctor.lastName}</div>
            </div>
            <div className="card-body">
                <p>
                    <b>Specialization :</b> {doctor.specialization}
                </p>
                <p>
                    <b>Experience : </b> {doctor.experience}
                </p>
                <p>
                    <b>Fees : </b> {doctor.feesPerCunsaltation}
                </p>
                <p>
                    <b>Timing : </b> {doctor.timings[0]} - {doctor.timings[1]}
                </p>
            </div>
        </div>
        </div>
    )
}

export default Doctorlist
