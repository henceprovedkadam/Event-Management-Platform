import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
const Dashboard = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001/verify', {withCredentials: true})
        .then(res => {
            if(res.data.status){
                console.log("User Verified:", res.data.user);
            } else{
                console.log("Not Authorized:", res.data.msg);
                navigate('/home');
            }
        })
    });

  return (
    <>
      this is my dashboard
    </>
  )
}

export default Dashboard
