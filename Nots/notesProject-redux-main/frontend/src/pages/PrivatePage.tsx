import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PrivatePageProps {
  children: ReactNode;
  isLoggedIn: boolean;
}

const PrivatePage: React.FC<PrivatePageProps> = ({ children, isLoggedIn }) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();
   const isValidToken = async (token: string): Promise<boolean> => {
    const response = await axios.get("http://localhost:3001/api/auth/protected/token", {headers: {Authorization: `Bearer ${token}`}});
    // if(!response.data)
    //     return false;
    console.log(response.data);
    return true;
  }

  const handleToken = async() => {
    const token = localStorage.getItem("token");
    if(!token){
        navigate("/");
        return;
    }
        // return false;
    const isValid = await isValidToken(token);
    if(!isValid){
        navigate("/");
        return;
    }
  }

  useEffect(() => {
    handleToken();
    if (!isLoggedIn) {
        navigate("/");
    }
    setIsLoading(false);
  }, []);

  return <>
  {isLoading ? <h1>Loading...</h1>: children}
  </>;
};

export default PrivatePage;