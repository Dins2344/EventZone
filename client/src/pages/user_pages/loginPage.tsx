import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/user_components/loginForm"
import { useEffect, useState } from "react";

const LoginPage = ()=>{
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    const loginCheck = (): void => {
      token ? setIsLoggedIn(true) : setIsLoggedIn(false);
    };
    useEffect(() => {
      loginCheck();
    });

    if(isLoggedIn){
        navigate('/')
    }else{
        return(
            <>
            <LoginForm />
            </>
        )
    }
}

export default LoginPage