import React,{useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const AccessRoute=({children})=>{
    const {user} =useSelector(state => state.user);

    if(user.hasAccess){
        return children;
    }
    else{
        return <Navigate to="/" />;
    }

}

export default AccessRoute

