
import { useEffect, useState } from 'react';
import AdminLoginComponent from '../../components/admin_components/login'

import './../../index.css'
import { useNavigate } from 'react-router-dom';

 function AdminLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const navigate = useNavigate()
  const token = localStorage.getItem("adminToken");
  const loginCheck = (): void => {
    token ? setIsLoggedIn(true) : setIsLoggedIn(false);
  };
  useEffect(() => {
    loginCheck();
  });

  if (isLoggedIn){
    navigate('/admin')
  }else{
    return (
     <>
    <AdminLoginComponent />
     </>
    )

  }
  }


  



export default AdminLogin