import React, { useState } from 'react';
import axios from 'axios';
import { createUser } from '../api/auth.api';
import { useNavigate } from "react-router-dom";

type FormData = {
  brandName: string;
  legalName: string;
  logo: File | null;
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
    username: '',
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

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
        console.log("success", status);
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
        <div className='rule-card'>
          <label htmlFor="brandName">Brand Name:</label>
          <input type="text" id="brandName" value={formData.brandName} onChange={handleBrandNameChange} />
          <label htmlFor="legalName">Legal Name:</label>
          <input type="text" id="legalName" value={formData.legalName} onChange={handleLegalNameChange} />
          <div>
            <label htmlFor="logo">Logo:</label>
            <input type="file" id="logo" accept="image/*" onChange={handleLogoChange} />
          </div>
        </div>
        <div className='fact-card'>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={formData.username} onChange={handleUsernameChange} placeholder='example admin'/>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={formData.name} onChange={handleNameChange}/>
          <label htmlFor="email">email:</label>
          <input type="email" id="email" value={formData.email} onChange={handleEmailChange}/>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={formData.password} onChange={handlePasswordChange}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default GetStarted;
