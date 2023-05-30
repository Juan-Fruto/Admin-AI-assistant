import React from 'react'
import { loginRequest } from '../api/auth.api';
import { useAuthStore } from '../store/auth';
import { useNavigate } from "react-router-dom";

function Login() {
  const setToken = useAuthStore((state) => state.setAuthToken);
  const navigate = useNavigate();

  const handleSubmint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username =  (e.currentTarget.elements[0] as HTMLInputElement).value
    const password =  (e.currentTarget.elements[1] as HTMLInputElement).value
    
    const resLogin = await loginRequest(username, password)
    console.log(resLogin)

    const {status} = resLogin
    if(status == 202){
      setToken(resLogin.data.token);
      navigate('/');
    }  
  }


  return (
    <div className="container">
      <div className="container-cards">
        <div className='rule-card'>
          <form onSubmit={handleSubmint}>
              <input type="text" id="username" placeholder='Your username'/>
              <input type="password" id="password" placeholder='Your password'/>
            <button className='large-button'>Sing in</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login