import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
const Home = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
        .then(res => {
            if(res.data.status){
                console.log(res);
                navigate('/login');
            }
        })
        .catch(err => {
            console.error(err)
        })
    }
  return (
    <>
      hello my home
      <button ><Link to="/dashboard">Dashboard</Link></button>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Home
