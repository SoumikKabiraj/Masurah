import React from 'react'

const Pescriptionlist = ({item}) => {
  return (
    <div className=''>
    {
        console.log(item)
    }
        <div className="card m-2" style={{cursor: 'pointer',boxShadow: '2px 3px 10px #164B60'}} >
            <div className="card-header" style={{backgroundColor:"#2D4356" ,color:"antiquewhite"}}>
                <div className='p-2'>Pescription posted by: {item.userId}</div>
            </div>
            <div className="card-body">
                <p>
                    <b>Diagnosis :</b> {item.diagnosis}
                </p>
                <p>
                    <b>Pescribed Medicene :</b> {item.medicene}
                </p>
                <p>
                    <b>Tests to be done : </b> {item.test}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Pescriptionlist
