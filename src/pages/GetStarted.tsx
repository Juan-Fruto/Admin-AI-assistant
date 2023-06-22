import React, { useState } from 'react';
import axios from 'axios';
import { createUser } from '../api/auth.api';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/auth';

type FormData = {
  brandName: string;
  legalName: string;
  logo: File | null;
  devicesState: string;
  username: string;
  name: string;
  email: string;
  password: string;
}

const GetStarted: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    legalName: '',
    logo: null,
    devicesState: '',
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const setToken = useAuthStore((state) => state.setInitToken);
  

  const handleBrandNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, brandName: e.target.value });
  };

  const handleLegalNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, legalName: e.target.value });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData({ ...formData, logo: file });
  };

  const handleDevicesStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, devicesState: e.target.value });
  };
  
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, username: e.target.value });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append('brandName', formData.brandName);
    formDataToSend.append('legalName', formData.legalName);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('devicesState', formData.devicesState);
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    
    if (formData.logo) {
      formDataToSend.append('logo', formData.logo);
    }
    try {
      const resSingup = await createUser(formDataToSend);
      
      const {status} = resSingup
      if(status == 200){
        const {token} = resSingup.data;
        console.log(token);
        console.log("success", status);
        setToken(token);
        navigate('/login');
      } else {
        console.log(status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <div className='container-cards'>
      <form onSubmit={handleSubmit}>
        <div className='getstarted-column'>
          <div className='getstarted-row'>
            <label htmlFor="brandName">Brand Name:</label>
            <input type="text" id="brandName" value={formData.brandName} onChange={handleBrandNameChange} />
          </div>
          <div className='getstarted-row'>
            <label htmlFor="legalName">Legal Name:</label>
            <input type="text" id="legalName" value={formData.legalName} onChange={handleLegalNameChange} />
          </div>
          <div className='getstarted-row'>
            <label htmlFor="devicesState">State of the devices:</label>
            <select id="devicesState" value={formData.devicesState} onChange={handleDevicesStateChange} defaultValue="Open to select the state">
              <option selected disabled value="">Open to select the state</option>
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="reconditioned">Reconditioned</option>
            </select>
            </div>
          <div className='getstarted-row'>
            <label htmlFor="logo">Logo:</label>
            <input type="file" id="logo" accept="image/*" onChange={handleLogoChange} />
          </div>
        </div>
        <div className='getstarted-column'>
          <div className='getstarted-row'>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={formData.username} onChange={handleUsernameChange} placeholder='example admin'/>
          </div>
          <div className='getstarted-row'>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={formData.name} onChange={handleNameChange}/>
          </div>
          <div className='getstarted-row'>
            <label htmlFor="email">email:</label>
            <input type="email" id="email" value={formData.email} onChange={handleEmailChange}/>
          </div>
          <div className='getstarted-row'>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={formData.password} onChange={handlePasswordChange}/>
          </div>
        </div>
        <button type="submit" className='getstarted-button'>Submit</button>
      </form>
    </div>
    </div>
  );
};

export default GetStarted;
